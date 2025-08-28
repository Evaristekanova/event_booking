"use client";

import React, { Suspense, ComponentType, useState } from "react";
import Loader from "./Loader";

interface LazyLoaderProps {
  component: ComponentType<Record<string, unknown>>;
  fallback?: React.ReactNode;
  props?: Record<string, unknown>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onRetry: () => void },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; onRetry: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("LazyLoader Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            Failed to load component. Please try again.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onRetry();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  component: Component,
  fallback = <Loader />,
  props = {},
}) => {
  const [key, setKey] = useState(0);

  const handleRetry = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <ErrorBoundary onRetry={handleRetry}>
      <Suspense fallback={fallback}>
        <Component key={key} {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoader;

/*
Usage Examples:

// Basic usage
<LazyLoader
  component={MyComponent}
  fallback={<CustomLoader />}
  props={{ id: 123, title: "Example" }}
/>

// With default fallback
<LazyLoader
  component={DashboardPage}
  props={{ userId: "user123" }}
/>

// Simple component loading
<LazyLoader component={SimpleComponent} />
*/
