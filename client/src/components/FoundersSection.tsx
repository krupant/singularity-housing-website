import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ericImage from "@assets/Eric1_1760462693869.jpg";
import jeffImage from "@assets/jeff_1762210107388.jpg";

export default function FoundersSection() {
  return (
    <section id="about" className="py-10 md:py-12 lg:py-16 bg-background section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Meet Our Founders
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Two social entrepreneurs with lived experience transforming the housing system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="flex flex-col items-center text-center lg:text-left lg:flex-row gap-6">
            <Avatar className="h-40 w-40 ring-4 ring-primary/20 flex-shrink-0 avatar-3d" data-testid="avatar-eric">
              <AvatarImage src={ericImage} alt="Eric Davis" className="object-cover" />
              <AvatarFallback>ED</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Eric Davis</h3>
              <p className="text-sm text-muted-foreground mb-4">Co-Founder & Social Entrepreneur</p>
              <p className="text-base leading-relaxed">
                From Housing First Advocate to visionary leader, Eric brings lived experience of overcoming co-occurring mental health and addiction challenges. His work has been featured in numerous podcasts, opening conversations on affordable, accessible, and safe housing.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:text-left lg:flex-row gap-6">
            <Avatar className="h-40 w-40 ring-4 ring-primary/20 flex-shrink-0 avatar-3d" data-testid="avatar-jeff">
              <AvatarImage src={jeffImage} alt="Jeff Gruver" className="object-cover" />
              <AvatarFallback>JG</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Jeff Gruver</h3>
              <p className="text-sm text-muted-foreground mb-4">Co-Founder & Recovery Advocate</p>
              <p className="text-base leading-relaxed">
                Starting as a Case Manager in a shelter, Jeff's unique combination of expertise and lived experiences led him to leadership roles. Together with Eric, he has created a housing model that invests in the long-term stability of vulnerable populations.
              </p>
            </div>
          </div>
        </div>

        <Card 
          className="mt-16 p-8 md:p-12 border-card-border card-hover-3d text-white"
          style={{
            background: 'radial-gradient(circle, rgba(67, 112, 85, 1) 0%, rgba(87, 199, 133, 1) 97%, rgba(237, 221, 83, 1) 100%)'
          }}
          data-testid="card-founders-quote"
        >
          <blockquote className="font-serif italic text-lg md:text-xl text-center max-w-4xl mx-auto text-white">
            "We bring with us lived experience, nonprofit leadership, and deep community relationships with existing service providers. We've lived the gaps in the system and created a model that addresses them."
          </blockquote>
        </Card>
      </div>
    </section>
  );
}
