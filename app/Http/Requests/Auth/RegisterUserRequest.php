<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use App\Models\User;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', 'min:8', Rules\Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => __('message.email_required'),
            'email.email' => __('message.email_email'),
            'email.unique' => __('message.email_unique'),
            'name.required' => __('message.name_required'),
            'password.required' => __('message.password_required'),
            'password.min' => __('message.password_min'),
        ];
    }
}
