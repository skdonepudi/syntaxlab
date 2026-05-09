"use client";
import { useState, useRef, useCallback } from "react";

interface UseCompletionOptions {
  api: string;
  onFinish?: (prompt: string, completion: string) => void;
  onError?: (error: Error) => void;
}

interface CompleteOptions {
  body?: Record<string, unknown>;
}

export function useCompletion({ api, onFinish, onError }: UseCompletionOptions) {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const complete = useCallback(
    async (prompt: string, options?: CompleteOptions) => {
      abortControllerRef.current?.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoading(true);
      setCompletion("");

      try {
        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, ...options?.body }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          const error = new Error(`AI request failed: ${response.statusText}`);
          onError?.(error);
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setCompletion(fullText);
        }

        onFinish?.(prompt, fullText);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          onError?.(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [api, onFinish, onError]
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { completion, isLoading, complete, stop };
}
