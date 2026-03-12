package com.nomospace.wordwonderkids.data.local

import com.nomospace.wordwonderkids.data.model.Word

/**
 * 初始单词数据 - 二年级核心词汇
 * 覆盖人教 PEP 二年级主要单词
 */
object WordData {

    val initialWords = listOf(
        // ========== Colors 颜色 ==========
        Word(1, "red", "红色", "colors", "ic_color_red", null, "The apple is red.", "苹果是红色的。", 1),
        Word(2, "blue", "蓝色", "colors", "ic_color_blue", null, "The sky is blue.", "天空是蓝色的。", 1),
        Word(3, "green", "绿色", "colors", "ic_color_green", null, "The grass is green.", "草是绿色的。", 1),
        Word(4, "yellow", "黄色", "colors", "ic_color_yellow", null, "The banana is yellow.", "香蕉是黄色的。", 1),
        Word(5, "white", "白色", "colors", "ic_color_white", null, "The snow is white.", "雪是白色的。", 1),
        Word(6, "black", "黑色", "colors", "ic_color_black", null, "The cat is black.", "猫是黑色的。", 1),
        
        // ========== Animals 动物 ==========
        Word(7, "cat", "猫", "animals", "ic_animal_cat", null, "I have a cat.", "我有一只猫。", 1),
        Word(8, "dog", "狗", "animals", "ic_animal_dog", null, "The dog is friendly.", "这只狗很友好。", 1),
        Word(9, "bird", "鸟", "animals", "ic_animal_bird", null, "The bird can fly.", "鸟会飞。", 1),
        Word(10, "fish", "鱼", "animals", "ic_animal_fish", null, "The fish swims in water.", "鱼在水里游。", 1),
        Word(11, "rabbit", "兔子", "animals", "ic_animal_rabbit", null, "The rabbit has long ears.", "兔子有长耳朵。", 2),
        Word(12, "panda", "熊猫", "animals", "ic_animal_panda", null, "The panda is cute.", "熊猫很可爱。", 1),
        Word(13, "elephant", "大象", "animals", "ic_animal_elephant", null, "The elephant is big.", "大象很大。", 2),
        Word(14, "monkey", "猴子", "animals", "ic_animal_monkey", null, "The monkey likes bananas.", "猴子喜欢香蕉。", 2),
        Word(15, "tiger", "老虎", "animals", "ic_animal_tiger", null, "The tiger is strong.", "老虎很强壮。", 2),
        
        // ========== School 文具 ==========
        Word(16, "pen", "钢笔", "school", "ic_school_pen", null, "I write with a pen.", "我用钢笔写字。", 1),
        Word(17, "pencil", "铅笔", "school", "ic_school_pencil", null, "I draw with a pencil.", "我用铅笔画画。", 1),
        Word(18, "ruler", "尺子", "school", "ic_school_ruler", null, "Use a ruler to draw lines.", "用尺子画线。", 1),
        Word(19, "book", "书", "school", "ic_school_book", null, "I read a book.", "我读书。", 1),
        Word(20, "bag", "书包", "school", "ic_school_bag", null, "Put your books in the bag.", "把书放进书包。", 1),
        Word(21, "eraser", "橡皮", "school", "ic_school_eraser", null, "Use an eraser to clean mistakes.", "用橡皮擦掉错误。", 2),
        Word(22, "notebook", "笔记本", "school", "ic_school_notebook", null, "Write in your notebook.", "在笔记本上写字。", 2),
        
        // ========== Numbers 数字 ==========
        Word(23, "one", "一", "numbers", "ic_number_1", null, "I have one apple.", "我有一个苹果。", 1),
        Word(24, "two", "二", "numbers", "ic_number_2", null, "I have two eyes.", "我有两只眼睛。", 1),
        Word(25, "three", "三", "numbers", "ic_number_3", null, "I have three books.", "我有三本书。", 1),
        Word(26, "four", "四", "numbers", "ic_number_4", null, "A table has four legs.", "桌子有四条腿。", 1),
        Word(27, "five", "五", "numbers", "ic_number_5", null, "I have five fingers.", "我有五根手指。", 1),
        Word(28, "six", "六", "numbers", "ic_number_6", null, "Six is after five.", "六在五后面。", 2),
        Word(29, "seven", "七", "numbers", "ic_number_7", null, "Seven days in a week.", "一周有七天。", 2),
        Word(30, "eight", "八", "numbers", "ic_number_8", null, "Eight is a lucky number.", "八是幸运数字。", 2),
        Word(31, "nine", "九", "numbers", "ic_number_9", null, "Nine is after eight.", "九在八后面。", 2),
        Word(32, "ten", "十", "numbers", "ic_number_10", null, "I have ten toes.", "我有十个脚趾。", 2),
        
        // ========== Daily 日常用品 ==========
        Word(33, "cup", "杯子", "daily", "ic_daily_cup", null, "Drink water from a cup.", "用杯子喝水。", 1),
        Word(34, "bed", "床", "daily", "ic_daily_bed", null, "I sleep in my bed.", "我在床上睡觉。", 1),
        Word(35, "door", "门", "daily", "ic_daily_door", null, "Open the door, please.", "请开门。", 1),
        Word(36, "window", "窗户", "daily", "ic_daily_window", null, "Look out of the window.", "向窗外看。", 2),
        Word(37, "table", "桌子", "daily", "ic_daily_table", null, "Put the book on the table.", "把书放在桌子上。", 1),
        Word(38, "chair", "椅子", "daily", "ic_daily_chair", null, "Sit on the chair.", "坐在椅子上。", 1),
        Word(39, "light", "灯", "daily", "ic_daily_light", null, "Turn on the light.", "开灯。", 2),
        Word(40, "clock", "钟", "daily", "ic_daily_clock", null, "Look at the clock.", "看钟。", 2)
    )

    /**
     * 按分类获取单词
     */
    fun getWordsByCategory(category: String): List<Word> {
        return initialWords.filter { it.category == category }
    }

    /**
     * 获取所有分类
     */
    fun getAllCategories(): List<String> {
        return initialWords.map { it.category }.distinct()
    }

    /**
     * 获取指定难度的单词
     */
    fun getWordsByDifficulty(difficulty: Int): List<Word> {
        return initialWords.filter { it.difficulty == difficulty }
    }
}
