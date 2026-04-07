import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Check } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import AnimatedFeature from "./client/AnimatedFeature";
import GoDashboard from "./GoDashboard";

export default function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#fdf6f5] dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-black/50 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-4xl relative">
        <AnimatedFeature>
          <div className="relative text-center">
            <div className="relative bg-white dark:bg-[#141414] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white" />
              
              <div className="px-8 py-16 md:px-16 md:py-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/70 dark:bg-white/10 dark:border-white/20 dark:text-white/70 mb-8">
                  <Rocket className="w-4 h-4" />
                  <span className="text-sm font-medium">Sin costo · Sin registro</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-black dark:text-white">
                  {t("cta.title")}
                </h2>
                
                <p className="text-xl text-black/60 dark:text-white/60 mb-12 max-w-xl mx-auto">
                  {t("cta.description")}
                </p>
                
                <GoDashboard>
                  <Button 
                    size="lg" 
                    className="rounded-2xl h-16 px-12 text-lg font-semibold shadow-xl hover:shadow-2xl active:scale-95 transition-all bg-white text-black hover:bg-gray-100 border-0 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    {t("cta.button")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </GoDashboard>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-black/50 dark:text-white/50">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>100% Gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Sin registro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Datos privados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Exporta a PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedFeature>
      </div>
    </section>
  );
}
