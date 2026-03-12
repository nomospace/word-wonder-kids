package com.nomospace.wordwonderkids.data.local

import androidx.room.*
import com.nomospace.wordwonderkids.data.model.Word
import com.nomospace.wordwonderkids.data.model.WordProgress
import kotlinx.coroutines.flow.Flow

@Dao
interface WordDao {

    // ========== Words ==========
    
    @Query("SELECT * FROM words ORDER BY id")
    fun getAllWords(): Flow<List<Word>>

    @Query("SELECT * FROM words WHERE category = :category ORDER BY id")
    fun getWordsByCategory(category: String): Flow<List<Word>>

    @Query("SELECT * FROM words WHERE id = :id")
    suspend fun getWordById(id: Int): Word?

    @Query("SELECT * FROM words WHERE difficulty = :difficulty ORDER BY RANDOM() LIMIT :limit")
    suspend fun getRandomWordsByDifficulty(difficulty: Int, limit: Int = 10): List<Word>

    @Query("SELECT DISTINCT category FROM words")
    fun getAllCategories(): Flow<List<String>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWord(word: Word)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWords(words: List<Word>)

    // ========== Progress ==========

    @Query("SELECT * FROM progress WHERE wordId = :wordId")
    suspend fun getProgressByWordId(wordId: Int): WordProgress?

    @Query("SELECT * FROM progress ORDER BY lastStudiedAt DESC")
    fun getAllProgress(): Flow<List<WordProgress>>

    @Query("""
        SELECT p.* FROM progress p
        JOIN words w ON p.wordId = w.id
        WHERE p.timesWrong > p.timesCorrect
        ORDER BY (p.timesWrong - p.timesCorrect) DESC
        LIMIT :limit
    """)
    suspend fun getWeakWords(limit: Int = 10): List<WordProgress>

    @Query("""
        SELECT COUNT(*) FROM progress 
        WHERE masteryLevel != 'NEW'
    """)
    fun getLearnedWordsCount(): Flow<Int>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProgress(progress: WordProgress)

    @Update
    suspend fun updateProgress(progress: WordProgress)

    @Query("""
        UPDATE progress 
        SET timesStudied = timesStudied + 1,
            timesCorrect = timesCorrect + :correctAdd,
            timesWrong = timesWrong + :wrongAdd,
            lastStudiedAt = :timestamp,
            masteryLevel = (
                CASE 
                    WHEN timesCorrect + :correctAdd >= 5 THEN 'MASTERED'
                    WHEN timesCorrect + :correctAdd >= 3 THEN 'FAMILIAR'
                    WHEN timesCorrect + :correctAdd >= 1 THEN 'LEARNING'
                    ELSE 'NEW'
                END
            )
        WHERE wordId = :wordId
    """)
    suspend fun updateProgressStats(
        wordId: Int,
        correctAdd: Int = 0,
        wrongAdd: Int = 0,
        timestamp: Long = System.currentTimeMillis()
    )

    @Query("DELETE FROM progress WHERE wordId = :wordId")
    suspend fun deleteProgress(wordId: Int)
}
