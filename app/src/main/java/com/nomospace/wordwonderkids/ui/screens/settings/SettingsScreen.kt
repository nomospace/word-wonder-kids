package com.nomospace.wordwonderkids.ui.screens.settings

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * 设置界面
 * 家长控制、学习提醒、关于等
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    onNavigateBack: () -> Unit = {}
) {
    var dailyLimit by remember { mutableStateOf(30) }
    var sessionLimit by remember { mutableStateOf(10) }
    var soundEnabled by remember { mutableStateOf(true) }
    var musicEnabled by remember { mutableStateOf(false) }
    var notificationsEnabled by remember { mutableStateOf(true) }
    var parentGateEnabled by remember { mutableStateOf(true) }
    var showParentGate by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("设置") },
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
                .padding(paddingValues),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // 家长控制
            item {
                SettingsHeader("家长控制")
            }

            item {
                SettingsSliderItem(
                    title = "每日学习时长",
                    subtitle = "每天最多学习 $dailyLimit 分钟",
                    value = dailyLimit.toFloat(),
                    valueRange = 10f..60f,
                    steps = 4,
                    onValueChange = { dailyLimit = it.toInt() }
                )
            }

            item {
                SettingsSliderItem(
                    title = "单次学习时长",
                    subtitle = "每次学习 $sessionLimit 分钟后提醒休息",
                    value = sessionLimit.toFloat(),
                    valueRange = 5f..30f,
                    steps = 4,
                    onValueChange = { sessionLimit = it.toInt() }
                )
            }

            item {
                SettingsSwitchItem(
                    title = "家长验证",
                    subtitle = "敏感操作需要家长验证",
                    checked = parentGateEnabled,
                    onCheckedChange = { 
                        if (!it || verifyParentGate()) {
                            parentGateEnabled = it
                        }
                    }
                )
            }

            item {
                SettingsHeader("音效设置")
            }

            item {
                SettingsSwitchItem(
                    title = "音效",
                    subtitle = "游戏和学习音效",
                    checked = soundEnabled,
                    icon = Icons.Default.VolumeUp,
                    onCheckedChange = { soundEnabled = it }
                )
            }

            item {
                SettingsSwitchItem(
                    title = "背景音乐",
                    subtitle = "学习时播放轻音乐",
                    checked = musicEnabled,
                    icon = Icons.Default.MusicNote,
                    onCheckedChange = { musicEnabled = it }
                )
            }

            item {
                SettingsHeader("其他")
            }

            item {
                SettingsSwitchItem(
                    title = "学习提醒",
                    subtitle = "每天定时提醒学习",
                    checked = notificationsEnabled,
                    icon = Icons.Default.Notifications,
                    onCheckedChange = { notificationsEnabled = it }
                )
            }

            item {
                SettingsClickableItem(
                    title = "关于我们",
                    subtitle = "版本 1.0.0",
                    icon = Icons.Default.Info
                )
            }

            item {
                SettingsClickableItem(
                    title = "帮助中心",
                    icon = Icons.Default.Help
                )
            }

            item {
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }

    // 家长验证对话框
    if (showParentGate) {
        ParentGateDialog(
            onDismiss = { showParentGate = false },
            onVerified = { showParentGate = false }
        )
    }
}

@Composable
fun SettingsHeader(title: String) {
    Text(
        text = title,
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 12.dp),
        fontSize = 14.sp,
        fontWeight = FontWeight.SemiBold,
        color = MaterialTheme.colorScheme.primary
    )
}

@Composable
fun SettingsSwitchItem(
    title: String,
    subtitle: String? = null,
    checked: Boolean,
    icon: androidx.compose.ui.graphics.vector.ImageVector? = null,
    onCheckedChange: (Boolean) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                modifier = Modifier.weight(1f),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                if (icon != null) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                Column {
                    Text(
                        text = title,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Medium
                    )
                    if (subtitle != null) {
                        Text(
                            text = subtitle,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
            Switch(
                checked = checked,
                onCheckedChange = onCheckedChange
            )
        }
    }
}

@Composable
fun SettingsSliderItem(
    title: String,
    subtitle: String,
    value: Float,
    valueRange: ClosedFloatingPointRange<Float>,
    steps: Int,
    onValueChange: (Float) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(
                text = title,
                fontSize = 16.sp,
                fontWeight = FontWeight.Medium
            )
            Slider(
                value = value,
                onValueChange = onValueChange,
                valueRange = valueRange,
                steps = steps
            )
            Text(
                text = subtitle,
                fontSize = 12.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun SettingsClickableItem(
    title: String,
    subtitle: String? = null,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        onClick = { },
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                modifier = Modifier.weight(1f),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Column {
                    Text(
                        text = title,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Medium
                    )
                    if (subtitle != null) {
                        Text(
                            text = subtitle,
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "进入",
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

@Composable
fun ParentGateDialog(
    onDismiss: () -> Unit,
    onVerified: () -> Unit
) {
    var answer by remember { mutableStateOf("") }
    val num1 = remember { (10..20).random() }
    val num2 = remember { (5..15).random() }
    val correctAnswer = remember { num1 + num2 }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("家长验证") },
        text = {
            Column(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text("请回答：$num1 + $num2 = ?")
                OutlinedTextField(
                    value = answer,
                    onValueChange = { answer = it },
                    label = { Text("答案") },
                    singleLine = true
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (answer.toIntOrNull() == correctAnswer) {
                        onVerified()
                    }
                }
            ) {
                Text("验证")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("取消")
            }
        }
    )
}

fun verifyParentGate(): Boolean {
    // In real app, this would show a dialog and return result
    return true
}
