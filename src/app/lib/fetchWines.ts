export type Wine = {
  wine_id?: string;
  title: string;
  winery: string;
  country: string;
  points: string;
  image?: string;
  description?: string;
};

export async function fetchAllWines(): Promise<Wine[]> {
  const response = await fetch("https://api.sampleapis.com/wines/reds", {
    cache: "no-store",
  });

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    wine_id: item.id?.toString() || "",
    title: item.wine || "Untitled",
    winery: item.winery || "Unknown",
    country: item.location || "Unknown",
    points: item.rating?.average?.toString() || "-",
    image: item.image || "",
    description: item.rating?.reviews || "",
  }));
}
