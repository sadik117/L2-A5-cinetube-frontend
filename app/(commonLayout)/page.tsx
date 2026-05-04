import FeaturedMediaSection from "@/components/layouts/sections/FeaturedMediaSection";
import HeroSection from "@/components/layouts/sections/HeroSection";
import NewsletterSection from "@/components/layouts/sections/NewsLetterSection";
import PricingSection from "@/components/layouts/sections/PricingSection";
import ReviewsSection from "@/components/layouts/sections/ReviewSection";
import QuickStats from "@/components/layouts/sections/QuickStatsSection";
import UpcomingEvents from "@/components/layouts/sections/UpcomingEventsSection";
import FeaturedReview from "@/components/layouts/sections/FeaturedReviewSection";


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
       <FeaturedReview></FeaturedReview>
       <UpcomingEvents></UpcomingEvents>
       <ReviewsSection></ReviewsSection>
       <PricingSection></PricingSection>
       <QuickStats></QuickStats>
       <NewsletterSection></NewsletterSection>
    </div>
  );
}