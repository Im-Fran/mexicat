<?php

namespace App\Http\Middleware;

use Closure;
use Cog\Contracts\Ownership\Ownable;
use Illuminate\Http\Request;

class Owns {
    public function handle(Request $request, Closure $next, string $model) {
        if (!auth()->check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'No estas autenticado.'], 401);
            }

            return redirect()->route('login');
        }

        /** @var Ownable $model */
        $model = $request->route($model);

        if (!$model->hasOwner()) { // if the model doesn't have an owner, we can skip the check
            return $next($request);
        }

        if (!$model->isOwnedBy($request->user())) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'No tienes permiso para acceder a este recurso.'], 403);
            }

            return back(403)->withErrors('No tienes permiso para acceder a este recurso.');
        }

        return $next($request);
    }

    public static function model($model): string {
        return static::class.':'.$model;
    }
}
