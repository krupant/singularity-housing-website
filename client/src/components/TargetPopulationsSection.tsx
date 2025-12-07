import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, User, Shield, Users, Scale, UserCheck } from "lucide-react";
import recoveryImage from "@assets/People in recovery_1761396421192.jpg";
import elderlyImage from "@assets/Elderly_1761396631112.jpg";
import veteransImage from "@assets/Veterans_1761396722898.jpg";
import developmentalDisabilitiesImage from "@assets/Developmental disabilities_1761396990418.png";
import justiceImpactedImage from "@assets/Justice impacted_1761396834912.jpg";
import fixedIncomeImage from "@assets/Fixed income_1761396870185.jpg";

export default function TargetPopulationsSection() {
  const populations = [
    {
      icon: HeartPulse,
      title: "People in Recovery",
      description: "Originally a lifeline for men in recovery, providing peer support and community."
    },
    {
      icon: User,
      title: "Elderly Individuals",
      description: "Safe, affordable housing with dignity for elderly people on fixed incomes."
    },
    {
      icon: Shield,
      title: "Veterans",
      description: "Supporting those who served with stable housing and community connections."
    },
    {
      icon: Users,
      title: "Developmental Disabilities",
      description: "Accessible, supportive environments for people with developmental disabilities."
    },
    {
      icon: Scale,
      title: "Justice-Impacted",
      description: "Second chances and stable housing for those impacted by the justice system."
    },
    {
      icon: UserCheck,
      title: "Fixed Income Residents",
      description: "Affordable solutions for all individuals living on fixed incomes."
    }
  ];

  return (
    <section id="who-we-serve" className="py-10 md:py-12 lg:py-16 bg-muted/30 section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Who We Serve
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Providing dignified housing solutions for diverse vulnerable populations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {populations.map((population, index) => {
            const hasBackground = true; // All cards now have backgrounds
            const backgroundImage = 
              index === 0 ? recoveryImage : 
              index === 1 ? elderlyImage : 
              index === 2 ? veteransImage :
              index === 3 ? developmentalDisabilitiesImage :
              index === 4 ? justiceImpactedImage :
              index === 5 ? fixedIncomeImage : 
              null;
            
            return (
              <Card 
                key={index} 
                className={`text-center card-always-3d ${
                  hasBackground ? 'relative overflow-hidden' : ''
                }`}
                style={hasBackground ? {
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
                data-testid={`card-population-${index}`}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${hasBackground ? 'bg-white/20' : 'bg-[hsl(145,30%,95%)]'}`}>
                      <population.icon className={`h-8 w-8 ${hasBackground ? 'text-white' : 'text-[hsl(145,30%,45%)]'}`} />
                    </div>
                  </div>
                  <CardTitle className={`text-xl ${hasBackground ? 'text-white' : ''}`}>
                    {population.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={hasBackground ? 'text-white/90' : 'text-muted-foreground'}>
                    {population.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
