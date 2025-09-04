"use client";
import React from "react";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error?: FieldError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error?.message) return null;

  return <p className="text-red-500 text-sm">{String(error.message)}</p>;
};

export default ErrorMessage;
