"use client";
import React from "react";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-semibold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-6">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
