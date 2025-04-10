import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How are ethical hackers verified?",
    answer: "All ethical hackers on our platform undergo a rigorous verification process that includes identity verification, background checks, skill assessments, and credential verification. We also maintain a reputation system based on client feedback and project success."
  },
  {
    question: "How is my data protected during security assessments?",
    answer: "All hackers sign legally binding NDAs before accessing your systems. Our platform uses encrypted communications, and we have strict data handling policies. You control what access is granted, and our platform includes audit logging of all activities during assessments."
  },
  {
    question: "What types of reports will I receive?",
    answer: "You'll receive comprehensive reports detailing all identified vulnerabilities, categorized by severity (CVSS scoring), with detailed explanations, proof-of-concept demonstrations, and specific remediation recommendations. Executive summaries are also provided for management review."
  },
  {
    question: "How much does it cost to hire an ethical hacker?",
    answer: "Costs vary based on project scope, complexity, and the specific skills required. You can choose between fixed-price projects or hourly rates. Our platform provides transparent pricing, and you can get quotes from multiple hackers before deciding."
  },
  {
    question: "Is this legal? Are there any compliance concerns?",
    answer: "Yes, it's legal when proper authorization is documented. Our platform includes standardized authorization forms that define the scope of work and provide legal protection. We also offer guidance on compliance requirements for your specific industry and region."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-light-text max-w-2xl mx-auto">Common questions about our ethical hacking platform</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-0"
              >
                <AccordionTrigger className="bg-card p-4 rounded-lg text-white font-bold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-card bg-opacity-50 p-4 rounded-b-lg text-light-text mt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
