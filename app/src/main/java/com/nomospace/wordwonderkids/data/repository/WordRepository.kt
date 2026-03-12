package com.nomospace.wordwonderkids.data.repository

import com.nomospace.wordwonderkids.data.local.WordDao
import com.nomospace.wordwonderkids.data.local.WordData
import com.nomospace.wordwonderkids.data.model.LearningStats
import com.nomospace.wordwonderkids.data.model.Word
import com.nomospace.wordwonderkids.data.model.WordProgress
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * 单词数据仓库
 * 统一管理单词和学习进度数据
 */
class WordRepository(private val wordDao: WordDao) {

    // ========== Words ==========

    val allWords: Flow<List<Word>> = wordDao.getAllWords()

    fun getWordsByCategory(category: String): Flow<List<Word>> {
        return wordDao.getWordsByCategory(category)
    }

    suspend fun getWordById(id: Int): Word? {
        return withContext(Dispatchers.IO) {
            wordDao.getWordById(id)
        }
    }

    suspend fun getRandomWords(limit: Int = 10): List<Word> {
        return withContext(Dispatchers.IO) {
            wordDao.getRandomWordsByDifficulty(1, limit)
        }
    }

    val categories: Flow<List<String>> = wordDao.getAllCategories()

    suspend fun initializeWords() {
        withContext(Dispatchers.IO) {
            val existingCount = wordDao.getAllWords().firstOrNull()?.size ?: 0
            if (existingCount == 0) {
                wordDao.insertWords(WordData.initialWords)
            }
        }
    }

    // ========== Progress ==========

    suspend fun getProgressByWordId(wordId: Int): WordProgress? {
        return withContext(Dispatchers.IO) {
            wordDao.getProgressByWordId(wordId)
        }
    }

    val allProgress: Flow<List<WordProgress>> = wordDao.getAllProgress()

    suspend fun getWeakWords(limit: Int = 10): List<WordProgress> {
        return withContext(Dispatchers.IO) {
            wordDao.getWeakWords(limit)
        }
    }

    val learnedWordsCount: Flow<Int> = wordDao.getLearnedWordsCount()

    suspend fun recordLearningResult(wordId: Int, isCorrect: Boolean) {
        withContext(Dispatchers.IO) {
            val progress = wordDao.getProgressByWordId(wordId)
            if (progress == null) {
                wordDao.insertProgress(
                    WordProgress(
                        wordId = wordId,
                        timesStudied = 1,
                        timesCorrect = if (isCorrect) 1 else 0,
                        timesWrong = if (isCorrect) 0 else 1
                    )
                )
            } else {
                wordDao.updateProgressStats(
                    wordId = wordId,
                    correctAdd = if (isCorrect) 1 else 0,
                    wrongAdd = if (isCorrect) 0 else 1
                )
            }
        }
    }

    suspend fun getLearningStats(): LearningStats {
        return withContext(Dispatchers.IO) {
            val allProgressList = wordDao.getAllProgress().firstOrNull() ?: emptyList()
            val allWordsList = wordDao.getAllWords().firstOrNull() ?: emptyList()
            
            val totalWordsLearned = allProgressList.count { it.timesStudied > 0 }
            val totalCorrect = allProgressList.sumOf { it.timesCorrect }
            val totalWrong = allProgressList.sumOf { it.timesWrong }
            val totalAttempts = totalCorrect + totalWrong
            val accuracy = if (totalAttempts > 0) totalCorrect.toFloat() / totalAttempts else 0f

            val wordsByCategory = allWordsList.groupBy { it.category }
                .mapValues { entry ->
                    entry.value.count { word ->
                        allProgressList.any { it.wordId == word.id && it.timesStudied > 0 }
                    }
                }

            val weakWords = wordDao.getWeakWords(10)

            LearningStats(
                totalWordsLearned = totalWordsLearned,
                totalStudyTime = 0, // TODO: Track study time
                accuracy = accuracy,
                currentStreak = 0, // TODO: Track streak
                bestStreak = 0,
                wordsByCategory = wordsByCategory,
                weakWords = weakWords
            )
        }
    }
}
