import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AI_MODEL_CONFIGS, AIModelType } from "@/config/ai";

const IS_PRODUCTION = process.env.NEXT_PUBLIC_PRODUCTION_MODE === "true";

const getEnvOrDefault = (envKey: string, defaultValue: string): string => {
  if (IS_PRODUCTION) {
    return process.env[envKey] || defaultValue;
  }
  return defaultValue;
};

const getEnvModel = (modelEnvKey: string, defaultModel: string): string => {
  if (IS_PRODUCTION) {
    return process.env[modelEnvKey] || defaultModel;
  }
  return defaultModel;
};

interface AIConfigState {
  selectedModel: AIModelType;
  doubaoApiKey: string;
  doubaoModelId: string;
  deepseekApiKey: string;
  deepseekModelId: string;
  openaiApiKey: string;
  openaiModelId: string;
  openaiApiEndpoint: string;
  geminiApiKey: string;
  geminiModelId: string;
  openrouterApiKey: string;
  openrouterModelId: string;
  setSelectedModel: (model: AIModelType) => void;
  setDoubaoApiKey: (apiKey: string) => void;
  setDoubaoModelId: (modelId: string) => void;
  setDeepseekApiKey: (apiKey: string) => void;
  setDeepseekModelId: (modelId: string) => void;
  setOpenaiApiKey: (apiKey: string) => void;
  setOpenaiModelId: (modelId: string) => void;
  setOpenaiApiEndpoint: (endpoint: string) => void;
  setGeminiApiKey: (apiKey: string) => void;
  setGeminiModelId: (modelId: string) => void;
  setOpenrouterApiKey: (apiKey: string) => void;
  setOpenrouterModelId: (modelId: string) => void;
  isConfigured: () => boolean;
}

const getInitialSelectedModel = (): AIModelType => {
  if (IS_PRODUCTION) {
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (openrouterKey) return "openrouter";
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) return "openai";
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) return "gemini";
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    if (deepseekKey) return "deepseek";
    return "openrouter";
  }
  return "doubao";
};

export const useAIConfigStore = create<AIConfigState>()(
  persist(
    (set, get) => ({
      selectedModel: getInitialSelectedModel(),
      doubaoApiKey: "",
      doubaoModelId: "",
      deepseekApiKey: getEnvOrDefault("DEEPSEEK_API_KEY", ""),
      deepseekModelId: "",
      openaiApiKey: getEnvOrDefault("OPENAI_API_KEY", ""),
      openaiModelId: getEnvModel("OPENAI_MODEL_ID", ""),
      openaiApiEndpoint: getEnvOrDefault("OPENAI_API_ENDPOINT", "https://api.openai.com/v1"),
      geminiApiKey: getEnvOrDefault("GEMINI_API_KEY", ""),
      geminiModelId: getEnvModel("GEMINI_MODEL_ID", "gemini-flash-latest"),
      openrouterApiKey: getEnvOrDefault("OPENROUTER_API_KEY", ""),
      openrouterModelId: getEnvModel("OPENROUTER_MODEL_ID", "anthropic/claude-3.5-haiku"),
      setSelectedModel: (model: AIModelType) => set({ selectedModel: model }),
      setDoubaoApiKey: (apiKey: string) => set({ doubaoApiKey: apiKey }),
      setDoubaoModelId: (modelId: string) => set({ doubaoModelId: modelId }),
      setDeepseekApiKey: (apiKey: string) => set({ deepseekApiKey: apiKey }),
      setDeepseekModelId: (modelId: string) => set({ deepseekModelId: modelId }),
      setOpenaiApiKey: (apiKey: string) => set({ openaiApiKey: apiKey }),
      setOpenaiModelId: (modelId: string) => set({ openaiModelId: modelId }),
      setOpenaiApiEndpoint: (endpoint: string) => set({ openaiApiEndpoint: endpoint }),
      setGeminiApiKey: (apiKey: string) => set({ geminiApiKey: apiKey }),
      setGeminiModelId: (modelId: string) => set({ geminiModelId: modelId }),
      setOpenrouterApiKey: (apiKey: string) => set({ openrouterApiKey: apiKey }),
      setOpenrouterModelId: (modelId: string) => set({ openrouterModelId: modelId }),
      isConfigured: () => {
        const state = get();
        const config = AI_MODEL_CONFIGS[state.selectedModel];
        return config.validate(state);
      }
    }),
    {
      name: "ai-config-storage"
    }
  )
);
