package com.nomospace.wordwonderkids.util

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import java.io.IOException

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

/**
 * 用户偏好设置管理
 */
class PreferencesManager(private val context: Context) {

    // ========== Keys ==========
    
    companion object {
        val DAILY_LIMIT_MINUTES = intPreferencesKey("daily_limit_minutes")
        val SESSION_LIMIT_MINUTES = intPreferencesKey("session_limit_minutes")
        val SOUND_ENABLED = booleanPreferencesKey("sound_enabled")
        val MUSIC_ENABLED = booleanPreferencesKey("music_enabled")
        val NOTIFICATIONS_ENABLED = booleanPreferencesKey("notifications_enabled")
        val LAST_STUDY_DATE = longPreferencesKey("last_study_date")
        val STUDY_STREAK = intPreferencesKey("study_streak")
        val BEST_STREAK = intPreferencesKey("best_streak")
        val TOTAL_STUDY_TIME = intPreferencesKey("total_study_time")
        val PARENT_GATE_ENABLED = booleanPreferencesKey("parent_gate_enabled")
    }

    // ========== Settings ==========

    /**
     * 每日学习时长限制（分钟）
     */
    val dailyLimitMinutes: Flow<Int> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences())
            else throw exception
        }
        .map { preferences ->
            preferences[DAILY_LIMIT_MINUTES] ?: 30
        }

    suspend fun setDailyLimitMinutes(minutes: Int) {
        context.dataStore.edit { preferences ->
            preferences[DAILY_LIMIT_MINUTES] = minutes
        }
    }

    /**
     * 单次学习时长限制（分钟）
     */
    val sessionLimitMinutes: Flow<Int> = context.dataStore.data
        .map { preferences ->
            preferences[SESSION_LIMIT_MINUTES] ?: 10
        }

    suspend fun setSessionLimitMinutes(minutes: Int) {
        context.dataStore.edit { preferences ->
            preferences[SESSION_LIMIT_MINUTES] = minutes
        }
    }

    /**
     * 音效开关
     */
    val soundEnabled: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[SOUND_ENABLED] ?: true
        }

    suspend fun setSoundEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[SOUND_ENABLED] = enabled
        }
    }

    /**
     * 背景音乐开关
     */
    val musicEnabled: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[MUSIC_ENABLED] ?: false
        }

    suspend fun setMusicEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[MUSIC_ENABLED] = enabled
        }
    }

    /**
     * 学习提醒开关
     */
    val notificationsEnabled: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[NOTIFICATIONS_ENABLED] ?: true
        }

    /**
     * 家长验证开关
     */
    val parentGateEnabled: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[PARENT_GATE_ENABLED] ?: true
        }

    suspend fun setParentGateEnabled(enabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[PARENT_GATE_ENABLED] = enabled
        }
    }

    // ========== Study Stats ==========

    /**
     * 上次学习日期
     */
    val lastStudyDate: Flow<Long> = context.dataStore.data
        .map { preferences ->
            preferences[LAST_STUDY_DATE] ?: 0L
        }

    suspend fun updateStudyDate() {
        val today = System.currentTimeMillis()
        context.dataStore.edit { preferences ->
            preferences[LAST_STUDY_DATE] = today
        }
    }

    /**
     * 连续学习天数
     */
    val studyStreak: Flow<Int> = context.dataStore.data
        .map { preferences ->
            preferences[STUDY_STREAK] ?: 0
        }

    suspend fun updateStreak() {
        val today = getTodayMillis()
        val lastDate = context.dataStore.data.map { it[LAST_STUDY_DATE] ?: 0L }.firstOrNull() ?: 0L
        val lastStudyDay = lastDate / (24 * 60 * 60 * 1000)
        val todayDay = today / (24 * 60 * 60 * 1000)
        
        val currentStreak = context.dataStore.data.map { it[STUDY_STREAK] ?: 0 }.firstOrNull() ?: 0
        val bestStreak = context.dataStore.data.map { it[BEST_STREAK] ?: 0 }.firstOrNull() ?: 0
        
        val newStreak = when {
            todayDay == lastStudyDay -> currentStreak // Same day, no change
            todayDay == lastStudyDay + 1 -> currentStreak + 1 // Consecutive day
            else -> 1 // Streak broken, start over
        }
        
        context.dataStore.edit { preferences ->
            preferences[STUDY_STREAK] = newStreak
            preferences[BEST_STREAK] = maxOf(bestStreak, newStreak)
            preferences[LAST_STUDY_DATE] = today
        }
    }

    /**
     * 总学习时长（分钟）
     */
    val totalStudyTime: Flow<Int> = context.dataStore.data
        .map { preferences ->
            preferences[TOTAL_STUDY_TIME] ?: 0
        }

    suspend fun addStudyTime(minutes: Int) {
        context.dataStore.edit { preferences ->
            val current = preferences[TOTAL_STUDY_TIME] ?: 0
            preferences[TOTAL_STUDY_TIME] = current + minutes
        }
    }

    private fun getTodayMillis(): Long {
        val calendar = java.util.Calendar.getInstance()
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 0)
        calendar.set(java.util.Calendar.MINUTE, 0)
        calendar.set(java.util.Calendar.SECOND, 0)
        calendar.set(java.util.Calendar.MILLISECOND, 0)
        return calendar.timeInMillis
    }
}
