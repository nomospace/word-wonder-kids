package com.nomospace.wordwonderkids.util

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import java.util.Locale

/**
 * TTS 语音服务
 * 提供英文单词发音功能
 */
class TTSService(private val context: Context) : TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = null
    private var isInitialized = false
    private var isSpeaking = false

    init {
        tts = TextToSpeech(context, this)
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val result = tts?.setLanguage(Locale.US)
            isInitialized = result != TextToSpeech.LANG_MISSING_DATA &&
                    result != TextToSpeech.LANG_NOT_SUPPORTED
        }
    }

    /**
     * 朗读文本
     */
    fun speak(text: String, onComplete: (() -> Unit)? = null) {
        if (!isInitialized || isSpeaking) return

        isSpeaking = true
        val utteranceId = "utterance_${System.currentTimeMillis()}"
        
        tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {
                // Started speaking
            }

            override fun onDone(utteranceId: String?) {
                isSpeaking = false
                onComplete?.invoke()
            }

            override fun onError(utteranceId: String?) {
                isSpeaking = false
            }
        })

        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, utteranceId)
    }

    /**
     * 停止朗读
     */
    fun stop() {
        tts?.stop()
        isSpeaking = false
    }

    /**
     * 设置语速
     */
    fun setSpeechRate(rate: Float) {
        tts?.setSpeechRate(rate)
    }

    /**
     * 设置音调
     */
    fun setPitch(pitch: Float) {
        tts?.setPitch(pitch)
    }

    /**
     * 检查是否正在说话
     */
    fun isSpeaking(): Boolean = isSpeaking

    /**
     * 释放资源
     */
    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
        isInitialized = false
    }

    companion object {
        @Volatile
        private var instance: TTSService? = null

        fun getInstance(context: Context): TTSService {
            return instance ?: synchronized(this) {
                val newInstance = TTSService(context.applicationContext)
                instance = newInstance
                newInstance
            }
        }
    }
}

/**
 * 发音评测结果
 */
sealed class PronunciationResult {
    object Success : PronunciationResult()
    data class Error(val message: String) : PronunciationResult()
    object Listening : PronunciationResult()
}
