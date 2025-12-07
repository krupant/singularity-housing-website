import { Card } from "@/components/ui/card";

export default function ImpactSection() {
  const stats = [
    { value: "20+", label: "Properties Across Florida" },
    { value: "7", label: "Years of Proven Success" },
    { value: "100%", label: "Self-Funded Growth" },
    { value: "Many", label: "Lives Transformed" }
  ];

  return (
    <section id="impact" className="py-10 md:py-12 lg:py-16 section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Our Impact
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a proven model from the ground up since 2018
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-8 text-center card-always-3d" data-testid={`stat-card-${index}`}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              From Vision to Reality
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Since inception in 2018, Eric Davis and Jeff Gruver have self-funded their entire vision under a simple belief: when people feel safe, they succeed in life.
              </p>
              <p>
                What started as an idea conceived while working in a local shelter has grown into a network of 20+ properties across Florida, proving that this model works.
              </p>
              <p>
                Now, they're ready to transition from part-time to full-time founders and expand their model across the US and globally.
              </p>
            </div>
          </div>

          <Card 
            className="p-8 md:p-12 border-card-border card-hover-3d text-white"
            style={{
              background: 'radial-gradient(circle, rgba(67, 112, 85, 1) 0%, rgba(87, 199, 133, 1) 97%, rgba(237, 221, 83, 1) 100%)'
            }}
            data-testid="card-impact-quote"
          >
            <blockquote className="font-serif italic text-lg md:text-xl mb-6 text-white">
              "We have done the hard part. We proved this works. Now we just need the fuel to take it further."
            </blockquote>
            <p className="text-base font-medium text-white/90">— Eric Davis, Co-Founder</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
