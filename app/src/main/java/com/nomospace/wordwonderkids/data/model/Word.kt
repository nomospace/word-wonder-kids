package com.nomospace.wordwonderkids.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * 单词数据模型
 * @param id 唯一标识
 * @param english 英文单词
 * @param chinese 中文释义
 * @param category 分类 (colors, animals, school, numbers, daily)
 * @param imageUrl 图片资源名
 * @param audioUrl 音频资源名 (可选，为空则使用 TTS)
 * @param example 例句英文
 * @param exampleChinese 例句中文
 * @param difficulty 难度等级 (1-3)
 */
@Entity(tableName = "words")
data class Word(
    @PrimaryKey val id: Int,
    val english: String,
    val chinese: String,
    val category: String,
    val imageUrl: String,
    val audioUrl: String? = null,
    val example: String,
    val exampleChinese: String,
    val difficulty: Int = 1
)

/**
 * 单词分类
 */
enum class WordCategory(val id: String, val displayName: String, val color: Int) {
    COLORS("colors", "颜色", android.R.color.holo_red_light),
    ANIMALS("animals", "动物", android.R.color.holo_blue_light),
    SCHOOL("school", "文具", android.R.color.holo_orange_light),
    NUMBERS("numbers", "数字", android.R.color.holo_green_light),
    DAILY("daily", "日常用品", android.R.color.holo_purple);

    companion object {
        fun fromId(id: String): WordCategory {
            return values().find { it.id == id } ?: ANIMALS
        }
    }
}
