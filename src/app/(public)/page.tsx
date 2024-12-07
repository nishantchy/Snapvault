import AboutProduct from "@/components/public/Feature";
import SimpleFooter from "@/components/public/Footer";
import Hero from "@/components/public/Hero";
import Navbar from "@/components/public/Navbar";
import PricingPlans from "@/components/public/Pricing";

export default function Home() {
  return (
    <div className="bg-background">
      <Navbar />
      <Hero />
      <AboutProduct />
      <PricingPlans />
      <SimpleFooter />
    </div>
  );
}
