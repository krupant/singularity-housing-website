import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ShieldCheck } from "lucide-react";

export default function PartnershipSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formLoadedAt] = useState(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    interest: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "Verification required",
        description: "Please verify that you are not a robot",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/partnership-inquiry", {
        ...formData,
        captchaVerified,
        formLoadedAt,
      });

      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch soon to discuss partnership opportunities.",
      });
      setFormData({ name: "", organization: "", email: "", interest: "", message: "" });
      setCaptchaVerified(false);
    } catch (error) {
      toast({
        title: "Error sending inquiry",
        description: "Please try again or contact us directly at singularityhousing@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partners" className="py-10 md:py-12 lg:py-16 bg-primary text-primary-foreground section-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Partner With Us
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Join us in expanding proven housing solutions across the US and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Why Partner?</h3>
              <ul className="space-y-4 text-primary-foreground/90">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/80 mt-2" />
                  <span>Proven model with 20+ successful properties and 7 years of operation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/80 mt-2" />
                  <span>Founders with deep lived experience and nonprofit leadership</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/80 mt-2" />
                  <span>Ethical, sustainable approach benefiting tenants and property owners</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground/80 mt-2" />
                  <span>Ready for national and global expansion with existing infrastructure</span>
                </li>
              </ul>
            </div>

            <Card 
              className="border-primary-foreground/20 p-6 card-hover-3d text-white"
              style={{
                background: 'radial-gradient(circle, rgba(67, 112, 85, 1) 0%, rgba(87, 199, 133, 1) 97%, rgba(237, 221, 83, 1) 100%)'
              }}
              data-testid="card-partnership-quote"
            >
              <p className="font-serif italic text-base md:text-lg text-white">
                "We have faced and experienced the shortfalls of the traditional system, and that is why we created a model that invests in the long-term stability of the people."
              </p>
              <p className="mt-4 text-sm font-medium text-white/90">— Jeff Gruver, Co-Founder</p>
            </Card>
          </div>

          <Card className="bg-background text-foreground p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-partner-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  data-testid="input-partner-organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="input-partner-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Interest Area *</Label>
                <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })} required>
                  <SelectTrigger id="interest" data-testid="select-partner-interest">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="funder">Funder/Grant Organization</SelectItem>
                    <SelectItem value="property">Property Owner</SelectItem>
                    <SelectItem value="nonprofit">Nonprofit Partnership</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                  data-testid="textarea-partner-message"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-md bg-muted/50">
                <Checkbox
                  id="captcha"
                  checked={captchaVerified}
                  onCheckedChange={(checked) => setCaptchaVerified(checked as boolean)}
                  data-testid="checkbox-captcha"
                />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <Label htmlFor="captcha" className="cursor-pointer font-medium">
                    I am not a robot
                  </Label>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full button-3d" disabled={isSubmitting} data-testid="button-submit-partnership">
                {isSubmitting ? "Sending..." : "Submit Partnership Inquiry"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
