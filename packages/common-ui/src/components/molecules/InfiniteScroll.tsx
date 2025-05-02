import React, { useState, useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.scss";

export interface InfiniteScrollProps {
  onIntersect: () => Promise<void> | void;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  showLoadingIndicator?: boolean;
  loadingClassName?: string;
  isLoading?: boolean;
}

/**
 * InfiniteScroll 컴포넌트
 *
 * 스크롤 시 지정된 요소가 뷰포트에 들어오면 콜백을 실행하는 무한 스크롤 기능 구현
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onIntersect,
  rootMargin = "20px",
  threshold = 1.0,
  className = "",
  showLoadingIndicator = true,
  loadingClassName = "",
  isLoading: externalLoading,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(externalLoading ?? false);

  useEffect(() => {
    if (externalLoading !== undefined) {
      setIsLoading(externalLoading);
    }
  }, [externalLoading]);

  useEffect(() => {
    const handleIntersect = async () => {
      if (isLoading) return;

      if (externalLoading === undefined) {
        setIsLoading(true);
      }

      try {
        await onIntersect();
      } finally {
        if (externalLoading === undefined) {
          setIsLoading(false);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleIntersect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [onIntersect, rootMargin, threshold, isLoading, externalLoading]);

  const loadingIndicatorClasses = `${styles.loadingIndicator} ${loadingClassName}`;
  const infiniteScrollClasses = `${styles.infiniteScroll} ${className}`;

  return (
    <div className={styles.container}>
      {showLoadingIndicator && isLoading && (
        <div className={loadingIndicatorClasses}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div className={infiniteScrollClasses} ref={observerRef} />
    </div>
  );
};
