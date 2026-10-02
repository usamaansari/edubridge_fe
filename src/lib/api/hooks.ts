"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiError } from "@/types";
import { toApiError } from "./client";

type QueryState<T> = {
  data: T | undefined;
  error: ApiError | null;
  isLoading: boolean;
  refetch: () => void;
};

export function useApiQuery<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = [],
  options: { enabled?: boolean; initialData?: T } = {},
): QueryState<T> {
  const { enabled = true, initialData } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(enabled && initialData === undefined);
  const [version, setVersion] = useState(0);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetcherRef.current().then(
      (result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        if (cancelled) return;
        setError(toApiError(err));
        setIsLoading(false);
      },
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, version, ...deps]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setVersion((v) => v + 1);
  }, []);

  return { data, error, isLoading, refetch };
}

export function useApiMutation<TInput, TOutput>(
  mutator: (input: TInput) => Promise<TOutput>,
) {
  const [error, setError] = useState<ApiError | null>(null);
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    async (input: TInput) => {
      setIsPending(true);
      setError(null);
      try {
        return await mutator(input);
      } catch (err) {
        setError(toApiError(err));
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [mutator],
  );

  return { mutate, error, isPending };
}
