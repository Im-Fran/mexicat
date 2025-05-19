<?php

namespace App\Http\Requests\Account\Addresses;

use App\Helpers\Helpers;
use App\Models\Country;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateAddressRequest extends FormRequest {
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'region' => ['required', 'string', 'max:255', Rule::in(Helpers::regiones()->pluck('id'))],
            'country' => ['required', 'string', 'max:255', Rule::in(Country::pluck('iso3'))],
            'postal_code' => ['required', 'string', 'max:10'],
        ];
    }
}
