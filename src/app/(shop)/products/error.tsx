"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 rounded-xl border border-border px-4 py-10 text-center">
      <h2 className="text-xl font-semibold">Could not load products</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
