/**
 * 句型数据库 - 同步小学英语教材
 */
import { SentencePattern, SentenceCategory } from '../models/kiddo.model';

export const SENTENCE_DATABASE: SentencePattern[] = [
  // ========== 低段句型 (1-3年级) ==========
  // 问候类
  {
    id: 1,
    pattern: "Hello! / Hi!",
    chinese: "你好！",
    category: 'greetings' as SentenceCategory,
    gradeRange: [1, 3],
    example: "Hello! I'm Tom.",
    exampleChinese: "你好！我是汤姆。",
    scene: "见面打招呼"
  },
  {
    id: 2,
    pattern: "Good morning / afternoon / evening!",
    chinese: "早上好 / 下午好 / 晚上好！",
    category: 'greetings' as SentenceCategory,
    gradeRange: [1, 3],
    example: "Good morning, teacher!",
    exampleChinese: "老师早上好！",
    scene: "一天中不同时段的问候"
  },
  {
    id: 3,
    pattern: "Goodbye! / Bye!",
    chinese: "再见！",
    category: 'greetings' as SentenceCategory,
    gradeRange: [1, 3],
    example: "Goodbye, mum!",
    exampleChinese: "妈妈再见！",
    scene: "告别时"
  },
  
  // 自我介绍类
  {
    id: 4,
    pattern: "I'm... / My name is...",
    chinese: "我是... / 我的名字是...",
    category: 'introduction' as SentenceCategory,
    gradeRange: [1, 3],
    example: "I'm Amy. My name is Amy.",
    exampleChinese: "我是艾米。我的名字是艾米。",
    scene: "介绍自己"
  },
  {
    id: 5,
    pattern: "I'm from...",
    chinese: "我来自...",
    category: 'introduction' as SentenceCategory,
    gradeRange: [2, 3],
    example: "I'm from China.",
    exampleChinese: "我来自中国。",
    scene: "介绍家乡/国家"
  },
  {
    id: 6,
    pattern: "This is...",
    chinese: "这是...",
    category: 'introduction' as SentenceCategory,
    gradeRange: [1, 3],
    example: "This is my friend, Tom.",
    exampleChinese: "这是我的朋友，汤姆。",
    scene: "介绍他人/物品"
  },
  
  // 日常用语
  {
    id: 7,
    pattern: "Nice to meet you!",
    chinese: "很高兴认识你！",
    category: 'daily' as SentenceCategory,
    gradeRange: [1, 3],
    example: "Nice to meet you, too!",
    exampleChinese: "我也很高兴认识你！",
    scene: "初次见面"
  },
  {
    id: 8,
    pattern: "How are you? / I'm fine, thank you.",
    chinese: "你好吗？/ 我很好，谢谢。",
    category: 'daily' as SentenceCategory,
    gradeRange: [1, 3],
    example: "—How are you? —I'm fine, thank you.",
    exampleChinese: "—你好吗？—我很好，谢谢。",
    scene: "询问近况"
  },
  {
    id: 9,
    pattern: "Thank you! / You're welcome!",
    chinese: "谢谢！/ 不客气！",
    category: 'daily' as SentenceCategory,
    gradeRange: [1, 3],
    example: "Thank you for your help!",
    exampleChinese: "谢谢你的帮助！",
    scene: "表示感谢"
  },
  {
    id: 10,
    pattern: "I'm sorry! / That's OK!",
    chinese: "对不起！/ 没关系！",
    category: 'daily' as SentenceCategory,
    gradeRange: [1, 3],
    example: "I'm sorry I'm late. That's OK!",
    exampleChinese: "对不起我迟到了。没关系！",
    scene: "道歉和原谅"
  },
  
  // 提问类
  {
    id: 11,
    pattern: "What's this? / It's...",
    chinese: "这是什么？/ 它是...",
    category: 'question' as SentenceCategory,
    gradeRange: [1, 3],
    example: "What's this? It's a cat.",
    exampleChinese: "这是什么？它是一只猫。",
    scene: "询问物品"
  },
  {
    id: 12,
    pattern: "What color is it? / It's...",
    chinese: "它是什么颜色？/ 它是...",
    category: 'question' as SentenceCategory,
    gradeRange: [1, 3],
    example: "What color is it? It's red.",
    exampleChinese: "它是什么颜色？它是红色的。",
    scene: "询问颜色"
  },
  {
    id: 13,
    pattern: "How many...?",
    chinese: "有多少...？",
    category: 'question' as SentenceCategory,
    gradeRange: [1, 3],
    example: "How many apples do you have? I have three.",
    exampleChinese: "你有多少个苹果？我有三个。",
    scene: "询问数量"
  },
  {
    id: 14,
    pattern: "Who is...?",
    chinese: "谁是...？",
    category: 'question' as SentenceCategory,
    gradeRange: [2, 3],
    example: "Who is that girl? She's my sister.",
    exampleChinese: "那个女孩是谁？她是我姐姐。",
    scene: "询问人物"
  },
  
  // 能力/喜好
  {
    id: 15,
    pattern: "I can...",
    chinese: "我会/能...",
    category: 'description' as SentenceCategory,
    gradeRange: [1, 3],
    example: "I can swim. Can you swim?",
    exampleChinese: "我会游泳。你会游泳吗？",
    scene: "描述能力"
  },
  {
    id: 16,
    pattern: "I like... / I don't like...",
    chinese: "我喜欢.../ 我不喜欢...",
    category: 'description' as SentenceCategory,
    gradeRange: [1, 3],
    example: "I like apples. I don't like bananas.",
    exampleChinese: "我喜欢苹果。我不喜欢香蕉。",
    scene: "表达喜好"
  },
  
  // ========== 高段句型 (4-6年级) ==========
  // 存在句
  {
    id: 17,
    pattern: "There is / There are...",
    chinese: "有...（存在）",
    category: 'description' as SentenceCategory,
    gradeRange: [4, 6],
    example: "There is a book on the desk. There are many students in the classroom.",
    exampleChinese: "桌子上有一本书。教室里有很多学生。",
    scene: "描述某地有某物"
  },
  
  // 进行时
  {
    id: 18,
    pattern: "I am / He is / They are doing...",
    chinese: "正在做...",
    category: 'description' as SentenceCategory,
    gradeRange: [4, 6],
    example: "I'm reading a book. He's playing football.",
    exampleChinese: "我正在看书。他正在踢足球。",
    scene: "描述正在进行的动作"
  },
  
  // 一般过去时
  {
    id: 19,
    pattern: "I / He / She did...",
    chinese: "做了...",
    category: 'description' as SentenceCategory,
    gradeRange: [5, 6],
    example: "I visited my grandmother yesterday. She was happy.",
    exampleChinese: "我昨天去看望了奶奶。她很开心。",
    scene: "描述过去发生的事"
  },
  
  // 将来时
  {
    id: 20,
    pattern: "I am going to... / I will...",
    chinese: "我将要...",
    category: 'description' as SentenceCategory,
    gradeRange: [5, 6],
    example: "I'm going to visit Beijing next week. I will take many photos.",
    exampleChinese: "我下周要去北京。我会拍很多照片。",
    scene: "描述计划/打算"
  },
  
  // 比较级
  {
    id: 21,
    pattern: "...is taller/shorter/bigger/smaller than...",
    chinese: "...比...更高/更矮/更大/更小",
    category: 'description' as SentenceCategory,
    gradeRange: [4, 6],
    example: "Tom is taller than me. This box is bigger than that one.",
    exampleChinese: "汤姆比我高。这个盒子比那个大。",
    scene: "比较事物"
  },
  
  // 提问类（高段）
  {
    id: 22,
    pattern: "Where is/are...?",
    chinese: "...在哪里？",
    category: 'question' as SentenceCategory,
    gradeRange: [4, 6],
    example: "Where is the library? It's next to the school.",
    exampleChinese: "图书馆在哪里？在学校旁边。",
    scene: "询问地点"
  },
  {
    id: 23,
    pattern: "When do you...?",
    chinese: "你什么时候...？",
    category: 'question' as SentenceCategory,
    gradeRange: [4, 6],
    example: "When do you get up? I get up at 6:30.",
    exampleChinese: "你什么时候起床？我6点半起床。",
    scene: "询问时间"
  },
  {
    id: 24,
    pattern: "Why...? Because...",
    chinese: "为什么...？因为...",
    category: 'question' as SentenceCategory,
    gradeRange: [4, 6],
    example: "Why do you like summer? Because I can swim.",
    exampleChinese: "你为什么喜欢夏天？因为我可以游泳。",
    scene: "询问原因"
  },
  
  // 请求类
  {
    id: 25,
    pattern: "Can I...? / May I...?",
    chinese: "我可以...吗？",
    category: 'request' as SentenceCategory,
    gradeRange: [4, 6],
    example: "Can I use your pen? Sure, here you are.",
    exampleChinese: "我可以用你的笔吗？当然，给你。",
    scene: "请求许可"
  },
  {
    id: 26,
    pattern: "Would you like...?",
    chinese: "你想要...吗？",
    category: 'request' as SentenceCategory,
    gradeRange: [4, 6],
    example: "Would you like some tea? Yes, please.",
    exampleChinese: "你想要一些茶吗？好的，谢谢。",
    scene: "邀请或提供"
  },
  
  // 情态动词
  {
    id: 27,
    pattern: "You should... / You must...",
    chinese: "你应该.../ 你必须...",
    category: 'request' as SentenceCategory,
    gradeRange: [5, 6],
    example: "You should study hard. You must do your homework.",
    exampleChinese: "你应该努力学习。你必须做作业。",
    scene: "建议或要求"
  },
  
  // 感叹句
  {
    id: 28,
    pattern: "What a/an...! / How...!",
    chinese: "多么...啊！",
    category: 'description' as SentenceCategory,
    gradeRange: [5, 6],
    example: "What a beautiful flower! How fast he runs!",
    exampleChinese: "多漂亮的花啊！他跑得真快！",
    scene: "表达感叹"
  },
  
  // 日常用语（高段）
  {
    id: 29,
    pattern: "What's the matter? / What's wrong?",
    chinese: "怎么了？/ 出什么事了？",
    category: 'daily' as SentenceCategory,
    gradeRange: [4, 6],
    example: "What's the matter? I have a headache.",
    exampleChinese: "怎么了？我头痛。",
    scene: "询问状况"
  },
  {
    id: 30,
    pattern: "It's time for/to...",
    chinese: "是该...的时候了",
    category: 'daily' as SentenceCategory,
    gradeRange: [4, 6],
    example: "It's time for lunch. It's time to go home.",
    exampleChinese: "该吃午饭了。该回家了。",
    scene: "提醒时间"
  }
];

/**
 * 获取指定年级范围的句型
 */
export function getSentencesByGradeRange(minGrade: number, maxGrade: number): SentencePattern[] {
  return SENTENCE_DATABASE.filter(s => 
    s.gradeRange[0] <= maxGrade && s.gradeRange[1] >= minGrade
  );
}

/**
 * 获取指定分类的句型
 */
export function getSentencesByCategory(category: SentenceCategory): SentencePattern[] {
  return SENTENCE_DATABASE.filter(s => s.category === category);
}