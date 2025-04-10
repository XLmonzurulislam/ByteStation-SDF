import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data for initial rendering
const initialTestimonials = [
  {
    id: 1,
    content: "HackerHire completely transformed our security posture. Their ethical hackers identified critical vulnerabilities that our internal team missed. The detailed reports and remediation advice were incredibly valuable. I highly recommend their services to any company serious about cybersecurity.",
    name: "Michael Brown",
    title: "CTO, TechSolutions Inc.",
    avatar: "MB"
  },
  {
    id: 2,
    content: "We were preparing for SOC 2 compliance and needed a thorough security assessment. The ethical hackers from HackerHire were professional, knowledgeable, and thorough. They found several critical issues in our API that could have led to data exposure. Their work was instrumental in our successful compliance certification.",
    name: "Jennifer Lee",
    title: "CISO, FinSecure Solutions",
    avatar: "JL"
  },
  {
    id: 3,
    content: "After experiencing a security incident, we needed to ensure our systems were fully secured. The HackerHire platform connected us with specialized ethical hackers who understood our industry. They performed a comprehensive penetration test and provided actionable recommendations. Six months later, we passed our security audit with flying colors.",
    name: "Robert Zhang",
    title: "VP of Engineering, HealthData Systems",
    avatar: "RZ"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Fetch testimonials from API
  const { data: testimonials = initialTestimonials } = useQuery({
    queryKey: ['/api/testimonials'],
  });
  
  const goToTestimonial = (index: number) => {
    if (index < 0) {
      index = testimonials.length - 1;
    } else if (index >= testimonials.length) {
      index = 0;
    }
    
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };
  
  const nextTestimonial = () => goToTestimonial(currentIndex + 1);
  const prevTestimonial = () => goToTestimonial(currentIndex - 1);
  
  return (
    <section className="py-16 bg-card clip-diagonal-reverse">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">TESTIMONIALS</h2>
          <p className="text-light-text max-w-2xl mx-auto">See what our clients say about our ethical hacking services</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className={`flex transition-transform duration-500 ease-in-out`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <Card 
                  key={testimonial.id}
                  className="min-w-full bg-primary rounded-lg shadow-lg mx-2 border-0"
                >
                  <CardContent className="p-8">
                    <div className="mb-6 text-secondary text-4xl">
                      <Quote />
                    </div>
                    <p className="text-light-text text-lg mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                        <p className="text-secondary text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`w-3 h-3 p-0 rounded-full ${
                  index === currentIndex ? "bg-secondary" : "bg-white bg-opacity-30"
                }`}
                onClick={() => goToTestimonial(index)}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 bg-card text-white w-12 h-12 rounded-full hover:bg-secondary hover:text-primary"
            onClick={prevTestimonial}
          >
            <ChevronLeft />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 bg-card text-white w-12 h-12 rounded-full hover:bg-secondary hover:text-primary"
            onClick={nextTestimonial}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
