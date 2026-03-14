/**
 * 勋章数据库
 */
import { Badge, BadgeCategory } from '../models/kiddo.model';

export const BADGE_DATABASE: Badge[] = [
  // ========== 学习类勋章 ==========
  {
    id: 'first_word',
    name: '初学乍练',
    description: '学会第一个单词',
    icon: '🌟',
    category: 'learning' as BadgeCategory,
    requirement: '学习1个单词',
    rarity: 'common'
  },
  {
    id: 'word_10',
    name: '小有所成',
    description: '学会10个单词',
    icon: '📚',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习10个单词',
    rarity: 'common'
  },
  {
    id: 'word_50',
    name: '词汇新星',
    description: '学会50个单词',
    icon: '📖',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习50个单词',
    rarity: 'rare'
  },
  {
    id: 'word_100',
    name: '词汇达人',
    description: '学会100个单词',
    icon: '🏆',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习100个单词',
    rarity: 'rare'
  },
  {
    id: 'word_200',
    name: '词汇大师',
    description: '学会200个单词',
    icon: '👑',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习200个单词',
    rarity: 'epic'
  },
  {
    id: 'first_sentence',
    name: '开口说',
    description: '学会第一个句型',
    icon: '💬',
    category: 'learning' as BadgeCategory,
    requirement: '学习1个句型',
    rarity: 'common'
  },
  {
    id: 'sentence_10',
    name: '句型入门',
    description: '学会10个句型',
    icon: '📝',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习10个句型',
    rarity: 'common'
  },
  {
    id: 'sentence_20',
    name: '句型达人',
    description: '学会20个句型',
    icon: '🎯',
    category: 'learning' as BadgeCategory,
    requirement: '累计学习20个句型',
    rarity: 'rare'
  },
  
  // ========== 坚持类勋章 ==========
  {
    id: 'streak_3',
    name: '三天坚持',
    description: '连续学习3天',
    icon: '🔥',
    category: 'streak' as BadgeCategory,
    requirement: '连续打卡3天',
    rarity: 'common'
  },
  {
    id: 'streak_7',
    name: '一周达人',
    description: '连续学习7天',
    icon: '💪',
    category: 'streak' as BadgeCategory,
    requirement: '连续打卡7天',
    rarity: 'common'
  },
  {
    id: 'streak_14',
    name: '两周坚持',
    description: '连续学习14天',
    icon: '🌈',
    category: 'streak' as BadgeCategory,
    requirement: '连续打卡14天',
    rarity: 'rare'
  },
  {
    id: 'streak_30',
    name: '坚持小达人',
    description: '连续学习30天',
    icon: '🎖️',
    category: 'streak' as BadgeCategory,
    requirement: '连续打卡30天',
    rarity: 'epic'
  },
  {
    id: 'streak_100',
    name: '百日学霸',
    description: '连续学习100天',
    icon: '🏅',
    category: 'streak' as BadgeCategory,
    requirement: '连续打卡100天',
    rarity: 'legendary'
  },
  
  // ========== 掌握类勋章 ==========
  {
    id: 'perfect_5',
    name: '小试牛刀',
    description: '连续答对5题',
    icon: '✨',
    category: 'mastery' as BadgeCategory,
    requirement: '一次学习中连续答对5题',
    rarity: 'common'
  },
  {
    id: 'perfect_10',
    name: '势如破竹',
    description: '连续答对10题',
    icon: '⚡',
    category: 'mastery' as BadgeCategory,
    requirement: '一次学习中连续答对10题',
    rarity: 'rare'
  },
  {
    id: 'perfect_20',
    name: '满分达人',
    description: '连续答对20题',
    icon: '💎',
    category: 'mastery' as BadgeCategory,
    requirement: '一次学习中连续答对20题',
    rarity: 'epic'
  },
  {
    id: 'pronunciation_star',
    name: '发音之星',
    description: '跟读评分全部优秀',
    icon: '🎤',
    category: 'mastery' as BadgeCategory,
    requirement: '一次跟读练习中全部获得优秀',
    rarity: 'rare'
  },
  {
    id: 'speed_learner',
    name: '学习快手',
    description: '快速完成学习任务',
    icon: '🚀',
    category: 'mastery' as BadgeCategory,
    requirement: '5分钟内完成每日任务',
    rarity: 'rare'
  },
  
  // ========== 特殊类勋章 ==========
  {
    id: 'early_bird',
    name: '早起鸟儿',
    description: '早上完成学习',
    icon: '🐦',
    category: 'special' as BadgeCategory,
    requirement: '在早上7点前完成学习',
    rarity: 'rare'
  },
  {
    id: 'night_owl',
    name: '夜猫子',
    description: '晚上完成学习',
    icon: '🦉',
    category: 'special' as BadgeCategory,
    requirement: '在晚上9点后完成学习',
    rarity: 'common'
  },
  {
    id: 'weekend_warrior',
    name: '周末战士',
    description: '周末坚持学习',
    icon: '⚔️',
    category: 'special' as BadgeCategory,
    requirement: '连续4个周末都完成学习',
    rarity: 'rare'
  },
  {
    id: 'dubbing_star',
    name: '配音小明星',
    description: '完成配音作品',
    icon: '🎬',
    category: 'special' as BadgeCategory,
    requirement: '完成3个配音作品',
    rarity: 'epic'
  },
  {
    id: 'singer',
    name: '小歌手',
    description: '学会5首英文歌',
    icon: '🎵',
    category: 'special' as BadgeCategory,
    requirement: '学会5首英文儿歌',
    rarity: 'rare'
  },
  {
    id: 'story_teller',
    name: '故事大王',
    description: '阅读10个英文故事',
    icon: '📖',
    category: 'special' as BadgeCategory,
    requirement: '阅读10个英文故事',
    rarity: 'rare'
  },
  {
    id: 'helper',
    name: '小助手',
    description: '帮助同学学习',
    icon: '🤝',
    category: 'special' as BadgeCategory,
    requirement: '分享学习成果5次',
    rarity: 'epic'
  },
  {
    id: 'all_badges',
    name: '大满贯',
    description: '收集所有勋章',
    icon: '🏆',
    category: 'special' as BadgeCategory,
    requirement: '获得所有其他勋章',
    rarity: 'legendary'
  }
];

/**
 * 获取指定分类的勋章
 */
export function getBadgesByCategory(category: BadgeCategory): Badge[] {
  return BADGE_DATABASE.filter(b => b.category === category);
}

/**
 * 获取指定稀有度的勋章
 */
export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return BADGE_DATABASE.filter(b => b.rarity === rarity);
}