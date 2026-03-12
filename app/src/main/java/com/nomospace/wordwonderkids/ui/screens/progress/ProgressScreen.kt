package com.nomospace.wordwonderkids.ui.screens.progress

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 学习进度界面
 * 展示学习统计、掌握情况、薄弱单词
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProgressScreen(
    onNavigateBack: () -> Unit = {}
) {
    var wordsLearned by remember { mutableStateOf(23) }
    var accuracy by remember { mutableStateOf(85f) }
    var totalMinutes by remember { mutableStateOf(120) }
    var streak by remember { mutableStateOf(5) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("学习进度") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // 总体统计
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    ProgressStatCard(
                        modifier = Modifier.weight(1f),
                        icon = Icons.Default.CheckCircle,
                        value = "$wordsLearned",
                        label = "已学单词",
                        color = Color(0xFF4ECDC4)
                    )
                    ProgressStatCard(
                        modifier = Modifier.weight(1f),
                        icon = Icons.Default.PieChart,
                        value = "${accuracy.toInt()}%",
                        label = "正确率",
                        color = Color(0xFFFFE66D)
                    )
                }
            }

            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    ProgressStatCard(
                        modifier = Modifier.weight(1f),
                        icon = Icons.Default.AccessTime,
                        value = "$totalMinutes 分钟",
                        label = "学习时长",
                        color = Color(0xFFFF6B6B)
                    )
                    ProgressStatCard(
                        modifier = Modifier.weight(1f),
                        icon = Icons.Default.LocalFireDepartment,
                        value = "$streak 天",
                        label = "连续学习",
                        color = Color(0xFFFD79A8)
                    )
                }
            }

            // 准确率环形图
            item {
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Text(
                            text = "学习准确率",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceEvenly
                        ) {
                            CircularProgress(percentage = accuracy / 100f)
                            Column(
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                StatRow(label = "正确", value = "156", color = Color(0xFF00B894))
                                StatRow(label = "错误", value = "28", color = Color(0xFFFF7675))
                                StatRow(label = "总计", value = "184", color = MaterialTheme.colorScheme.onSurface)
                            }
                        }
                    }
                }
            }

            // 分类进度
            item {
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = "分类掌握",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        CategoryProgressRow("颜色", 8, 6)
                        CategoryProgressRow("动物", 9, 7)
                        CategoryProgressRow("文具", 7, 5)
                        CategoryProgressRow("数字", 10, 8)
                        CategoryProgressRow("日常", 8, 4)
                    }
                }
            }

            // 薄弱单词
            item {
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = "薄弱单词",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "这些单词需要多复习哦～",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        WeakWordRow("elephant", "大象")
                        WeakWordRow("notebook", "笔记本")
                        WeakWordRow("window", "窗户")
                    }
                }
            }
        }
    }
}

@Composable
fun ProgressStatCard(
    modifier: Modifier = Modifier,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    value: String,
    label: String,
    color: Color
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = color.copy(alpha = 0.1f))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(32.dp)
            )
            Column {
                Text(
                    text = value,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = color
                )
                Text(
                    text = label,
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun CircularProgress(percentage: Float) {
    Box(
        modifier = Modifier.size(120.dp),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.size(120.dp)) {
            val radius = size.minDimension / 2
            drawArc(
                color = Color.LightGray,
                startAngle = -90f,
                sweepAngle = 360f,
                useCenter = false,
                style = Stroke(width = 12.dp.toPx())
            )
            drawArc(
                color = Color(0xFF00B894),
                startAngle = -90f,
                sweepAngle = 360f * percentage,
                useCenter = false,
                style = Stroke(width = 12.dp.toPx())
            )
        }
        Text(
            text = "${(percentage * 100).toInt()}%",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun StatRow(label: String, value: String, color: Color) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Box(
            modifier = Modifier.size(12.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.size(12.dp)) {
                drawCircle(color = color)
            }
        }
        Text(text = label, fontSize = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(text = value, fontSize = 14.sp, fontWeight = FontWeight.Medium, color = color)
    }
}

@Composable
fun CategoryProgressRow(category: String, total: Int, learned: Int) {
    Column(
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = category, fontSize = 14.sp)
            Text(
                text = "$learned / $total",
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        LinearProgressIndicator(
            progress = learned.toFloat() / total,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
fun WeakWordRow(english: String, chinese: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Text(text = english, fontSize = 16.sp, fontWeight = FontWeight.Medium)
            Text(
                text = chinese,
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
        IconButton(onClick = { /* Review */ }) {
            Icon(Icons.Default.Refresh, contentDescription = "复习")
        }
    }
}
