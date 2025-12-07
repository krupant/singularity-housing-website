import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Heart, Shield } from "lucide-react";
import sroImage from "@assets/Single Room Occupancy_1761395271945.jpg";
import pseudoFamilyImage from "@assets/Pseudo Family Environment_1761395884752.jpg";
import ethicalPropertyImage from "@assets/Ethical Property Management_1761396292804.png";
import longTermStabilityImage from "@assets/Long Term Stability_1761396376325.jpg";

export default function HousingModelSection() {
  const features = [
    {
      icon: Home,
      title: "Single Room Occupancy (SRO)",
      description: "Innovative approach to shared living environments that provide dignity and independence while fostering community."
    },
    {
      icon: Users,
      title: "Pseudo-Family Environment",
      description: "Creating genuine community connections and peer support networks that help residents thrive."
    },
    {
      icon: Heart,
      title: "Ethical Property Management",
      description: "Fresh perspective on property oversight that benefits both tenants and property owners simultaneously."
    },
    {
      icon: Shield,
      title: "Long-Term Stability",
      description: "Investing in residents' sustained success, not just temporary shelter. When people feel safe, they succeed."
    }
  ];

  return (
    <section id="our-model" className="py-10 md:py-12 lg:py-16 section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            The Singularity Housing Model
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A two-part housing system designed to restore dignity and provide real opportunities for vulnerable populations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const hasBackground = index === 0 || index === 1 || index === 2 || index === 3;
            const backgroundImage = index === 0 ? sroImage : index === 1 ? pseudoFamilyImage : index === 2 ? ethicalPropertyImage : index === 3 ? longTermStabilityImage : null;
            const testIds = ['sro', 'pseudo-family', 'ethical-property', 'long-term-stability'];
            
            return (
              <Card 
                key={index} 
                className={`card-always-3d ${
                  hasBackground 
                    ? 'relative overflow-hidden' 
                    : ''
                }`}
                style={hasBackground ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
                data-testid={`card-housing-feature-${testIds[index]}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-md ${hasBackground ? 'bg-white/20' : 'bg-primary/10'}`}>
                      <feature.icon className={`h-6 w-6 ${hasBackground ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <CardTitle className={`text-xl ${hasBackground ? 'text-white' : ''}`}>
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={hasBackground ? 'text-white/90' : 'text-muted-foreground'}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card 
          className="p-8 md:p-12 card-hover-3d text-white"
          style={{
            background: 'radial-gradient(circle, rgba(67, 112, 85, 1) 0%, rgba(87, 199, 133, 1) 97%, rgba(237, 221, 83, 1) 100%)'
          }}
          data-testid="card-housing-model-quote"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <blockquote className="font-serif italic text-lg md:text-xl text-white">
              "Our housing model is not just about putting a roof over someone's head, it's about restoring dignity and giving people a real chance to rebuild their lives."
            </blockquote>
            <p className="text-base text-white/90">— Eric Davis, Co-Founder</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
