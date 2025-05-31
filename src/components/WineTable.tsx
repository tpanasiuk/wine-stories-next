"use client";

import { useEffect, useState } from "react";
import { Wine } from "@/app/lib/fetchWines";
import Image from "next/image";

type SortDirection = "asc" | "desc";
const pageSize = 15;
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface WineTableProps {
  wines: Wine[];
}

export default function WineTable({ wines }: WineTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [sortedWines, setSortedWines] = useState<Wine[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = wines.filter(
      (wine) =>
        wine.title.toLowerCase().includes(lowerQuery) ||
        wine.country.toLowerCase().includes(lowerQuery) ||
        wine.winery.toLowerCase().includes(lowerQuery),
    );
    setFilteredWines(filtered);
  }, [searchQuery, wines]);

  useEffect(() => {
    const sorted = [...filteredWines].sort((a, b) => {
      const aRating = parseFloat(a.points || "0");
      const bRating = parseFloat(b.points || "0");
      return sortDirection === "asc" ? aRating - bRating : bRating - aRating;
    });
    setSortedWines(sorted);
    setCurrentPage(1);
  }, [filteredWines, sortDirection]);

  const handleSortClick = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const paginatedWines = sortedWines.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(sortedWines.length / pageSize);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6 flex justify-start">
        <input
          type="text"
          placeholder="Search by name or country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[400px] px-4 py-2 rounded bg-[#1e1e1e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Wine Table */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 rounded-lg shadow-md border border-gray-700 bg-[#1e1e1e]">
        <table className="min-w-[700px] w-full table-fixed text-left text-sm md:text-base">
          <thead className="bg-[#Bfa46f] text-black uppercase text-sm">
            <tr>
              <th className="p-4 w-[80px]">Image</th>
              <th className="p-4 w-[180px]">Name</th>
              <th className="p-4 w-[160px]">Winery</th>
              <th
                className="p-4 w-[120px] cursor-pointer"
                onClick={handleSortClick}
              >
                <div className="flex items-center gap-1">
                  <span>Rating</span>
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                </div>
              </th>
              <th className="p-4 w-[140px]">Location</th>
            </tr>
          </thead>

          <tbody>
            {paginatedWines.map((wine, index) => (
              <tr
                key={`${wine.wine_id || "wine"}-${index}`}
                className={`border-t border-gray-700 ${
                  index % 2 === 0 ? "bg-[#262626]" : "bg-[#1e1e1e]"
                } hover:bg-[#333333] transition-colors duration-200`}
              >
                <td className="p-4 w-[80px]">
                  <Image
                    src={wine.image ?? `${base}/assets/grapes.jpg`}
                    alt={wine.title}
                    width={48}
                    height={64}
                    className="object-contain rounded transition-transform duration-300 hover:scale-150"
                    style={{ width: "48px", height: "64px" }}
                  />
                </td>
                <td className="p-4 w-[180px] text-white break-words">
                  {wine.title}
                </td>
                <td className="p-4 w-[160px] text-white/80 break-words">
                  {wine.winery}
                </td>
                <td className="p-4 w-[120px] text-white/80">{wine.points}</td>
                <td className="p-4 w-[140px] text-white/80 break-words">
                  {wine.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2 text-white">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-40"
        >
          Prev
        </button>
        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
