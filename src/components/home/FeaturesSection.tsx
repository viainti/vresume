
import { useTranslations } from "@/i18n/compat/client";
import Image from "@/lib/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, Sparkles, Shield, Layout } from "lucide-react";
import AnimatedFeature from "./client/AnimatedFeature";

const features = [
  {
    icon: Sparkles,
    badge: "features.ai.badge",
    title: "features.ai.title",
    description: "features.ai.description",
    items: [
      {
        title: "features.ai.item1",
        description: "features.ai.item1_description",
        image: "/features/svg/polish.svg",
      },
      {
        title: "features.ai.item2",
        description: "features.ai.item2_description",
        image: "/features/svg/grammar.svg",
      },
    ],
  },
  {
    icon: Shield,
    badge: "features.storage.badge",
    title: "features.storage.title",
    description: "features.storage.description",
    items: [
      {
        title: "features.storage.item1",
        description: "features.storage.item1_description",
        image: "/features/svg/local-storage.svg",
      },
      {
        title: "features.storage.item2",
        description: "features.storage.item2_description",
        image: "/features/svg/export-formats.svg",
      },
    ],
  },
] as const;

const SLIDE_DURATION = 5000;

export default function FeaturesSection() {
  const t = useTranslations("home");
  const [activeFeatures, setActiveFeatures] = useState<number[]>(
    features.map(() => 0)
  );
  const [progresses, setProgresses] = useState<number[]>(features.map(() => 0));
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>(
    features.map(() => null)
  );

  const startProgressTimer = useCallback(
    (categoryIndex: number) => {
      if (intervalRefs.current[categoryIndex]) {
        clearInterval(intervalRefs.current[categoryIndex] as NodeJS.Timeout);
      }

      const updateInterval = 50;
      const progressIncrement = (updateInterval / SLIDE_DURATION) * 100;

      intervalRefs.current[categoryIndex] = setInterval(() => {
        setProgresses((prev) => {
          const newProgresses = [...prev];
          if (newProgresses[categoryIndex] < 100) {
            newProgresses[categoryIndex] += progressIncrement;
          }
          return newProgresses;
        });
      }, updateInterval);
    },
    []
  );

  useEffect(() => {
    progresses.forEach((progress, index) => {
      if (progress >= 100) {
        setProgresses((prev) => {
          const next = [...prev];
          next[index] = 0;
          return next;
        });
        
        setActiveFeatures((prevActive) => {
          const next = [...prevActive];
          const max = features[index].items.length - 1;
          next[index] = next[index] < max ? next[index] + 1 : 0;
          return next;
        });
      }
    });
  }, [progresses]);

  useEffect(() => {
    features.forEach((_, index) => startProgressTimer(index));
    return () => {
      intervalRefs.current.forEach((ref) => {
        if (ref) clearInterval(ref);
      });
    };
  }, [startProgressTimer]);

  const handleSlideChange = (categoryIndex: number, featureIndex: number) => {
    setActiveFeatures((prev) => {
      const next = [...prev];
      next[categoryIndex] = featureIndex;
      return next;
    });
    setProgresses((prev) => {
      const next = [...prev];
      next[categoryIndex] = 0;
      return next;
    });
    startProgressTimer(categoryIndex);
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedFeature>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-black/70 dark:bg-white/10 dark:border-white/20 dark:text-white/70 mb-6">
              <Layout className="w-4 h-4" />
              <span className="text-sm font-medium">Herramientas profesionales</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-black dark:text-white">
              {t("features.title")}
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>
        </AnimatedFeature>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((category, catIndex) => (
            <AnimatedFeature key={catIndex} delay={catIndex * 0.1}>
              <div className="relative">
                <div className="absolute -inset-[1px] bg-black/5 dark:bg-white/5 rounded-3xl" />
                
                <div className="relative bg-[#fdf6f5] dark:bg-[#141414] rounded-3xl border border-black/10 dark:border-white/10 p-8 h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-lg">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-black dark:text-white">{t(category.title)}</h3>
                      <p className="text-sm text-black/50 dark:text-white/50">{t(category.badge)}</p>
                    </div>
                  </div>

                  <p className="text-black/60 dark:text-white/60 mb-8 leading-relaxed">
                    {t(category.description)}
                  </p>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => handleSlideChange(catIndex, itemIndex)}
                        className={`w-full text-left p-4 rounded-2xl transition-all relative overflow-hidden ${
                          activeFeatures[catIndex] === itemIndex
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-white dark:bg-[#0a0a0a] hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10"
                        }`}
                      >
                        {activeFeatures[catIndex] === itemIndex && (
                          <div 
                            className="absolute bottom-0 left-0 h-0.5 bg-white/30 dark:bg-black/30 transition-all duration-75"
                            style={{ width: `${progresses[catIndex]}%` }}
                          />
                        )}
                        
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${
                            activeFeatures[catIndex] === itemIndex
                              ? "bg-white/20 dark:bg-black/20"
                              : "bg-black/5 dark:bg-white/10"
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 ${activeFeatures[catIndex] === itemIndex ? 'text-white dark:text-black' : 'text-black/70 dark:text-white/70'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${activeFeatures[catIndex] === itemIndex ? "text-white dark:text-black" : "text-black/70 dark:text-white/70"}`}>
                              {t(item.title)}
                            </h4>
                            <p className={`text-sm ${activeFeatures[catIndex] === itemIndex ? "text-white/70 dark:text-black/70" : "text-black/40 dark:text-white/40"}`}>
                              {t(item.description)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10">
                    <Image
                      src={category.items[activeFeatures[catIndex]].image}
                      alt={t(category.items[activeFeatures[catIndex]].title)}
                      fill
                      className="object-cover opacity-90"
                    />
                  </div>
                </div>
              </div>
            </AnimatedFeature>
          ))}
        </div>
      </div>
    </section>
  );
}
