package com.nomospace.wordwonderkids.ui.screens.learn

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nomospace.wordwonderkids.data.local.WordData
import com.nomospace.wordwonderkids.data.model.Word

/**
 * 学习界面
 * 支持按分类学习单词卡片
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun LearnScreen(
    category: String? = null,
    onNavigateToCategory: (String) -> Unit = {},
    onNavigateBack: () -> Unit = {}
) {
    val categories = remember { WordData.getAllCategories() }
    val words = remember(category) {
        if (category != null) WordData.getWordsByCategory(category)
        else WordData.initialWords
    }
    
    val pagerState = rememberPagerState(pageCount = { words.size })
    var isPlaying by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(category ?: "学单词") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { paddingValues ->
        if (category == null) {
            // 分类选择界面
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(categories) { cat ->
                    CategoryItem(
                        category = cat,
                        wordCount = WordData.getWordsByCategory(cat).size,
                        onClick = { onNavigateToCategory(cat) }
                    )
                }
            }
        } else {
            // 单词卡片学习界面
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues)
            ) {
                // 进度指示器
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.Center
                ) {
                    repeat(words.size) { index ->
                        Box(
                            modifier = Modifier
                                .size(if (index == pagerState.currentPage) 12.dp else 8.dp)
                                .padding(4.dp)
                                .clip(CircleShape)
                                .background(
                                    if (index == pagerState.currentPage)
                                        MaterialTheme.colorScheme.primary
                                    else
                                        MaterialTheme.colorScheme.surfaceVariant
                                )
                        )
                    }
                }

                // 单词卡片
                HorizontalPager(
                    state = pagerState,
                    modifier = Modifier.weight(1f)
                ) { page ->
                    WordCard(
                        word = words[page],
                        isPlaying = isPlaying,
                        onPlayClick = { isPlaying = !isPlaying }
                    )
                }

                // 控制按钮
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceEvenly
                ) {
                    FilledTonalIconButton(
                        onClick = {
                            if (pagerState.currentPage > 0) {
                                isPlaying = false
                            }
                        },
                        enabled = pagerState.currentPage > 0
                    ) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "上一个")
                    }

                    FilledIconButton(
                        onClick = { /* 跟读 */ },
                        modifier = Modifier.size(56.dp)
                    ) {
                        Icon(Icons.Default.Mic, contentDescription = "跟读")
                    }

                    FilledTonalIconButton(
                        onClick = {
                            if (pagerState.currentPage < words.size - 1) {
                                isPlaying = false
                            }
                        },
                        enabled = pagerState.currentPage < words.size - 1
                    ) {
                        Icon(Icons.Default.ArrowForward, contentDescription = "下一个")
                    }
                }

                // 完成按钮
                Button(
                    onClick = onNavigateBack,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp)
                        .padding(bottom = 16.dp)
                ) {
                    Text("完成学习")
                }
            }
        }
    }
}

@Composable
fun CategoryItem(
    category: String,
    wordCount: Int,
    onClick: () -> Unit
) {
    val categoryDisplay = category.replaceFirstChar { it.uppercase() }
    val emoji = when (category) {
        "colors" -> "🎨"
        "animals" -> "🦁"
        "school" -> "✏️"
        "numbers" -> "🔢"
        "daily" -> "🏠"
        else -> "📚"
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = onClick
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = emoji,
                    fontSize = 32.sp
                )
                Column {
                    Text(
                        text = categoryDisplay,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text(
                        text = "$wordCount 个单词",
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "进入"
            )
        }
    }
}

@Composable
fun WordCard(
    word: Word,
    isPlaying: Boolean,
    onPlayClick: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // 图片占位
        Box(
            modifier = Modifier
                .size(200.dp)
                .clip(MaterialTheme.shapes.large)
                .background(MaterialTheme.colorScheme.surfaceVariant),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "🖼️",
                fontSize = 64.sp
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // 英文单词
        Text(
            text = word.english,
            fontSize = 36.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(8.dp))

        // 中文释义
        Text(
            text = word.chinese,
            fontSize = 20.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(24.dp))

        // 发音按钮
        FilledIconButton(
            onClick = onPlayClick,
            modifier = Modifier.size(56.dp)
        ) {
            Icon(
                imageVector = if (isPlaying) Icons.Default.VolumeUp else Icons.Default.VolumeOff,
                contentDescription = "发音"
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // 例句
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = word.example,
                    fontSize = 16.sp,
                    fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
                )
                Text(
                    text = word.exampleChinese,
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
