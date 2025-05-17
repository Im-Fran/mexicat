<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller {
    public function index() {
        $cartItems = Session::get('cart', []);
        $products = [];
        $total = 0;

        if (!empty($cartItems)) {
            $productIds = array_keys($cartItems);
            $products = Product::whereIn('id', $productIds)->with(['media'])->get();

            foreach ($products as $product) {
                $product->cartQuantity = $cartItems[$product->id];
                $total += $product->price * $cartItems[$product->id];
            }
        }

        return inertia('cart/index', [
            'cartItems' => $products,
            'total' => $total,
        ]);
    }

    public function add(Request $request) {
        $request->validate([
            'productId' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->productId;
        $quantity = $request->quantity;

        // Check product availability
        $product = Product::findOrFail($productId);
        if ($product->stock <= 0) {
            return back()->with('error', 'El producto está agotado');
        }

        $cart = Session::get('cart', []);

        // If product exists in cart, update quantity
        if (isset($cart[$productId])) {
            $cart[$productId] += $quantity;
        } else {
            $cart[$productId] = $quantity;
        }

        // Ensure we don't exceed available stock
        if ($cart[$productId] > $product->stock) {
            $cart[$productId] = $product->stock;
        }

        Session::put('cart', $cart);

        return back()->with('success', 'Producto agregado al carrito');
    }

    public function update(Request $request) {
        $request->validate([
            'productId' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->productId;
        $quantity = $request->quantity;

        // Check product availability
        $product = Product::findOrFail($productId);

        $cart = Session::get('cart', []);

        if (isset($cart[$productId])) {
            // Ensure we don't exceed available stock
            if ($quantity > $product->stock) {
                $quantity = $product->stock;
            }

            $cart[$productId] = $quantity;
            Session::put('cart', $cart);
        }

        return back();
    }

    public function remove(Request $request) {
        $request->validate([
            'productId' => 'required|exists:products,id',
        ]);

        $productId = $request->productId;
        $cart = Session::get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put('cart', $cart);
        }

        return back();
    }

    public function checkout() {
        $cartItems = Session::get('cart', []);
        $products = [];
        $total = 0;

        if (!empty($cartItems)) {
            $productIds = array_keys($cartItems);
            $products = Product::whereIn('id', $productIds)->with(['media'])->get();

            foreach ($products as $product) {
                $product->cartQuantity = $cartItems[$product->id];
                $total += $product->price * $cartItems[$product->id];
            }
        }

        return inertia('cart/checkout', [
            'cartItems' => $products,
            'total' => $total,
            'regions' => Helpers::regiones(),
        ]);
    }

    public function clear() {
        Session::forget('cart');

        return back()->with('success', 'Carrito vaciado con éxito');
    }
}
