import { MediaRow } from "@/components/layouts/shared/MediaRow";
import Link from "next/link";
import { ArrowRight, Film, Grid3x3 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_FRONTEND_API_URL! || "https://cinetube-server-pink.vercel.app/api/v1";

type Media = {
  id: string;
  title: string;
  coverImage: string;
  genre: string[];
  releaseYear: number;
};

// ISR fetch
async function getMedia(): Promise<Media[]> {
  try {
    const res = await fetch(`${API}/movie?page=1&limit=50`, {
      next: { revalidate: 60 }, // nextjs ISR
    });

    const json = await res.json();
    return json?.data || [];
  } catch (err) {
    console.error("Failed to fetch media:", err);
    return [];
  }
}

export default async function FeaturedMediaSection() {
  const media = await getMedia();

  // Group by genre
  const grouped: Record<string, Media[]> = {};

  media.forEach((item) => {
    item.genre.forEach((g) => {
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(item);
    });
  });

  return (
    <section className="bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-black dark:to-gray-950 py-8">
      <div className="px-4 md:px-8">
        {/* Header with Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white flex items-center">
              🎬 Browse Categorized Media
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Discover movies and series by genre
            </p>
          </div>
          
          <Link
            href="/movies"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105"
          >
            <Grid3x3 className="w-4 h-4" />
            <span>Browse All Movies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Media Rows */}
        <div className="space-y-10">
          {Object.entries(grouped).slice(0, 6).map(([genre, items]) => (
            <MediaRow key={genre} title={genre} items={items} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 pt-4">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-rose-500 dark:border-rose-400 text-rose-600 dark:text-rose-400 rounded-xl font-semibold hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-all duration-300 group"
          >
            <Film className="w-4 h-4" />
            <span>View All {media.length}+ Movies & Series</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            Explore our complete collection of {media.length}+ titles
          </p>
        </div>
      </div>
    </section>
  );
}