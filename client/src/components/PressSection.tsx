import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Play } from "lucide-react";
import testimonialVideo from "@assets/StFrancisHouse_Testimonial_Jamie_01_1760475779619.mp4";

export default function PressSection() {
  const pressItems = [
    {
      title: "An Advocate for Compassion: Gainesville Ambassador helps to house 30 in under 4 months",
      source: "Block by Block",
      date: "March 2025",
      excerpt: "Outreach Coordinator Eric Davis is a true beacon of compassion in his community. Since the Gainesville Community Reinvestment Area Ambassador Program launched in December of 2024, Eric has helped find housing for 30 people who were experiencing homelessness in Gainesville.",
      url: "https://www.blockbyblock.com/news/gainesvilleoutreach/",
      type: "article",
    },
    {
      title: "Singularity Housing is now seeking new partnerships for long-term sustainability to Address Housing Instability and Homelessness",
      source: "Yahoo Finance",
      date: "2024",
      excerpt: "Singularity Housing LLC, a leader in providing quality housing to vulnerable populations, is now seeking new partnerships for long-term sustainability to Address Housing Instability and Homelessness.",
      url: "https://finance.yahoo.com/news/changes-healing-center-announces-partnership-174900783.html",
      type: "article",
    },
    {
      title: "St. Francis House Testimonial",
      source: "Video Testimonial",
      date: "2024",
      excerpt: "A powerful testimonial highlighting the impact of our housing programs and the lives we've helped transform through the St. Francis House partnership.",
      videoUrl: testimonialVideo,
      type: "video",
    },
    {
      title: "Dedicating Their Lives To Creating A Change With Eric Davis and Mark Brisbane",
      source: "The Independent Life Podcast",
      date: "September 2022",
      excerpt: "Eric and Mark discuss systemic, policy-based changes and real solutions to affordable housing, emphasizing the importance of collaboration and humanization. They share real-life stories illuminating the challenges people face and the dedication required to create meaningful change.",
      url: "https://podcasts.apple.com/us/podcast/the-independent-life/id1541415342?i=1000579625806",
      type: "podcast",
    },
    {
      title: "Becoming of Maximum Service To Others With Eric Davis and Mark Brisbane",
      source: "The Independent Life Podcast",
      date: "September 2022",
      excerpt: "Eric shares his lived experiences with mental health challenges and addiction, and how overcoming these transformed him into someone whose mission is to maximize service to others. He discusses the Single Room Occupancy model and making housing accessible for people on fixed incomes.",
      url: "https://podcasts.apple.com/us/podcast/the-independent-life/id1541415342?i=1000578884952",
      type: "podcast",
    },
  ];

  return (
    <section id="press" className="py-10 md:py-12 lg:py-16 bg-muted/30 section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Press & Media
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Read about our partnerships and initiatives in the news
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {pressItems.map((item, index) => (
            <Card 
              key={index} 
              className="card-always-3d text-white" 
              style={{
                background: 'radial-gradient(circle, rgba(67, 112, 85, 1) 0%, rgba(87, 199, 133, 1) 97%, rgba(237, 221, 83, 1) 100%)'
              }}
              data-testid={`card-press-${index}`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                      <span className="font-medium">{item.source}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  {item.type !== "video" && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-white/90 hover:underline text-sm font-medium"
                      data-testid={`link-press-${index}`}
                    >
                      {item.type === "podcast" ? "Listen" : "Read Article"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {item.type === "video" ? (
                  <div className="space-y-4">
                    <video 
                      controls 
                      className="w-full rounded-lg"
                      data-testid={`video-press-${index}`}
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p className="text-white/90 leading-relaxed text-justify">
                      {item.excerpt}
                    </p>
                  </div>
                ) : (
                  <p className="text-white/90 leading-relaxed text-justify">
                    {item.excerpt}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
