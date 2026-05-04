import FeaturedMediaSection from "@/components/layouts/sections/FeaturedMediaSection";
import HeroSection from "@/components/layouts/sections/HeroSection";
import NewsletterSection from "@/components/layouts/sections/NewsLetterSection";
import PricingSection from "@/components/layouts/sections/PricingSection";
import ReviewsSection from "@/components/layouts/sections/ReviewSection";


export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home || CineTube",
  description: "Welcome to CineTube, your ultimate movie streaming platform. Explore a vast collection of films, TV shows, and exclusive content. Start watching now!",
};

export default function Home() {
  return (
    <div>
       <HeroSection></HeroSection>
       <FeaturedMediaSection></FeaturedMediaSection>
       <ReviewsSection></ReviewsSection>
       <PricingSection></PricingSection>
       <NewsletterSection></NewsletterSection>
    </div>
  );
}