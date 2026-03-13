import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  /**
   * 加载语音
   */
  private loadVoices(): void {
    if (!this.synth) return;

    const load = () => {
      const voices = this.synth!.getVoices();
      console.log('[TTS] 可用语音数量:', voices.length);
      // 优先选择英语语音
      this.voice = voices.find(v => v.lang === 'en-US') || 
                   voices.find(v => v.lang.startsWith('en')) ||
                   voices.find(v => v.lang === 'en-GB') ||
                   voices[0] || null;
      console.log('[TTS] 选中语音:', this.voice?.name, this.voice?.lang);
      this.isInitialized = true;
    };

    load();
    
    // 某些浏览器需要等待 voiceschanged 事件
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  /**
   * 朗读文本
   */
  speak(text: string, rate: number = 0.8, pitch: number = 1): void {
    if (!this.synth || !text) {
      console.warn('[TTS] 不支持或文本为空');
      return;
    }

    // 确保语音已加载
    if (!this.isInitialized) {
      console.log('[TTS] 语音未初始化，尝试重新加载...');
      this.loadVoices();
    }

    // 取消当前正在播放的语音
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // 语速 0.1-10
    utterance.pitch = pitch; // 音调 0-2
    utterance.volume = 1; // 音量 0-1
    
    if (this.voice) {
      utterance.voice = this.voice;
    }

    // 添加错误处理
    utterance.onerror = (event) => {
      console.error('[TTS] 播放错误:', event);
    };
    
    utterance.onend = () => {
      console.log('[TTS] 播放完成');
    };

    console.log('[TTS] 开始播放:', text);
    this.synth.speak(utterance);
  }

  /**
   * 朗读单词
   */
  speakWord(word: string): void {
    this.speak(word, 0.7, 1.1); // 稍慢的语速，稍高的音调更适合儿童
  }

  /**
   * 朗读例句
   */
  speakSentence(sentence: string): void {
    this.speak(sentence, 0.8, 1);
  }

  /**
   * 停止播放
   */
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * 检查是否支持 TTS
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * 检查是否正在播放
   */
  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }

  /**
   * 获取可用语音列表
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth?.getVoices() || [];
  }

  /**
   * 设置语音
   */
  setVoice(voice: SpeechSynthesisVoice | null): void {
    this.voice = voice;
  }
}
