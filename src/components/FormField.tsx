'use client';
import React from 'react';
import { FieldError, UseFormRegister, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface FormFieldProps<TFormValues extends FieldValues> {
  label: string;
  id: Path<TFormValues>;
  type?: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

function FormField<TFormValues extends FieldValues>({
  label,
  id,
  type = 'text',
  register,
  error,
  placeholder,
  required = false,
}: FormFieldProps<TFormValues>) {
  const validationRules: RegisterOptions<TFormValues, Path<TFormValues>> = {
    required: required ? `${label} is required` : false,
    ...(type === 'email' && {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
    }),
    ...(id === 'contact' && {
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Enter a valid 10-digit phone number',
      },
    }),
  };

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="font-medium mb-2 text-card flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validationRules)}
        className="w-full px-4 py-3 border border-custom rounded-lg bg-card text-card focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      />
      <ErrorMessage error={error} />
    </div>
  );
}

export default FormField;
