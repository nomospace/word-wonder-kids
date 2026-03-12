package com.nomospace.wordwonderkids.ui.screens.game

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nomospace.wordwonderkids.data.local.WordData

/**
 * 游戏界面
 * 支持多种游戏类型：连连看、听音选图、填字母
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GameScreen(
    gameType: String? = null,
    onNavigateToGameType: (String) -> Unit = {},
    onNavigateBack: () -> Unit = {}
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(gameType?.let { 
                    when(it) {
                        "match" -> "连连看"
                        "listen" -> "听音选图"
                        "spell" -> "填字母"
                        else -> "游戏"
                    }
                } ?: "游戏") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { paddingValues ->
        if (gameType == null) {
            // 游戏选择界面
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                GameOptionCard(
                    title = "连连看",
                    description = "英文单词匹配中文或图片",
                    icon = Icons.Default.Extension,
                    color = Color(0xFFFF6B6B),
                    onClick = { onNavigateToGameType("match") }
                )
                GameOptionCard(
                    title = "听音选图",
                    description = "播放发音，选择正确的图片",
                    icon = Icons.Default.Headphones,
                    color = Color(0xFF4ECDC4),
                    onClick = { onNavigateToGameType("listen") }
                )
                GameOptionCard(
                    title = "填字母",
                    description = "补全单词中缺失的字母",
                    icon = Icons.Default.Edit,
                    color = Color(0xFFFFE66D),
                    onClick = { onNavigateToGameType("spell") }
                )
            }
        } else {
            // 游戏进行界面
            GamePlayScreen(gameType = gameType)
        }
    }
}

@Composable
fun GameOptionCard(
    title: String,
    description: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = onClick,
        colors = CardDefaults.cardColors(containerColor = color.copy(alpha = 0.1f))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(56.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(color),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(32.dp)
                )
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = title,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = color
                )
                Text(
                    text = description,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "开始",
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun GamePlayScreen(gameType: String) {
    var score by remember { mutableStateOf(0) }
    var level by remember { mutableStateOf(1) }
    var showResult by remember { mutableStateOf(false) }
    var isCorrect by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 分数和关卡
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Chip(score = score)
            Chip(level = level)
        }

        // 游戏区域
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(MaterialTheme.colorScheme.surfaceVariant),
            contentAlignment = Alignment.Center
        ) {
            when (gameType) {
                "match" -> MatchGameContent(onAnswer = { correct ->
                    isCorrect = correct
                    showResult = true
                    if (correct) score += 10
                })
                "listen" -> ListenGameContent(onAnswer = { correct ->
                    isCorrect = correct
                    showResult = true
                    if (correct) score += 10
                })
                "spell" -> SpellGameContent(onAnswer = { correct ->
                    isCorrect = correct
                    showResult = true
                    if (correct) score += 10
                })
            }
        }

        // 结果提示
        if (showResult) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(
                    containerColor = if (isCorrect) Color(0xFF00B894) else Color(0xFFFF7675)
                )
            ) {
                Text(
                    text = if (isCorrect) "太棒了！🎉" else "再试一次！💪",
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    textAlign = TextAlign.Center,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }
            LaunchedEffect(showResult) {
                kotlinx.coroutines.delay(1500)
                showResult = false
            }
        }
    }
}

@Composable
fun Chip(score: Int) {
    Surface(
        shape = RoundedCornerShape(20.dp),
        color = MaterialTheme.colorScheme.primary
    ) {
        Text(
            text = "得分：$score",
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            color = Color.White,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun Chip(level: Int) {
    Surface(
        shape = RoundedCornerShape(20.dp),
        color = MaterialTheme.colorScheme.secondary
    ) {
        Text(
            text = "第 $level 关",
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
            color = Color.White,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun MatchGameContent(onAnswer: (Boolean) -> Unit) {
    val words = remember { WordData.initialWords.take(6).shuffled() }
    
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "连线配对",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
        
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(words) { word ->
                GameCard(
                    text = word.english,
                    onClick = { onAnswer(true) } // Simplified for demo
                )
            }
        }
    }
}

@Composable
fun ListenGameContent(onAnswer: (Boolean) -> Unit) {
    val words = remember { WordData.initialWords.take(4).shuffled() }
    
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        FilledIconButton(
            onClick = { /* Play audio */ },
            modifier = Modifier.size(64.dp)
        ) {
            Icon(Icons.Default.VolumeUp, contentDescription = "播放发音")
        }
        
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(words) { word ->
                GameCard(
                    text = word.chinese,
                    onClick = { onAnswer(true) }
                )
            }
        }
    }
}

@Composable
fun SpellGameContent(onAnswer: (Boolean) -> Unit) {
    val word = remember { WordData.initialWords.random() }
    val maskedWord = remember { 
        word.english.replace(Regex("."), "_ ").let { 
            it.replaceRange(0, 1, word.english[0].toString()) 
        }
    }
    
    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "补全单词",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )
        
        Text(
            text = maskedWord,
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            letterSpacing = 4.sp
        )
        
        Text(
            text = word.chinese,
            fontSize = 16.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf('a', 'b', 'c', 'd').forEach { letter ->
                FilledTonalButton(onClick = { onAnswer(letter == word.english[1]) }) {
                    Text(letter.toString())
                }
            }
        }
    }
}

@Composable
fun GameCard(text: String, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .aspectRatio(1f)
            .fillMaxWidth(),
        onClick = onClick,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = text,
                fontSize = 16.sp,
                fontWeight = FontWeight.Medium,
                textAlign = TextAlign.Center
            )
        }
    }
}
