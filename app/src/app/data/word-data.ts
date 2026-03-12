import { Word, WordSource, WordCategory, GradeLevel } from '../models/word.model';

/**
 * 年级配置
 * 支持从一年级到六年级，以及学前班
 */
export const GRADE_LEVELS: GradeLevel[] = [
  { id: 'pre-k', name: 'Pre-K', displayName: '学前班', wordCount: 100, difficultyRange: [1, 1] },
  { id: 'k', name: 'Kindergarten', displayName: '幼儿园', wordCount: 150, difficultyRange: [1, 2] },
  { id: 'g1', name: 'Grade 1', displayName: '一年级', wordCount: 200, difficultyRange: [1, 2] },
  { id: 'g2', name: 'Grade 2', displayName: '二年级', wordCount: 250, difficultyRange: [1, 2] },
  { id: 'g3', name: 'Grade 3', displayName: '三年级', wordCount: 300, difficultyRange: [2, 3] },
  { id: 'g4', name: 'Grade 4', displayName: '四年级', wordCount: 350, difficultyRange: [2, 3] },
  { id: 'g5', name: 'Grade 5', displayName: '五年级', wordCount: 400, difficultyRange: [2, 3] },
  { id: 'g6', name: 'Grade 6', displayName: '六年级', wordCount: 450, difficultyRange: [3, 3] }
];

/**
 * 单词分类配置
 */
export const WORD_CATEGORIES: WordCategory[] = [
  { id: 'colors', name: 'Colors', displayName: '颜色', color: '#EF4444', icon: '🎨' },
  { id: 'animals', name: 'Animals', displayName: '动物', color: '#3B82F6', icon: '🦁' },
  { id: 'school', name: 'School', displayName: '文具', color: '#F97316', icon: '📚' },
  { id: 'numbers', name: 'Numbers', displayName: '数字', color: '#22C55E', icon: '🔢' },
  { id: 'daily', name: 'Daily', displayName: '日常用品', color: '#A855F7', icon: '🏠' },
  { id: 'food', name: 'Food', displayName: '食物', color: '#EC4899', icon: '🍎' },
  { id: 'family', name: 'Family', displayName: '家庭', color: '#14B8A6', icon: '👨‍👩‍👧' },
  { id: 'nature', name: 'Nature', displayName: '自然', color: '#84CC16', icon: '🌳' },
  { id: 'actions', name: 'Actions', displayName: '动作', color: '#F59E0B', icon: '🏃' },
  { id: 'emotions', name: 'Emotions', displayName: '情感', color: '#6366F1', icon: '😊' }
];

/**
 * 核心单词库 - 基于 Dolch Sight Words、Oxford 3000 和 Fry Words
 * Dolch Sight Words: 最常见的 220 个英语单词
 * Oxford 3000: 牛津核心 3000 词
 * Fry Words: 弗里 1000 词
 */
export const WORD_DATABASE: Word[] = [
  // ========== Dolch Sight Words (Pre-K) ==========
  { id: 1, english: 'a', chinese: '一个', category: 'daily', example: 'I have a book.', exampleChinese: '我有一本书。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 2, english: 'and', chinese: '和', category: 'daily', example: 'You and I are friends.', exampleChinese: '你和我是朋友。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 3, english: 'big', chinese: '大的', category: 'daily', example: 'The elephant is big.', exampleChinese: '大象很大。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 4, english: 'cat', chinese: '猫', category: 'animals', example: 'The cat is cute.', exampleChinese: '猫很可爱。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 5, english: 'dog', chinese: '狗', category: 'animals', example: 'The dog is friendly.', exampleChinese: '这只狗很友好。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 6, english: 'red', chinese: '红色', category: 'colors', example: 'The apple is red.', exampleChinese: '苹果是红色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 7, english: 'blue', chinese: '蓝色', category: 'colors', example: 'The sky is blue.', exampleChinese: '天空是蓝色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 8, english: 'green', chinese: '绿色', category: 'colors', example: 'The grass is green.', exampleChinese: '草是绿色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 9, english: 'yellow', chinese: '黄色', category: 'colors', example: 'The banana is yellow.', exampleChinese: '香蕉是黄色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 10, english: 'one', chinese: '一', category: 'numbers', example: 'I have one apple.', exampleChinese: '我有一个苹果。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 11, english: 'two', chinese: '二', category: 'numbers', example: 'I have two eyes.', exampleChinese: '我有两只眼睛。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 12, english: 'three', chinese: '三', category: 'numbers', example: 'I have three books.', exampleChinese: '我有三本书。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  
  // ========== Dolch Sight Words (K-1) ==========
  { id: 13, english: 'all', chinese: '全部', category: 'daily', example: 'All the children are happy.', exampleChinese: '所有的孩子都很开心。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 14, english: 'am', chinese: '是', category: 'daily', example: 'I am a student.', exampleChinese: '我是一个学生。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 15, english: 'are', chinese: '是', category: 'daily', example: 'We are friends.', exampleChinese: '我们是朋友。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 16, english: 'at', chinese: '在', category: 'daily', example: 'Look at the bird.', exampleChinese: '看那只鸟。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 17, english: 'be', chinese: '是', category: 'daily', example: 'Be careful!', exampleChinese: '小心！', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 18, english: 'by', chinese: '通过', category: 'daily', example: 'Come by bus.', exampleChinese: '乘公共汽车来。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 19, english: 'can', chinese: '能', category: 'actions', example: 'I can swim.', exampleChinese: '我会游泳。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 20, english: 'come', chinese: '来', category: 'actions', example: 'Come here, please.', exampleChinese: '请来这里。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 21, english: 'do', chinese: '做', category: 'actions', example: 'Do your homework.', exampleChinese: '做你的作业。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 22, english: 'down', chinese: '向下', category: 'actions', example: 'Sit down, please.', exampleChinese: '请坐下。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 23, english: 'find', chinese: '找到', category: 'actions', example: 'Can you find it?', exampleChinese: '你能找到它吗？', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 24, english: 'for', chinese: '为了', category: 'daily', example: 'This is for you.', exampleChinese: '这是给你的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 25, english: 'from', chinese: '从', category: 'daily', example: 'I am from China.', exampleChinese: '我来自中国。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 26, english: 'get', chinese: '得到', category: 'actions', example: 'Get your bag.', exampleChinese: '拿你的书包。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 27, english: 'go', chinese: '去', category: 'actions', example: 'Let\'s go home.', exampleChinese: '我们回家吧。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 28, english: 'has', chinese: '有', category: 'daily', example: 'She has a doll.', exampleChinese: '她有一个洋娃娃。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 29, english: 'have', chinese: '有', category: 'daily', example: 'I have a pen.', exampleChinese: '我有一支钢笔。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 30, english: 'he', chinese: '他', category: 'family', example: 'He is my brother.', exampleChinese: '他是我的哥哥。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 31, english: 'her', chinese: '她的', category: 'family', example: 'This is her book.', exampleChinese: '这是她的书。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 32, english: 'him', chinese: '他', category: 'family', example: 'Give it to him.', exampleChinese: '把它给他。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 33, english: 'his', chinese: '他的', category: 'family', example: 'This is his toy.', exampleChinese: '这是他的玩具。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 34, english: 'I', chinese: '我', category: 'family', example: 'I like apples.', exampleChinese: '我喜欢苹果。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 35, english: 'in', chinese: '在...里面', category: 'daily', example: 'The book is in the bag.', exampleChinese: '书在书包里。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 36, english: 'is', chinese: '是', category: 'daily', example: 'It is a cat.', exampleChinese: '它是一只猫。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 37, english: 'it', chinese: '它', category: 'daily', example: 'It is cute.', exampleChinese: '它很可爱。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 38, english: 'like', chinese: '喜欢', category: 'emotions', example: 'I like ice cream.', exampleChinese: '我喜欢冰淇淋。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 39, english: 'little', chinese: '小的', category: 'daily', example: 'The bird is little.', exampleChinese: '这只鸟很小。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 40, english: 'look', chinese: '看', category: 'actions', example: 'Look at me.', exampleChinese: '看着我。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 41, english: 'make', chinese: '制作', category: 'actions', example: 'Let\'s make a cake.', exampleChinese: '我们做个蛋糕吧。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 42, english: 'me', chinese: '我', category: 'family', example: 'Give it to me.', exampleChinese: '把它给我。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 43, english: 'my', chinese: '我的', category: 'family', example: 'This is my book.', exampleChinese: '这是我的书。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 44, english: 'no', chinese: '不', category: 'daily', example: 'No, thank you.', exampleChinese: '不，谢谢。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 45, english: 'not', chinese: '不', category: 'daily', example: 'I am not hungry.', exampleChinese: '我不饿。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 46, english: 'on', chinese: '在...上面', category: 'daily', example: 'The book is on the table.', exampleChinese: '书在桌子上。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 47, english: 'one', chinese: '一', category: 'numbers', example: 'One plus one is two.', exampleChinese: '一加一等于二。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 48, english: 'or', chinese: '或者', category: 'daily', example: 'Tea or coffee?', exampleChinese: '茶还是咖啡？', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 49, english: 'our', chinese: '我们的', category: 'family', example: 'This is our home.', exampleChinese: '这是我们的家。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 50, english: 'out', chinese: '外面', category: 'daily', example: 'Let\'s go out.', exampleChinese: '我们出去吧。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  
  // ========== Animals (Oxford 3000) ==========
  { id: 51, english: 'bird', chinese: '鸟', category: 'animals', example: 'The bird can fly.', exampleChinese: '鸟会飞。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 52, english: 'fish', chinese: '鱼', category: 'animals', example: 'The fish swims in water.', exampleChinese: '鱼在水里游。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 53, english: 'rabbit', chinese: '兔子', category: 'animals', example: 'The rabbit has long ears.', exampleChinese: '兔子有长耳朵。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 54, english: 'panda', chinese: '熊猫', category: 'animals', example: 'The panda is cute.', exampleChinese: '熊猫很可爱。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 55, english: 'elephant', chinese: '大象', category: 'animals', example: 'The elephant is big.', exampleChinese: '大象很大。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 56, english: 'monkey', chinese: '猴子', category: 'animals', example: 'The monkey likes bananas.', exampleChinese: '猴子喜欢香蕉。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 57, english: 'tiger', chinese: '老虎', category: 'animals', example: 'The tiger is strong.', exampleChinese: '老虎很强壮。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 58, english: 'lion', chinese: '狮子', category: 'animals', example: 'The lion is the king of animals.', exampleChinese: '狮子是动物之王。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 59, english: 'bear', chinese: '熊', category: 'animals', example: 'The bear lives in the forest.', exampleChinese: '熊住在森林里。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 60, english: 'zebra', chinese: '斑马', category: 'animals', example: 'The zebra has black and white stripes.', exampleChinese: '斑马有黑白条纹。', difficulty: 2, source: WordSource.OXFORD_3000 },
  
  // ========== School Supplies ==========
  { id: 61, english: 'pen', chinese: '钢笔', category: 'school', example: 'I write with a pen.', exampleChinese: '我用钢笔写字。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 62, english: 'pencil', chinese: '铅笔', category: 'school', example: 'I draw with a pencil.', exampleChinese: '我用铅笔画画。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 63, english: 'ruler', chinese: '尺子', category: 'school', example: 'Use a ruler to draw lines.', exampleChinese: '用尺子画线。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 64, english: 'book', chinese: '书', category: 'school', example: 'I read a book.', exampleChinese: '我读书。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 65, english: 'bag', chinese: '书包', category: 'school', example: 'Put your books in the bag.', exampleChinese: '把书放进书包。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 66, english: 'eraser', chinese: '橡皮', category: 'school', example: 'Use an eraser to clean mistakes.', exampleChinese: '用橡皮擦掉错误。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 67, english: 'notebook', chinese: '笔记本', category: 'school', example: 'Write in your notebook.', exampleChinese: '在笔记本上写字。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 68, english: 'desk', chinese: '书桌', category: 'school', example: 'My desk is clean.', exampleChinese: '我的书桌很干净。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 69, english: 'chair', chinese: '椅子', category: 'school', example: 'Sit on the chair.', exampleChinese: '坐在椅子上。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 70, english: 'teacher', chinese: '老师', category: 'school', example: 'The teacher is kind.', exampleChinese: '老师很和蔼。', difficulty: 1, source: WordSource.OXFORD_3000 },
  
  // ========== Numbers (Fry Words) ==========
  { id: 71, english: 'four', chinese: '四', category: 'numbers', example: 'A table has four legs.', exampleChinese: '桌子有四条腿。', difficulty: 1, source: WordSource.FRY_WORDS },
  { id: 72, english: 'five', chinese: '五', category: 'numbers', example: 'I have five fingers.', exampleChinese: '我有五根手指。', difficulty: 1, source: WordSource.FRY_WORDS },
  { id: 73, english: 'six', chinese: '六', category: 'numbers', example: 'Six is after five.', exampleChinese: '六在五后面。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 74, english: 'seven', chinese: '七', category: 'numbers', example: 'Seven days in a week.', exampleChinese: '一周有七天。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 75, english: 'eight', chinese: '八', category: 'numbers', example: 'Eight is a lucky number.', exampleChinese: '八是幸运数字。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 76, english: 'nine', chinese: '九', category: 'numbers', example: 'Nine is after eight.', exampleChinese: '九在八后面。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 77, english: 'ten', chinese: '十', category: 'numbers', example: 'I have ten toes.', exampleChinese: '我有十个脚趾。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 78, english: 'eleven', chinese: '十一', category: 'numbers', example: 'Eleven is after ten.', exampleChinese: '十一在十后面。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 79, english: 'twelve', chinese: '十二', category: 'numbers', example: 'There are twelve months in a year.', exampleChinese: '一年有十二个月。', difficulty: 2, source: WordSource.FRY_WORDS },
  { id: 80, english: 'twenty', chinese: '二十', category: 'numbers', example: 'Twenty is double ten.', exampleChinese: '二十是十的两倍。', difficulty: 2, source: WordSource.FRY_WORDS },
  
  // ========== Daily Objects ==========
  { id: 81, english: 'cup', chinese: '杯子', category: 'daily', example: 'Drink water from a cup.', exampleChinese: '用杯子喝水。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 82, english: 'bed', chinese: '床', category: 'daily', example: 'I sleep in my bed.', exampleChinese: '我在床上睡觉。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 83, english: 'door', chinese: '门', category: 'daily', example: 'Open the door, please.', exampleChinese: '请开门。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 84, english: 'window', chinese: '窗户', category: 'daily', example: 'Look out of the window.', exampleChinese: '向窗外看。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 85, english: 'table', chinese: '桌子', category: 'daily', example: 'Put the book on the table.', exampleChinese: '把书放在桌子上。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 86, english: 'light', chinese: '灯', category: 'daily', example: 'Turn on the light.', exampleChinese: '开灯。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 87, english: 'clock', chinese: '钟', category: 'daily', example: 'Look at the clock.', exampleChinese: '看钟。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 88, english: 'phone', chinese: '电话', category: 'daily', example: 'Answer the phone.', exampleChinese: '接电话。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 89, english: 'computer', chinese: '电脑', category: 'daily', example: 'I use a computer.', exampleChinese: '我用电脑。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 90, english: 'television', chinese: '电视', category: 'daily', example: 'Watch television.', exampleChinese: '看电视。', difficulty: 2, source: WordSource.OXFORD_3000 },
  
  // ========== Food ==========
  { id: 91, english: 'apple', chinese: '苹果', category: 'food', example: 'An apple a day keeps the doctor away.', exampleChinese: '一天一苹果，医生远离我。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 92, english: 'banana', chinese: '香蕉', category: 'food', example: 'Monkeys like bananas.', exampleChinese: '猴子喜欢香蕉。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 93, english: 'orange', chinese: '橙子', category: 'food', example: 'Oranges are rich in vitamin C.', exampleChinese: '橙子富含维生素 C。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 94, english: 'bread', chinese: '面包', category: 'food', example: 'I eat bread for breakfast.', exampleChinese: '我早餐吃面包。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 95, english: 'milk', chinese: '牛奶', category: 'food', example: 'Drink milk every day.', exampleChinese: '每天喝牛奶。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 96, english: 'water', chinese: '水', category: 'food', example: 'Drink more water.', exampleChinese: '多喝水。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 97, english: 'rice', chinese: '米饭', category: 'food', example: 'We eat rice for dinner.', exampleChinese: '我们晚餐吃米饭。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 98, english: 'egg', chinese: '鸡蛋', category: 'food', example: 'I eat an egg every morning.', exampleChinese: '我每天早上吃一个鸡蛋。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 99, english: 'cheese', chinese: '奶酪', category: 'food', example: 'I like cheese on my bread.', exampleChinese: '我喜欢在面包上放奶酪。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 100, english: 'chicken', chinese: '鸡肉', category: 'food', example: 'Chicken is delicious.', exampleChinese: '鸡肉很好吃。', difficulty: 1, source: WordSource.OXFORD_3000 },
  
  // ========== Family Members ==========
  { id: 101, english: 'mother', chinese: '妈妈', category: 'family', example: 'I love my mother.', exampleChinese: '我爱我的妈妈。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 102, english: 'father', chinese: '爸爸', category: 'family', example: 'My father is tall.', exampleChinese: '我的爸爸很高。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 103, english: 'sister', chinese: '姐妹', category: 'family', example: 'She is my sister.', exampleChinese: '她是我的姐妹。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 104, english: 'brother', chinese: '兄弟', category: 'family', example: 'He is my brother.', exampleChinese: '他是我的兄弟。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 105, english: 'grandma', chinese: '奶奶/外婆', category: 'family', example: 'Grandma tells me stories.', exampleChinese: '奶奶给我讲故事。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 106, english: 'grandpa', chinese: '爷爷/外公', category: 'family', example: 'Grandpa takes me to the park.', exampleChinese: '爷爷带我去公园。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 107, english: 'baby', chinese: '婴儿', category: 'family', example: 'The baby is sleeping.', exampleChinese: '婴儿在睡觉。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 108, english: 'child', chinese: '孩子', category: 'family', example: 'The child is playing.', exampleChinese: '孩子在玩耍。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 109, english: 'friend', chinese: '朋友', category: 'family', example: 'She is my best friend.', exampleChinese: '她是我最好的朋友。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 110, english: 'family', chinese: '家庭', category: 'family', example: 'I love my family.', exampleChinese: '我爱我的家庭。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  
  // ========== Colors (Extended) ==========
  { id: 111, english: 'white', chinese: '白色', category: 'colors', example: 'The snow is white.', exampleChinese: '雪是白色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 112, english: 'black', chinese: '黑色', category: 'colors', example: 'The cat is black.', exampleChinese: '猫是黑色的。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 113, english: 'pink', chinese: '粉色', category: 'colors', example: 'The flower is pink.', exampleChinese: '花是粉色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 114, english: 'purple', chinese: '紫色', category: 'colors', example: 'Grapes are purple.', exampleChinese: '葡萄是紫色的。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 115, english: 'brown', chinese: '棕色', category: 'colors', example: 'The bear is brown.', exampleChinese: '熊是棕色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 116, english: 'gray', chinese: '灰色', category: 'colors', example: 'The elephant is gray.', exampleChinese: '大象是灰色的。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 117, english: 'orange', chinese: '橙色', category: 'colors', example: 'The orange is orange.', exampleChinese: '橙子是橙色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  
  // ========== Actions (Verbs) ==========
  { id: 118, english: 'run', chinese: '跑', category: 'actions', example: 'I can run fast.', exampleChinese: '我能跑得快。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 119, english: 'jump', chinese: '跳', category: 'actions', example: 'The rabbit can jump.', exampleChinese: '兔子会跳。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 120, english: 'walk', chinese: '走', category: 'actions', example: 'Let\'s walk to school.', exampleChinese: '我们走路去学校吧。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 121, english: 'eat', chinese: '吃', category: 'actions', example: 'I eat breakfast at 7.', exampleChinese: '我 7 点吃早餐。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 122, english: 'drink', chinese: '喝', category: 'actions', example: 'Drink some water.', exampleChinese: '喝点水。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 123, english: 'sleep', chinese: '睡觉', category: 'actions', example: 'I sleep at 9 o\'clock.', exampleChinese: '我 9 点睡觉。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 124, english: 'play', chinese: '玩', category: 'actions', example: 'Let\'s play together.', exampleChinese: '我们一起玩吧。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 125, english: 'read', chinese: '读', category: 'actions', example: 'I read books every day.', exampleChinese: '我每天读书。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 126, english: 'write', chinese: '写', category: 'actions', example: 'I write with a pen.', exampleChinese: '我用钢笔写字。', difficulty: 1, source: WordSource.DOLCH_SIGHT },
  { id: 127, english: 'sing', chinese: '唱', category: 'actions', example: 'She likes to sing.', exampleChinese: '她喜欢唱歌。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 128, english: 'dance', chinese: '跳舞', category: 'actions', example: 'They dance beautifully.', exampleChinese: '他们跳舞很美。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 129, english: 'swim', chinese: '游泳', category: 'actions', example: 'Fish can swim.', exampleChinese: '鱼会游泳。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 130, english: 'fly', chinese: '飞', category: 'actions', example: 'Birds can fly.', exampleChinese: '鸟会飞。', difficulty: 1, source: WordSource.OXFORD_3000 },
  
  // ========== Emotions ==========
  { id: 131, english: 'happy', chinese: '开心的', category: 'emotions', example: 'I am happy today.', exampleChinese: '我今天很开心。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 132, english: 'sad', chinese: '伤心的', category: 'emotions', example: 'Don\'t be sad.', exampleChinese: '不要伤心。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 133, english: 'angry', chinese: '生气的', category: 'emotions', example: 'He is angry.', exampleChinese: '他很生气。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 134, english: 'scared', chinese: '害怕的', category: 'emotions', example: 'I am scared of dogs.', exampleChinese: '我害怕狗。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 135, english: 'tired', chinese: '累的', category: 'emotions', example: 'I am tired after running.', exampleChinese: '跑步后我累了。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 136, english: 'excited', chinese: '兴奋的', category: 'emotions', example: 'I am excited about the trip.', exampleChinese: '我对这次旅行感到兴奋。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 137, english: 'surprised', chinese: '惊讶的', category: 'emotions', example: 'She was surprised to see me.', exampleChinese: '她见到我很惊讶。', difficulty: 2, source: WordSource.OXFORD_3000 },
  { id: 138, english: 'proud', chinese: '自豪的', category: 'emotions', example: 'I am proud of you.', exampleChinese: '我为你感到自豪。', difficulty: 2, source: WordSource.OXFORD_3000 },
  
  // ========== Nature ==========
  { id: 139, english: 'sun', chinese: '太阳', category: 'nature', example: 'The sun is hot.', exampleChinese: '太阳很热。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 140, english: 'moon', chinese: '月亮', category: 'nature', example: 'The moon is bright tonight.', exampleChinese: '今晚月亮很亮。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 141, english: 'star', chinese: '星星', category: 'nature', example: 'There are many stars in the sky.', exampleChinese: '天空中有许多星星。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 142, english: 'sky', chinese: '天空', category: 'nature', example: 'The sky is blue.', exampleChinese: '天空是蓝色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 143, english: 'cloud', chinese: '云', category: 'nature', example: 'The cloud is white.', exampleChinese: '云是白色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 144, english: 'rain', chinese: '雨', category: 'nature', example: 'It is raining.', exampleChinese: '正在下雨。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 145, english: 'snow', chinese: '雪', category: 'nature', example: 'I like to play in the snow.', exampleChinese: '我喜欢在雪地里玩。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 146, english: 'wind', chinese: '风', category: 'nature', example: 'The wind is blowing.', exampleChinese: '风在吹。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 147, english: 'tree', chinese: '树', category: 'nature', example: 'The tree is tall.', exampleChinese: '树很高。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 148, english: 'flower', chinese: '花', category: 'nature', example: 'The flower is beautiful.', exampleChinese: '花很漂亮。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 149, english: 'grass', chinese: '草', category: 'nature', example: 'The grass is green.', exampleChinese: '草是绿色的。', difficulty: 1, source: WordSource.OXFORD_3000 },
  { id: 150, english: 'river', chinese: '河', category: 'nature', example: 'The river is long.', exampleChinese: '河很长。', difficulty: 2, source: WordSource.OXFORD_3000 }
];

/**
 * 按年级获取单词
 */
export function getWordsByGrade(gradeId: string): Word[] {
  const grade = GRADE_LEVELS.find(g => g.id === gradeId);
  if (!grade) return WORD_DATABASE.slice(0, 50);
  
  return WORD_DATABASE.filter(word => 
    word.difficulty >= grade.difficultyRange[0] && 
    word.difficulty <= grade.difficultyRange[1]
  );
}

/**
 * 按分类获取单词
 */
export function getWordsByCategory(category: string): Word[] {
  return WORD_DATABASE.filter(word => word.category === category);
}

/**
 * 按来源获取单词
 */
export function getWordsBySource(source: WordSource): Word[] {
  return WORD_DATABASE.filter(word => word.source === source);
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  return [...new Set(WORD_DATABASE.map(word => word.category))];
}

/**
 * 获取指定难度的单词
 */
export function getWordsByDifficulty(difficulty: number): Word[] {
  return WORD_DATABASE.filter(word => word.difficulty === difficulty);
}
