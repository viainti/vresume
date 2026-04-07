import { useEffect, useState } from "react";
import { Check, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DeepSeekLogo from "@/components/ai/icon/IconDeepseek";
import IconDoubao from "@/components/ai/icon/IconDoubao";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";
import IconOpenAi from "@/components/ai/icon/IconOpenAi";
import IconOpenRouter from "@/components/ai/icon/IconOpenRouter";
import { toast } from "sonner";
import { AIModelType } from "@/config/ai";

const IS_PRODUCTION_MODE = process.env.NEXT_PUBLIC_PRODUCTION_MODE === "true";

const AISettingsPage = () => {
  const {
    doubaoApiKey,
    doubaoModelId,
    deepseekApiKey,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    geminiApiKey,
    geminiModelId,
    openrouterApiKey,
    openrouterModelId,
    setDoubaoApiKey,
    setDoubaoModelId,
    setDeepseekApiKey,
    setOpenaiApiKey,
    setOpenaiModelId,
    setOpenaiApiEndpoint,
    setGeminiApiKey,
    setGeminiModelId,
    setOpenrouterApiKey,
    setOpenrouterModelId,
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();
  const [isTesting, setIsTesting] = useState(false);

  const t = useTranslations();

  const allModels = [
    {
      id: "deepseek",
      name: t("dashboard.settings.ai.deepseek.title"),
      description: t("dashboard.settings.ai.deepseek.description"),
      icon: DeepSeekLogo,
      link: "https://platform.deepseek.com",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      isConfigured: !!deepseekApiKey,
    },
    {
      id: "doubao",
      name: t("dashboard.settings.ai.doubao.title"),
      description: t("dashboard.settings.ai.doubao.description"),
      icon: IconDoubao,
      link: "https://console.volcengine.com/ark",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!(doubaoApiKey && doubaoModelId),
    },
    {
      id: "openai",
      name: t("dashboard.settings.ai.openai.title"),
      description: t("dashboard.settings.ai.openai.description"),
      icon: IconOpenAi,
      link: "https://platform.openai.com/api-keys",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!(openaiApiKey && openaiModelId && openaiApiEndpoint),
    },
    {
      id: "gemini",
      name: t("dashboard.settings.ai.gemini.title"),
      description: t("dashboard.settings.ai.gemini.description"),
      icon: Sparkles,
      link: "https://aistudio.google.com/app/apikey",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/50",
      isConfigured: !!(geminiApiKey && geminiModelId),
    },
    {
      id: "openrouter",
      name: t("dashboard.settings.ai.openrouter.title"),
      description: t("dashboard.settings.ai.openrouter.description"),
      icon: IconOpenRouter,
      link: "https://openrouter.ai/keys",
      color: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950/50",
      isConfigured: !!(openrouterApiKey && openrouterModelId),
    },
  ];

  const models = IS_PRODUCTION_MODE
    ? allModels.filter((m) => m.id === "openrouter")
    : allModels;

  const getDefaultModel = () => {
    if (IS_PRODUCTION_MODE && !models.find((m) => m.id === selectedModel)) {
      return "openrouter";
    }
    return selectedModel;
  };

  const [currentModel, setCurrentModel] = useState(getDefaultModel());

  const getModelConfig = (modelId: string) => {
    switch (modelId) {
      case "doubao":
        return { apiKey: doubaoApiKey, modelId: doubaoModelId, apiEndpoint: undefined };
      case "deepseek":
        return { apiKey: deepseekApiKey, modelId: undefined, apiEndpoint: undefined };
      case "openai":
        return { apiKey: openaiApiKey, modelId: openaiModelId, apiEndpoint: openaiApiEndpoint };
      case "gemini":
        return { apiKey: geminiApiKey, modelId: geminiModelId, apiEndpoint: undefined };
      case "openrouter":
        return { apiKey: openrouterApiKey, modelId: openrouterModelId, apiEndpoint: undefined };
      default:
        return { apiKey: "", modelId: undefined, apiEndpoint: undefined };
    }
  };

  const handleTestConnection = async (modelId: string) => {
    const config = getModelConfig(modelId);
    if (!config.apiKey) {
      toast.error(t("dashboard.settings.ai.notConfigured"));
      return;
    }
    if (modelId !== "deepseek" && !config.modelId) {
      toast.error(t("dashboard.settings.ai.modelRequired"));
      return;
    }

    setIsTesting(true);
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelType: modelId,
          apiKey: config.apiKey,
          model: config.modelId,
          apiEndpoint: config.apiEndpoint,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(t("dashboard.settings.ai.testSuccess"));
      } else {
        toast.error(data.error || t("dashboard.settings.ai.testFailed"));
      }
    } catch (error) {
      toast.error(t("dashboard.settings.ai.testFailed"));
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    if (IS_PRODUCTION_MODE && !models.find((m) => m.id === selectedModel)) {
      setSelectedModel("openrouter");
      setCurrentModel("openrouter");
    } else {
      setCurrentModel(selectedModel);
    }
  }, [selectedModel, models, setSelectedModel]);

  const handleApiKeyChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini" | "openrouter"
  ) => {
    const newApiKey = e.target.value;
    if (type === "doubao") {
      setDoubaoApiKey(newApiKey);
    } else if (type === "deepseek") {
      setDeepseekApiKey(newApiKey);
    } else if (type === "gemini") {
      setGeminiApiKey(newApiKey);
    } else if (type === "openrouter") {
      setOpenrouterApiKey(newApiKey);
    } else {
      setOpenaiApiKey(newApiKey);
    }
  };

  const handleModelIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doubao" | "deepseek" | "openai" | "gemini" | "openrouter"
  ) => {
    const newModelId = e.target.value;
    if (type === "doubao") {
      setDoubaoModelId(newModelId);
    } else if (type === "openai") {
      setOpenaiModelId(newModelId);
    } else if (type === "gemini") {
      setGeminiModelId(newModelId);
    } else if (type === "openrouter") {
      setOpenrouterModelId(newModelId);
    }
  };

  const handleApiEndpointChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "openai"
  ) => {
    const newApiEndpoint = e.target.value;
    if (type === "openai") {
      setOpenaiApiEndpoint(newApiEndpoint);
    }
  };

  return (
    <div className="mx-auto py-4 px-4">
      <div className="flex gap-8">
        <div className="w-64 space-y-6">
          <div className="flex flex-col space-y-1">
            {models.map((model) => {
              const Icon = model.icon;
              const isChecked = selectedModel === model.id;
              const isViewing = currentModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => {
                    setCurrentModel(model.id as typeof currentModel);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
                    "transition-all duration-200 cursor-pointer",
                    "hover:bg-primary/10 hover:border-primary/30",
                    isViewing
                      ? "bg-primary/10 border-primary/40"
                      : "border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0",
                      isViewing ? "text-primary" : "text-muted-foreground"
                    )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  <div className="flex-1 min-w-0 flex flex-col items-start">
                    <span
                      className={cn(
                        "font-medium text-sm",
                        isViewing && "text-primary"
                      )}
                    >
                      {model.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {model.isConfigured
                        ? t("common.configured")
                        : t("common.notConfigured")}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Select ${model.name}`}
                    onClick={() => {
                      setSelectedModel(
                        model.id as "doubao" | "deepseek" | "openai" | "gemini" | "openrouter"
                      );
                      setCurrentModel(
                        model.id as "doubao" | "deepseek" | "openai" | "gemini" | "openrouter"
                      );
                    }}
                    className={cn(
                      "h-6 w-6 rounded-md flex items-center justify-center border transition-all",
                      "shrink-0",
                      isChecked
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-transparent border-muted-foreground/40 text-transparent hover:border-primary/40"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          {models.map(
            (model) =>
              model.id === currentModel && (
                <div key={model.id} className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <div className={cn("shrink-0", model.color)}>
                          <model.icon className="h-6 w-6" />
                        </div>
                        {model.name}
                      </h2>
                      <p className="mt-2 text-muted-foreground">
                        {model.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(model.id)}
                      disabled={isTesting}
                      className="gap-2"
                    >
                      {isTesting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                      {t("dashboard.settings.ai.testConnection")}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">
                          {t(`dashboard.settings.ai.${model.id}.apiKey`)}
                        </Label>
                        {!IS_PRODUCTION_MODE && (
                          <a
                            href={model.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                          >
                            {t("dashboard.settings.ai.getApiKey")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      {IS_PRODUCTION_MODE ? (
                        <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            Configured via .env
                          </span>
                          <Check className="h-4 w-4 ml-2 text-green-500" />
                        </div>
                      ) : (
                        <Input
                          value={
                            model.id === "doubao"
                              ? doubaoApiKey
                              : model.id === "openai"
                              ? openaiApiKey
                              : model.id === "gemini"
                              ? geminiApiKey
                              : model.id === "openrouter"
                              ? openrouterApiKey
                              : deepseekApiKey
                          }
                          onChange={(e) =>
                            handleApiKeyChange(
                              e,
                              model.id as "doubao" | "deepseek" | "openai" | "gemini" | "openrouter"
                            )
                          }
                          type="password"
                          placeholder={t(
                            `dashboard.settings.ai.${model.id}.apiKey`
                          )}
                          className={cn(
                            "h-11",
                            "bg-white dark:bg-gray-900",
                            "border-gray-200 dark:border-gray-800",
                            "focus:ring-2 focus:ring-primary/20"
                          )}
                        />
                      )}
                    </div>

                    {model.id === "doubao" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.doubao.modelId")}
                        </Label>
                        {IS_PRODUCTION_MODE ? (
                          <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {doubaoModelId || "Not configured in .env"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            value={doubaoModelId}
                            onChange={(e) => handleModelIdChange(e, "doubao")}
                            placeholder={t(
                              "dashboard.settings.ai.doubao.modelId"
                            )}
                            className={cn(
                              "h-11",
                              "bg-white dark:bg-gray-900",
                              "border-gray-200 dark:border-gray-800",
                              "focus:ring-2 focus:ring-primary/20"
                            )}
                          />
                        )}
                      </div>
                    )}

                    {model.id === "openai" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.openai.modelId")}
                        </Label>
                        {IS_PRODUCTION_MODE ? (
                          <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {openaiModelId || "Not configured in .env"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            value={openaiModelId}
                            onChange={(e) => handleModelIdChange(e, "openai")}
                            placeholder={t(
                              "dashboard.settings.ai.openai.modelId"
                            )}
                            className={cn(
                              "h-11",
                              "bg-white dark:bg-gray-900",
                              "border-gray-200 dark:border-gray-800",
                              "focus:ring-2 focus:ring-primary/20"
                            )}
                          />
                        )}
                      </div>
                    )}

                    {model.id === "gemini" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.gemini.modelId")}
                        </Label>
                        {IS_PRODUCTION_MODE ? (
                          <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {geminiModelId || "Not configured in .env"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            value={geminiModelId}
                            onChange={(e) => handleModelIdChange(e, "gemini")}
                            placeholder={t("dashboard.settings.ai.gemini.modelId")}
                            className={cn(
                              "h-11",
                              "bg-white dark:bg-gray-900",
                              "border-gray-200 dark:border-gray-800",
                              "focus:ring-2 focus:ring-primary/20"
                            )}
                          />
                        )}
                      </div>
                    )}

                    {model.id === "openrouter" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.openrouter.modelId")}
                        </Label>
                        {IS_PRODUCTION_MODE ? (
                          <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {openrouterModelId || "Not configured in .env"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            value={openrouterModelId}
                            onChange={(e) => handleModelIdChange(e, "openrouter")}
                            placeholder={t("dashboard.settings.ai.openrouter.modelId")}
                            className={cn(
                              "h-11",
                              "bg-white dark:bg-gray-900",
                              "border-gray-200 dark:border-gray-800",
                              "focus:ring-2 focus:ring-primary/20"
                            )}
                          />
                        )}
                      </div>
                    )}

                    {model.id === "openai" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.openai.apiEndpoint")}
                        </Label>
                        {IS_PRODUCTION_MODE ? (
                          <div className="h-11 px-4 flex items-center bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md">
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {openaiApiEndpoint || "Not configured in .env"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            value={openaiApiEndpoint}
                            onChange={(e) => handleApiEndpointChange(e, "openai")}
                            placeholder={t(
                              "dashboard.settings.ai.openai.apiEndpoint"
                            )}
                            className={cn(
                              "h-11",
                              "bg-white dark:bg-gray-900",
                              "border-gray-200 dark:border-gray-800",
                              "focus:ring-2 focus:ring-primary/20"
                            )}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export const runtime = "edge";

export default AISettingsPage;
