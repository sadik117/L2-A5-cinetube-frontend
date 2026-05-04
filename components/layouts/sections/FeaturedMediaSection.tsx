import { MediaRow } from "@/components/layouts/shared/MediaRow";

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
    <section className="-py-6 bg-gradient-to-b from-black to-gray-950">
      <div className="px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-bold mb-8 text-white">
          🎬 Browse Categorized Media
        </h2>

        <div className="space-y-10 ">
          {Object.entries(grouped).map(([genre, items]) => (
            <MediaRow key={genre} title={genre} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}