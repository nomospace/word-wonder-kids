package com.nomospace.wordwonderkids

import android.app.Application
import com.nomospace.wordwonderkids.data.local.WordDatabase
import com.nomospace.wordwonderkids.data.repository.WordRepository
import com.nomospace.wordwonderkids.util.PreferencesManager
import com.nomospace.wordwonderkids.util.TTSService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

/**
 * Application 类
 * APP 全局初始化
 */
class WordWonderApp : Application() {

    val appScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)

    lateinit var database: WordDatabase
        private set

    lateinit var repository: WordRepository
        private set

    lateinit var preferencesManager: PreferencesManager
        private set

    lateinit var ttsService: TTSService
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this

        // 初始化数据库
        database = WordDatabase.getDatabase(this)

        // 初始化仓库
        repository = WordRepository(database.wordDao())

        // 初始化偏好设置
        preferencesManager = PreferencesManager(this)

        // 初始化 TTS
        ttsService = TTSService.getInstance(this)

        // 初始化单词数据
        appScope.launch(Dispatchers.IO) {
            repository.initializeWords()
        }
    }

    override fun onTerminate() {
        super.onTerminate()
        ttsService.shutdown()
    }

    companion object {
        lateinit var instance: WordWonderApp
            private set
    }
}
