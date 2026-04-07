import { useTranslations } from "@/i18n/compat/client";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import AnimatedFeature from "./client/AnimatedFeature";
import GoDashboard from "./GoDashboard";
import Image from "@/lib/image";

export default function HeroSection() {
  const t = useTranslations("home");
  const heroTitle = t("hero.title");

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-[#fdf6f5] dark:bg-[#0a0a0a]">
      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <AnimatedFeature>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/70 dark:bg-white/10 dark:border-white/20 dark:text-white/70 mb-10 backdrop-blur-sm">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">{t("hero.badge")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-black dark:text-white">
            {heroTitle.split('\n')[0]}
            <br />
            <span className="text-black/70 dark:text-white/70">
              {heroTitle.split('\n')[1] || heroTitle.split('\n')[0]}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black/60 dark:text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoDashboard>
              <Button
                size="lg"
                className="rounded-2xl h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl active:scale-95 transition-all bg-white text-black hover:bg-gray-100 border-0 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </GoDashboard>

            <GoDashboard type="templates">
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl h-14 px-10 text-lg font-medium border-2 border-black/20 text-black hover:bg-black/5 active:scale-95 transition-all dark:border-white/30 dark:text-white dark:hover:bg-white/10"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t("hero.secondary")}
              </Button>
            </GoDashboard>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-black/50 dark:text-white/50">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Sin registro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Datos 100% privados</span>
            </div>
          </div>
        </AnimatedFeature>

        <AnimatedFeature delay={0.2}>
          <div className="mt-16 relative px-4 sm:px-0">
             <div className="absolute -inset-8 bg-black/5 dark:bg-white/5 rounded-[3rem] blur-3xl -z-10" />
             <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#141414] p-3 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src="/web-shot.png"
                  alt="Resume Editor Preview"
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-lg"
                  priority
                />
             </div>
             
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-sm">
               <span className="text-sm font-medium text-black/70 dark:text-white/70">Editor profesional listo para usar</span>
             </div>
          </div>
        </AnimatedFeature>
      </div>
    </section>
  );
}
