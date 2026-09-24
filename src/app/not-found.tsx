import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container-luxury text-center space-y-6 bg-brand-cream">
      <span className="eyebrow text-brand-gold">Error 404</span>
      <Heading as="h1" size="3xl">
        Page Not Found
      </Heading>
      <Text className="max-w-md mx-auto text-brand-charcoal">
        The page you are looking for doesn't exist, has been removed, or is
        temporarily unavailable.
      </Text>
      <div className="pt-4">
        <Link href="/">
          <Button variant="primary" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
