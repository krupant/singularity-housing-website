import HeroSection from "@/components/HeroSection";
import FoundersSection from "@/components/FoundersSection";
import HousingModelSection from "@/components/HousingModelSection";
import TargetPopulationsSection from "@/components/TargetPopulationsSection";
import ImpactSection from "@/components/ImpactSection";
import PressSection from "@/components/PressSection";
import PartnershipSection from "@/components/PartnershipSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FoundersSection />
      <HousingModelSection />
      <TargetPopulationsSection />
      <ImpactSection />
      <PressSection />
      <PartnershipSection />
    </div>
  );
}
