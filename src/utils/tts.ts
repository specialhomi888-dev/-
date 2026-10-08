/**
 * Web Speech API helper for Korean Dialect TTS
 */

export interface TTSOptions {
  rate?: number; // 0.8 - 1.3
  pitch?: number; // 0.8 - 1.2
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

export function getKoreanVoice(): SpeechSynthesisVoice | null {
  if (!isTTSSupported()) return null;
  
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  // Look for Korean voices
  const koreanVoice = cachedVoices.find(
    (v) => v.lang === 'ko-KR' || v.lang === 'ko_KR' || v.lang.toLowerCase().startsWith('ko')
  );

  return koreanVoice || null;
}

// Refresh voices on device load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function stopSpeaking(): void {
  if (isTTSSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
}

export function speakDialect(text: string, options: TTSOptions = {}): boolean {
  if (!isTTSSupported()) {
    options.onError?.('현재 브라우저에서는 음성 합성(TTS) 기능을 지원하지 않습니다.');
    return false;
  }

  try {
    // Cancel any previous speech
    window.speechSynthesis.cancel();

    // Clean up text for natural pronunciation
    // Dialect punctuations: keep commas and exclamation for natural cadence
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find Korean voice
    const voice = getKoreanVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'ko-KR';
    }

    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.05; // Slightly punchy pitch for dialect impact

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      // If user canceled, don't show error
      if (e.error === 'canceled' || e.error === 'interrupted') {
        options.onEnd?.();
        return;
      }
      options.onError?.('음성 재생 중 오류가 발생했습니다. 브라우저 설정을 확인해주세요.');
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    options.onError?.('음성 재생에 실패했습니다.');
    return false;
  }
}
