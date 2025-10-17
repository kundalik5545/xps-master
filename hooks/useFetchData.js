"use client";
import { useEffect, useState } from "react";

const useFetchData = (submitFn, deps = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // call the function (important)
        const res = await submitFn();

        // If submitFn returned a Response-like object (rare for server actions),
        // try to get JSON, otherwise use value directly.
        const value =
          res && typeof res.json === "function" ? await res.json() : res;

        if (!cancelled) setData(value);
      } catch (err) {
        if (!cancelled) setError(err?.message ?? String(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
    // include submitFn and any additional deps
  }, [submitFn, ...deps]);

  return { data, error, isLoading, setData };
};

export default useFetchData;
