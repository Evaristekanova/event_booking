import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

interface UseInfiniteScrollReturn {
  isIntersecting: boolean;
  ref: React.RefObject<HTMLDivElement>;
  reset: () => void;
}

export const useInfiniteScroll = (
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn => {
  const { threshold = 0.1, rootMargin = "100px", enabled = true } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setIsIntersecting(false);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          onIntersect();
        } else {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, threshold, rootMargin, enabled]);

  return { isIntersecting, ref: ref as React.RefObject<HTMLDivElement>, reset };
};

// Hook for paginated data with infinite scroll
export const useInfiniteData = <T>(
  fetchData: (
    page: number,
    limit: number
  ) => Promise<{
    data: T[];
    hasMore: boolean;
    total: number;
  }>,
  limit: number = 10
) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchData(page, limit);

      setData((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, page, limit, hasMore, isLoading]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setIsLoading(false);
  }, []);

  const refresh = useCallback(async () => {
    reset();
    await loadMore();
  }, [reset, loadMore]);

  return {
    data,
    hasMore,
    isLoading,
    error,
    loadMore,
    reset,
    refresh,
  };
};
