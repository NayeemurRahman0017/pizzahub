import HeroBanner from "@/components/home/hero-banner";
import FeaturedMenu from "@/components/home/featured-menu";
import PizzaCategories from "@/components/home/pizza-categories";
import WhyChoosePizzaHub from "@/components/home/why-choose-pizzahub";
import HowPizzaHubWorks from "@/components/home/how-pizzahub-works";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedMenu />
      <PizzaCategories />
      <WhyChoosePizzaHub />
      <HowPizzaHubWorks />
    </>
  );
}