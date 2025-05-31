// components/PaginationControls.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function PaginationControls() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/wines?${params.toString()}`);
  };

  return (
    <div className="flex justify-between mt-8 max-w-sm mx-auto">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 border rounded text-white border-white/50 disabled:opacity-40"
      >
        ← Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 border rounded text-white border-white/50"
      >
        Next →
      </button>
    </div>
  );
}
