package com.nomospace.wordwonderkids.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.nomospace.wordwonderkids.ui.screens.home.HomeScreen
import com.nomospace.wordwonderkids.ui.screens.learn.LearnScreen
import com.nomospace.wordwonderkids.ui.screens.game.GameScreen
import com.nomospace.wordwonderkids.ui.screens.progress.ProgressScreen
import com.nomospace.wordwonderkids.ui.screens.settings.SettingsScreen

/**
 * 屏幕路由
 */
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Learn : Screen("learn")
    object LearnCategory : Screen("learn/{category}") {
        fun createRoute(category: String) = "learn/$category"
    }
    object Game : Screen("game")
    object GameMatch : Screen("game/match")
    object GameListen : Screen("game/listen")
    object GameSpell : Screen("game/spell")
    object Progress : Screen("progress")
    object Settings : Screen("settings")
}

/**
 * APP 导航
 */
@Composable
fun AppNavigation(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigateToLearn = { navController.navigate(Screen.Learn.route) },
                onNavigateToGame = { navController.navigate(Screen.Game.route) },
                onNavigateToProgress = { navController.navigate(Screen.Progress.route) },
                onNavigateToSettings = { navController.navigate(Screen.Settings.route) }
            )
        }

        composable(Screen.Learn.route) {
            LearnScreen(
                onNavigateToCategory = { category ->
                    navController.navigate(Screen.LearnCategory.createRoute(category))
                },
                onNavigateBack = { navController.popBackStack() }
            )
        }

        composable("learn/{category}") { backStackEntry ->
            val category = backStackEntry.arguments?.getString("category") ?: ""
            LearnScreen(
                category = category,
                onNavigateBack = { navController.popBackStack() }
            )
        }

        composable(Screen.Game.route) {
            GameScreen(
                onNavigateToGameType = { gameType ->
                    when (gameType) {
                        "match" -> navController.navigate(Screen.GameMatch.route)
                        "listen" -> navController.navigate(Screen.GameListen.route)
                        "spell" -> navController.navigate(Screen.GameSpell.route)
                    }
                },
                onNavigateBack = { navController.popBackStack() }
            )
        }

        composable(Screen.GameMatch.route) {
            GameScreen(gameType = "match", onNavigateBack = { navController.popBackStack() })
        }

        composable(Screen.GameListen.route) {
            GameScreen(gameType = "listen", onNavigateBack = { navController.popBackStack() })
        }

        composable(Screen.GameSpell.route) {
            GameScreen(gameType = "spell", onNavigateBack = { navController.popBackStack() })
        }

        composable(Screen.Progress.route) {
            ProgressScreen(onNavigateBack = { navController.popBackStack() })
        }

        composable(Screen.Settings.route) {
            SettingsScreen(onNavigateBack = { navController.popBackStack() })
        }
    }
}
