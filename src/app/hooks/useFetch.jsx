"use client";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { useState, useCallback } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, method, body, token) => {
    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    headers.append("Content-Type", "application/json");

    const config = {
      method: method.toUpperCase(),
      headers,
      body: JSON.stringify(body),
      credentials: "include", // Add credentials here
    };
    const backendUrl=getBackendUrl();
    url = `${backendUrl}${url}`;

    try {
      setLoading(true);
      const response = await fetch(url, config);
      const data = await response.json();

      if (!data.success) {
        const error = new Error(data.message || "Request failed");
        setError(data.message);
        setLoading(false);
        throw error;
      }
      setError(null);
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);

      throw error;
    }
  }, []);

  return { loading, error, data, fetchData };
};

export default useFetch;
