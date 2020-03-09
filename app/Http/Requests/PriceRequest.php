<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PriceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'  =>  [
                'required', 
                'string', 
                'between:2,30', 
                'unique:prices,name,'.\Request::instance()->id.',id'
            ],
            'slug'  =>  [
                'required', 
                'string', 
                'between:2,30', 
                'unique:prices,slug,'.\Request::instance()->id.',id'
            ],
        ];
    }
}