"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionResult {
  isSupported: boolean;
  isListening: boolean;
  start: () => void;
  stop: () => void;
}

export function useSpeechRecognition(
  onFinalResult: (text: string) => void
): UseSpeechRecognitionResult {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onFinalResultRef = useRef(onFinalResult);
  onFinalResultRef.current = onFinalResult;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const Ctor: typeof SpeechRecognition | undefined =
      window.SpeechRecognition ?? (window as any).webkitSpeechRecognition;

    if (!Ctor) {
      setIsSupported(false);
      return;
    }

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onFinalResultRef.current(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsSupported(true);

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    };
  }, []);

  const start = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setIsListening(true);
    recognitionRef.current.start();
  }, [isListening]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isSupported, isListening, start, stop };
}
