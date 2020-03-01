<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResourceRequest extends FormRequest
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
            'name' =>  [
                'required', 
                'unique:resources, name'.\Request::instance()->id.',id', 
                'string', 
                'between:3,40',
            ],
            'url'  =>   [
                'required',
                'unique:resources, url'.\Request::instance()->id.',id',
                'url',
                'string',
                'between:2,150',
            ],
            'description'   =>  [
                'nullable',
                'string',
                'between:0,250',
            ],
            'image'  =>  [
                'nullable',
                'image',
            ],
            'language'  => [
                'required',
                'string',
                'in:fr,en',
                'between:0,5',
            ],
            'score'   =>  [
                'required',
                'integer',
                'min:1',
                'max:10',
            ],
            'interface'  => [
                'required',
                'integer',
                'min:1',
                'max:3',
            ],
            'type_id'  => [
                'required',
                'exists:types,id',
            ],
            'price_id'  =>  [
                'required',
                'exists:prices,id',
            ],
            'like'   =>  [
                'nullable',
                'integer',
                'min:0',
            ],
        ];
    }
}
