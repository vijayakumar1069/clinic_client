"use client";

import { getBackendUrl } from "@/lib/getBackendUrl";
import { useState, useCallback } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (url, method, body, token) => {
    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    headers.append("Content-Type", "application/json");

    const config = {
      method: method.toUpperCase(),
      headers,
      credentials: "include",
    };

    if (method.toUpperCase() !== "GET" && method.toUpperCase() !== "HEAD") {
      config.body = JSON.stringify(body);
    }

    const backendUrl = getBackendUrl();
    url = `${backendUrl}${url}`;

    try {
      setLoading(true);
      const response = await fetch(url, config);
      const data = await response.json();
      console.log(data);

      if (!data.success) {
        const error = new Error(data.message || "Request failed");
        setError(data.message);
        setLoading(false);
      }

      setError(null);
      setLoading(false);
      setData(data);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  return { loading, error, data, fetchData };
};

export default useFetch;
