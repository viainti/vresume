
import React from "react";
import { useTranslations } from "@/i18n/compat/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import AnimatedFeature from "./client/AnimatedFeature";

export default function FAQSection() {
  const t = useTranslations("home.faq");
  const faqItems = t.raw("items");

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatedFeature>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-black/5 border border-black/10 dark:bg-white/10 dark:border-white/20 mb-6">
              <HelpCircle className="w-6 h-6 text-black/70 dark:text-white/70" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black dark:text-white">
              {t("title")}
            </h2>
            <p className="text-black/50 dark:text-white/50 text-lg">Las respuestas a tus dudas</p>
          </div>
        </AnimatedFeature>

        <AnimatedFeature delay={0.1}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map(
              (item: { question: string; answer: string }, index: number) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-black/10 dark:border-white/10 rounded-2xl px-6 bg-[#fdf6f5] dark:bg-[#141414] hover:bg-black/5 dark:hover:bg-white/10 transition-colors overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-lg font-medium py-5 hover:no-underline text-black dark:text-white">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-black/60 dark:text-white/60 leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </AnimatedFeature>
      </div>
    </section>
  );
}
