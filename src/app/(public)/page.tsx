import AboutProduct from "@/components/public/Feature";
import Hero from "@/components/public/Hero";
import PricingPlans from "@/components/public/Pricing";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero />
      <AboutProduct />
      <PricingPlans />
    </div>
  );
}
