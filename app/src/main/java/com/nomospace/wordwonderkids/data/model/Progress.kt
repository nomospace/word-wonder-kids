package com.nomospace.wordwonderkids.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey

/**
 * 学习进度数据模型
 */
@Entity(tableName = "progress")
data class WordProgress(
    @PrimaryKey val id: Long = 0,
    val wordId: Int,
    val timesStudied: Int = 0,
    val timesCorrect: Int = 0,
    val timesWrong: Int = 0,
    val lastStudiedAt: Long = System.currentTimeMillis(),
    val masteryLevel: MasteryLevel = MasteryLevel.NEW,
    val nextReviewAt: Long = 0
)

/**
 * 掌握程度
 */
enum class MasteryLevel(val displayName: String, val minCorrect: Int) {
    NEW("新单词", 0),
    LEARNING("学习中", 1),
    FAMILIAR("熟悉", 3),
    MASTERED("已掌握", 5);

    companion object {
        fun fromCorrectCount(count: Int): MasteryLevel {
            return values().reversed().find { count >= it.minCorrect } ?: NEW
        }
    }
}

/**
 * 用户整体学习统计
 */
data class LearningStats(
    val totalWordsLearned: Int,
    val totalStudyTime: Long, // in minutes
    val accuracy: Float, // 0.0 - 1.0
    val currentStreak: Int, // days
    val bestStreak: Int,
    val wordsByCategory: Map<String, Int>,
    val weakWords: List<WordProgress> // words with low accuracy
)

/**
 * 每日学习目标
 */
data class DailyGoal(
    val targetMinutes: Int = 20,
    val targetWords: Int = 10,
    val completedMinutes: Int = 0,
    val completedWords: Int = 0,
    val isCompleted: Boolean = completedMinutes >= targetMinutes || completedWords >= targetWords
)
