import { createFileRoute } from "@tanstack/react-router";
import { AIModelType, AI_MODEL_CONFIGS } from "@/config/ai";

export const Route = createFileRoute("/api/test")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { apiKey, model, modelType, apiEndpoint } = body as {
            apiKey: string;
            model?: string;
            modelType: AIModelType;
            apiEndpoint?: string;
          };

          const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
          if (!modelConfig) {
            return Response.json(
              { error: "Invalid model type" },
              { status: 400 }
            );
          }

          const response = await fetch(modelConfig.url(apiEndpoint), {
            method: "POST",
            headers: modelConfig.headers(apiKey),
            body: JSON.stringify({
              model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
              messages: [
                {
                  role: "user",
                  content: "Hello, respond with 'OK' only.",
                },
              ],
              max_tokens: 10,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            return Response.json(
              { error: data.error?.message || `HTTP ${response.status}` },
              { status: response.status }
            );
          }

          return Response.json({ success: true });
        } catch (error) {
          console.error("Test API error:", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
          );
        }
      }
    }
  }
});
