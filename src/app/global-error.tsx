"use client";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import "./globals.css"; // Global error must import its own CSS

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6 bg-brand-cream">
          <Heading as="h1" size="2xl" className="text-brand-dark">
            Critical System Error
          </Heading>
          <p className="text-brand-charcoal max-w-md">
            A fatal error occurred. Please reload the application.
          </p>
          <Button onClick={() => reset()} variant="primary">
            Reload Application
          </Button>
        </div>
      </body>
    </html>
  );
}
