// hooks/useDirectInfiniteScroll.ts
import { useRef, useEffect } from "react";

interface UseDirectInfiniteScrollOptions {
  onLoadMore: () => void;
  hasNoMoreData: boolean;
  isLoading: boolean;
  threshold?: number;
  enabled?: boolean;
}

export function useDirectInfiniteScroll({
  onLoadMore,
  hasNoMoreData,
  isLoading,
  threshold = 200,
  enabled = true,
}: UseDirectInfiniteScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold;

      if (isNearBottom && !isLoading && !hasNoMoreData) {
        onLoadMore();
      }
    };

    // 초기 확인
    const initialCheckTimer = setTimeout(() => {
      if (!container) return;
      const { scrollHeight, clientHeight } = container;
      if (scrollHeight <= clientHeight && !isLoading && !hasNoMoreData) {
        onLoadMore();
      }
    }, 500);

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(initialCheckTimer);
    };
  }, [isLoading, hasNoMoreData, onLoadMore, threshold, enabled]);

  return containerRef;
}
