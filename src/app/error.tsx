"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container-luxury text-center space-y-6 bg-brand-cream">
      <span className="eyebrow text-red-500">System Error</span>
      <Heading as="h1" size="2xl">
        Something went wrong
      </Heading>
      <Text className="max-w-md mx-auto text-brand-muted">
        We apologize for the inconvenience. Our team has been notified. Please
        try reloading the page.
      </Text>
      <div className="pt-4">
        <Button onClick={() => reset()} variant="primary" size="lg">
          Try Again
        </Button>
      </div>
    </div>
  );
}
