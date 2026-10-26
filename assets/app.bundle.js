/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 数据（v3.0 · 选择题版）
 * 5 级 × 20 题 = 100 题；每题 3 个释义选项 + 选项 D「以上都不正确」。
 * 80 题为正常题（正确释义在 A/B/C 中）；20 题为“无正确含义”题（4 题/级，正确答案为 D）。
 * ans: 0/1/2 = 正确选项下标；-1 = 正确答案为 D（以上都不正确）。
 * opts: 3 个释义选项；meaning 为教师答案用的标准释义。
 * ========================================================================== */
const VT_DATA = {
 "meta": {
  "title": "初中英语词汇量快速定级测试单",
  "subtitle": "人教版《英语》（2024 新版）· 成都适用 · 初二 / 初三",
  "version": "v3.0",
  "updated": "2026-10",
  "format": "mcq",
  "questions": 100,
  "choices": 4,
  "passMin": 16,
  "edgeMin": 12,
  "perLevel": 20,
  "minutesFast": "12–18",
  "minutesLimit": 25,
  "standardWords": 1600,
  "maxWords": 2400,
  "expected": {
   "grade8": "Level 3",
   "grade9": "Level 4"
  },
  "trapPerLevel": 4,
  "noneOption": "以上都不正确（选项中没有正确含义）"
 },
 "levels": [
  {
   "id": 1,
   "key": "L1",
   "color": "#4C8CB5",
   "name": "起步级",
   "book": "七年级上册",
   "inc": 450,
   "cum": 450,
   "desc": "能认读自我介绍、家人朋友、校园、学科、日常作息等最基础话题词汇；小学词汇基本过关",
   "exam": "约 90 分以下",
   "advice": "按七上单元词表过关；每天 15 词（词 → 义 → 拼写），先补高频名词与动词",
   "words": [
    {
     "n": 1,
     "w": "grade",
     "pos": "n.",
     "meaning": "年级", "opts": ["常规；日程", "建筑物", "年级"],
     "ans": 2
    },
    {
     "n": 2,
     "w": "classmate",
     "pos": "n.",
     "meaning": "同班同学", "opts": ["未来", "淋浴", "同班同学"],
     "ans": 2
    },
    {
     "n": 3,
     "w": "mistake",
     "pos": "n.",
     "meaning": "错误", "opts": ["建筑物", "错误", "常规；日程"],
     "ans": 1
    },
    {
     "n": 4,
     "w": "country",
     "pos": "n.",
     "meaning": "国家", "opts": ["年级", "常规；日程", "淋浴"],
     "ans": -1
    },
    {
     "n": 5,
     "w": "twin",
     "pos": "n.",
     "meaning": "双胞胎之一", "opts": ["双胞胎之一", "建筑物", "错误"],
     "ans": 0
    },
    {
     "n": 6,
     "w": "handsome",
     "pos": "adj.",
     "meaning": "英俊的", "opts": ["感兴趣的", "英俊的", "重要的"],
     "ans": 1
    },
    {
     "n": 7,
     "w": "together",
     "pos": "adv.",
     "meaning": "一起", "opts": ["突然", "一起", "实际上"],
     "ans": 1
    },
    {
     "n": 8,
     "w": "building",
     "pos": "n.",
     "meaning": "建筑物", "opts": ["年级", "淋浴", "建筑物"],
     "ans": 2
    },
    {
     "n": 9,
     "w": "important",
     "pos": "adj.",
     "meaning": "重要的", "opts": ["有用的", "令人兴奋的", "感兴趣的"],
     "ans": -1
    },
    {
     "n": 10,
     "w": "notice",
     "pos": "n./v.",
     "meaning": "通知；注意到", "opts": ["练习", "通知；注意到", "尊敬；尊重"],
     "ans": 1
    },
    {
     "n": 11,
     "w": "useful",
     "pos": "adj.",
     "meaning": "有用的", "opts": ["有用的", "令人兴奋的", "感兴趣的"],
     "ans": 0
    },
    {
     "n": 12,
     "w": "exciting",
     "pos": "adj.",
     "meaning": "令人兴奋的", "opts": ["重要的", "英俊的", "令人兴奋的"],
     "ans": 2
    },
    {
     "n": 13,
     "w": "remember",
     "pos": "v.",
     "meaning": "记住", "opts": ["参加；加入", "记住", "庆祝"],
     "ans": 1
    },
    {
     "n": 14,
     "w": "future",
     "pos": "n.",
     "meaning": "未来", "opts": ["同班同学", "常规；日程", "错误"],
     "ans": -1
    },
    {
     "n": 15,
     "w": "join",
     "pos": "v.",
     "meaning": "参加；加入", "opts": ["参加；加入", "记住", "选择"],
     "ans": 0
    },
    {
     "n": 16,
     "w": "choose",
     "pos": "v.",
     "meaning": "选择", "opts": ["庆祝", "参加；加入", "选择"],
     "ans": 2
    },
    {
     "n": 17,
     "w": "interested",
     "pos": "adj.",
     "meaning": "感兴趣的", "opts": ["令人兴奋的", "英俊的", "感兴趣的"],
     "ans": 2
    },
    {
     "n": 18,
     "w": "shower",
     "pos": "n.",
     "meaning": "淋浴", "opts": ["淋浴", "错误", "国家"],
     "ans": 0
    },
    {
     "n": 19,
     "w": "routine",
     "pos": "n.",
     "meaning": "常规；日程", "opts": ["同班同学", "年级", "国家"],
     "ans": -1
    },
    {
     "n": 20,
     "w": "celebrate",
     "pos": "v.",
     "meaning": "庆祝", "opts": ["记住", "庆祝", "选择"],
     "ans": 1
    }
   ]
  },
  {
   "id": 2,
   "key": "L2",
   "color": "#3D7CA3",
   "name": "基础级",
   "book": "七年级下册",
   "inc": 500,
   "cum": 950,
   "desc": "能谈动物、规则、运动健康、饮食、天气、难忘经历等话题；课标 1600 词掌握约六成",
   "exam": "约 90–105 分",
   "advice": "先补七下，滚动复习七上；每天 20 词＋短语，配合课文朗读",
   "words": [
    {
     "n": 1,
     "w": "giraffe",
     "pos": "n.",
     "meaning": "长颈鹿", "opts": ["菜单", "长颈鹿", "车站"],
     "ans": 1
    },
    {
     "n": 2,
     "w": "dangerous",
     "pos": "adj.",
     "meaning": "危险的", "opts": ["友好的", "危险的", "有礼貌的"],
     "ans": 1
    },
    {
     "n": 3,
     "w": "forest",
     "pos": "n.",
     "meaning": "森林", "opts": ["温度", "森林", "能量；精力"],
     "ans": 1
    },
    {
     "n": 4,
     "w": "friendly",
     "pos": "adj.",
     "meaning": "友好的", "opts": ["有礼貌的", "足够的", "危险的"],
     "ans": -1
    },
    {
     "n": 5,
     "w": "rule",
     "pos": "n.",
     "meaning": "规则", "opts": ["规则", "西瓜", "进步"],
     "ans": 0
    },
    {
     "n": 6,
     "w": "follow",
     "pos": "v.",
     "meaning": "遵循；跟随", "opts": ["遵循；跟随", "鼓励", "保护"],
     "ans": 0
    },
    {
     "n": 7,
     "w": "polite",
     "pos": "adj.",
     "meaning": "有礼貌的", "opts": ["足够的", "有礼貌的", "友好的"],
     "ans": 1
    },
    {
     "n": 8,
     "w": "respect",
     "pos": "n./v.",
     "meaning": "尊敬；尊重", "opts": ["练习", "尊敬；尊重", "事情；要紧"],
     "ans": 1
    },
    {
     "n": 9,
     "w": "practice",
     "pos": "n./v.",
     "meaning": "练习", "opts": ["尊敬；尊重", "事情；要紧", "志愿者"],
     "ans": -1
    },
    {
     "n": 10,
     "w": "advice",
     "pos": "n.[U]",
     "meaning": "建议", "opts": ["建议", "天气", "西瓜"],
     "ans": 0
    },
    {
     "n": 11,
     "w": "energy",
     "pos": "n.",
     "meaning": "能量；精力", "opts": ["天气", "能量；精力", "西瓜"],
     "ans": 1
    },
    {
     "n": 12,
     "w": "encourage",
     "pos": "v.",
     "meaning": "鼓励", "opts": ["鼓励", "遵循；跟随", "发明"],
     "ans": 0
    },
    {
     "n": 13,
     "w": "progress",
     "pos": "n.[U]",
     "meaning": "进步", "opts": ["西瓜", "温度", "进步"],
     "ans": 2
    },
    {
     "n": 14,
     "w": "watermelon",
     "pos": "n.",
     "meaning": "西瓜", "opts": ["车站", "温度", "进步"],
     "ans": -1
    },
    {
     "n": 15,
     "w": "menu",
     "pos": "n.",
     "meaning": "菜单", "opts": ["菜单", "进步", "博物馆"],
     "ans": 0
    },
    {
     "n": 16,
     "w": "enough",
     "pos": "adj./adv.",
     "meaning": "足够的", "opts": ["足够的", "友好的", "危险的"],
     "ans": 0
    },
    {
     "n": 17,
     "w": "station",
     "pos": "n.",
     "meaning": "车站", "opts": ["车站", "温度", "博物馆"],
     "ans": 0
    },
    {
     "n": 18,
     "w": "weather",
     "pos": "n.[U]",
     "meaning": "天气", "opts": ["长颈鹿", "西瓜", "天气"],
     "ans": 2
    },
    {
     "n": 19,
     "w": "temperature",
     "pos": "n.",
     "meaning": "温度", "opts": ["博物馆", "长颈鹿", "能量；精力"],
     "ans": -1
    },
    {
     "n": 20,
     "w": "museum",
     "pos": "n.",
     "meaning": "博物馆", "opts": ["菜单", "博物馆", "进步"],
     "ans": 1
    }
   ]
  },
  {
   "id": 3,
   "key": "L3",
   "color": "#2E6C94",
   "name": "进阶级",
   "book": "八年级上册",
   "inc": 500,
   "cum": 1450,
   "desc": "能谈度假、频率、人物比较、娱乐节目、未来计划、烹饪与邀请等；接近课标词汇达标线",
   "exam": "约 105–115 分",
   "advice": "补八上＋七、八年级高频词；重点抓动词搭配与常用短语",
   "words": [
    {
     "n": 1,
     "w": "wonderful",
     "pos": "adj.",
     "meaning": "精彩的", "opts": ["有天赋的", "精彩的", "舒适的"],
     "ans": 1
    },
    {
     "n": 2,
     "w": "bored",
     "pos": "adj.",
     "meaning": "厌倦的", "opts": ["有天赋的", "舒适的", "厌倦的"],
     "ans": 2
    },
    {
     "n": 3,
     "w": "housework",
     "pos": "n.[U]",
     "meaning": "家务", "opts": ["决心；决定", "家务", "环境"],
     "ans": 1
    },
    {
     "n": 4,
     "w": "hardly",
     "pos": "adv.",
     "meaning": "几乎不", "opts": ["一起", "突然", "实际上"],
     "ans": -1
    },
    {
     "n": 5,
     "w": "percent",
     "pos": "n.",
     "meaning": "百分之……", "opts": ["百分之……", "环境", "家务"],
     "ans": 0
    },
    {
     "n": 6,
     "w": "although",
     "pos": "conj.",
     "meaning": "虽然", "opts": ["虽然", "因为", "直到"],
     "ans": 0
    },
    {
     "n": 7,
     "w": "outgoing",
     "pos": "adj.",
     "meaning": "外向的", "opts": ["有教育意义的", "外向的", "厌倦的"],
     "ans": 1
    },
    {
     "n": 8,
     "w": "competition",
     "pos": "n.",
     "meaning": "比赛；竞争", "opts": ["工程师", "决心；决定", "比赛；竞争"],
     "ans": 2
    },
    {
     "n": 9,
     "w": "talented",
     "pos": "adj.",
     "meaning": "有天赋的", "opts": ["可获得的", "舒适的", "必要的"],
     "ans": -1
    },
    {
     "n": 10,
     "w": "necessary",
     "pos": "adj.",
     "meaning": "必要的", "opts": ["有教育意义的", "可获得的", "必要的"],
     "ans": 2
    },
    {
     "n": 11,
     "w": "comfortable",
     "pos": "adj.",
     "meaning": "舒适的", "opts": ["可获得的", "舒适的", "有天赋的"],
     "ans": 1
    },
    {
     "n": 12,
     "w": "educational",
     "pos": "adj.",
     "meaning": "有教育意义的", "opts": ["有教育意义的", "舒适的", "外向的"],
     "ans": 0
    },
    {
     "n": 13,
     "w": "expect",
     "pos": "v.",
     "meaning": "期望；预料", "opts": ["期望；预料", "改善；提高", "庆祝"],
     "ans": 0
    },
    {
     "n": 14,
     "w": "engineer",
     "pos": "n.",
     "meaning": "工程师", "opts": ["比赛；竞争", "百分之……", "环境"],
     "ans": -1
    },
    {
     "n": 15,
     "w": "resolution",
     "pos": "n.",
     "meaning": "决心；决定", "opts": ["家务", "决心；决定", "工程师"],
     "ans": 1
    },
    {
     "n": 16,
     "w": "improve",
     "pos": "v.",
     "meaning": "改善；提高", "opts": ["期望；预料", "改善；提高", "保护"],
     "ans": 1
    },
    {
     "n": 17,
     "w": "environment",
     "pos": "n.",
     "meaning": "环境", "opts": ["环境", "工程师", "百分之……"],
     "ans": 0
    },
    {
     "n": 18,
     "w": "pollution",
     "pos": "n.[U]",
     "meaning": "污染", "opts": ["比赛；竞争", "污染", "工程师"],
     "ans": 1
    },
    {
     "n": 19,
     "w": "available",
     "pos": "adj.",
     "meaning": "可获得的", "opts": ["舒适的", "厌倦的", "精彩的"],
     "ans": -1
    },
    {
     "n": 20,
     "w": "experience",
     "pos": "n./v.",
     "meaning": "经历；经验", "opts": ["经历；经验", "事情；要紧", "益处；受益"],
     "ans": 0
    }
   ]
  },
  {
   "id": 4,
   "key": "L4",
   "color": "#1F5C82",
   "name": "熟练级",
   "book": "八年级下册",
   "inc": 450,
   "cum": 1900,
   "desc": "能谈健康就医、志愿服务、家务责任、神话故事、地理之最、文学经历等；已超过课标 1600 词要求",
   "exam": "约 115–130 分",
   "advice": "补八下＋九年级前四单元；抓词块、一词多义与构词法",
   "words": [
    {
     "n": 1,
     "w": "matter",
     "pos": "n./v.",
     "meaning": "事情；要紧", "opts": ["志愿者", "财宝；珍视", "事情；要紧"],
     "ans": 2
    },
    {
     "n": 2,
     "w": "volunteer",
     "pos": "n./v.",
     "meaning": "志愿者", "opts": ["财宝；珍视", "事情；要紧", "志愿者"],
     "ans": 2
    },
    {
     "n": 3,
     "w": "satisfaction",
     "pos": "n.",
     "meaning": "满足；满意", "opts": ["独立", "记忆；回忆", "满足；满意"],
     "ans": 2
    },
    {
     "n": 4,
     "w": "borrow",
     "pos": "v.",
     "meaning": "借入", "opts": ["提醒；使想起", "提供", "保护"],
     "ans": -1
    },
    {
     "n": 5,
     "w": "provide",
     "pos": "v.",
     "meaning": "提供", "opts": ["提供", "争吵；争论", "借入"],
     "ans": 0
    },
    {
     "n": 6,
     "w": "independence",
     "pos": "n.",
     "meaning": "独立", "opts": ["独立", "成就；成绩", "人口"],
     "ans": 0
    },
    {
     "n": 7,
     "w": "argue",
     "pos": "v.",
     "meaning": "争吵；争论", "opts": ["提醒；使想起", "争吵；争论", "借入"],
     "ans": 1
    },
    {
     "n": 8,
     "w": "nervous",
     "pos": "adj.",
     "meaning": "紧张的", "opts": ["紧张的", "难以置信的", "友好的"],
     "ans": 0
    },
    {
     "n": 9,
     "w": "communicate",
     "pos": "v.",
     "meaning": "沟通；交流", "opts": ["借入", "保护", "提醒；使想起"],
     "ans": -1
    },
    {
     "n": 10,
     "w": "pressure",
     "pos": "n.[U]",
     "meaning": "压力", "opts": ["科技", "压力", "成就；成绩"],
     "ans": 1
    },
    {
     "n": 11,
     "w": "suddenly",
     "pos": "adv.",
     "meaning": "突然", "opts": ["突然", "实际上", "几乎不"],
     "ans": 0
    },
    {
     "n": 12,
     "w": "remind",
     "pos": "v.",
     "meaning": "提醒；使想起", "opts": ["借入", "提醒；使想起", "保护"],
     "ans": 1
    },
    {
     "n": 13,
     "w": "population",
     "pos": "n.",
     "meaning": "人口", "opts": ["记忆；回忆", "人口", "科技"],
     "ans": 1
    },
    {
     "n": 14,
     "w": "protect",
     "pos": "v.",
     "meaning": "保护", "opts": ["提供", "沟通；交流", "借入"],
     "ans": -1
    },
    {
     "n": 15,
     "w": "achievement",
     "pos": "n.",
     "meaning": "成就；成绩", "opts": ["成就；成绩", "记忆；回忆", "科技"],
     "ans": 0
    },
    {
     "n": 16,
     "w": "treasure",
     "pos": "n./v.",
     "meaning": "财宝；珍视", "opts": ["事情；要紧", "志愿者", "财宝；珍视"],
     "ans": 2
    },
    {
     "n": 17,
     "w": "technology",
     "pos": "n.",
     "meaning": "科技", "opts": ["科技", "记忆；回忆", "满足；满意"],
     "ans": 0
    },
    {
     "n": 18,
     "w": "actually",
     "pos": "adv.",
     "meaning": "实际上", "opts": ["实际上", "突然", "一起"],
     "ans": 0
    },
    {
     "n": 19,
     "w": "unbelievable",
     "pos": "adj.",
     "meaning": "难以置信的", "opts": ["紧张的", "外向的", "有天赋的"],
     "ans": -1
    },
    {
     "n": 20,
     "w": "memory",
     "pos": "n.",
     "meaning": "记忆；回忆", "opts": ["压力", "记忆；回忆", "满足；满意"],
     "ans": 1
    }
   ]
  },
  {
   "id": 5,
   "key": "L5",
   "color": "#12496E",
   "name": "优秀级",
   "book": "九年级＋中考冲刺",
   "inc": 500,
   "cum": 2400,
   "desc": "能谈世界变化、榜样人物、智能学习、创意发明、太空探索、音乐体育等抽象话题与高频短语；达高中衔接水平",
   "exam": "130 分以上",
   "advice": "保持每周 2 次阅读＋1 次写作；拓展高中衔接词与熟词生义",
   "words": [
    {
     "n": 1,
     "w": "government",
     "pos": "n.",
     "meaning": "政府", "opts": ["政府", "注意", "产品"],
     "ans": 0
    },
    {
     "n": 2,
     "w": "support",
     "pos": "v./n.",
     "meaning": "支持", "opts": ["病人；有耐心的", "支持", "益处；受益"],
     "ans": 1
    },
    {
     "n": 3,
     "w": "product",
     "pos": "n.",
     "meaning": "产品", "opts": ["奇迹", "知识", "产品"],
     "ans": 2
    },
    {
     "n": 4,
     "w": "digital",
     "pos": "adj.",
     "meaning": "数字的", "opts": ["有责任心的", "方便的", "感兴趣的"],
     "ans": -1
    },
    {
     "n": 5,
     "w": "convenient",
     "pos": "adj.",
     "meaning": "方便的", "opts": ["有责任心的", "数字的", "方便的"],
     "ans": 2
    },
    {
     "n": 6,
     "w": "business",
     "pos": "n.",
     "meaning": "生意；商业", "opts": ["生意；商业", "知识", "工业；行业"],
     "ans": 0
    },
    {
     "n": 7,
     "w": "benefit",
     "pos": "n./v.",
     "meaning": "益处；受益", "opts": ["病人；有耐心的", "益处；受益", "支持"],
     "ans": 1
    },
    {
     "n": 8,
     "w": "miracle",
     "pos": "n.",
     "meaning": "奇迹", "opts": ["政府", "注意", "奇迹"],
     "ans": 2
    },
    {
     "n": 9,
     "w": "inspire",
     "pos": "v.",
     "meaning": "激励；鼓舞", "opts": ["发明", "认为；猜想", "属于"],
     "ans": -1
    },
    {
     "n": 10,
     "w": "courage",
     "pos": "n.[U]",
     "meaning": "勇气", "opts": ["知识", "工业；行业", "勇气"],
     "ans": 2
    },
    {
     "n": 11,
     "w": "knowledge",
     "pos": "n.[U]",
     "meaning": "知识", "opts": ["工业；行业", "勇气", "知识"],
     "ans": 2
    },
    {
     "n": 12,
     "w": "patient",
     "pos": "n./adj.",
     "meaning": "病人；有耐心的", "opts": ["支持", "益处；受益", "病人；有耐心的"],
     "ans": 2
    },
    {
     "n": 13,
     "w": "attention",
     "pos": "n.",
     "meaning": "注意", "opts": ["生意；商业", "产品", "注意"],
     "ans": 2
    },
    {
     "n": 14,
     "w": "invent",
     "pos": "v.",
     "meaning": "发明", "opts": ["回收利用", "认为；猜想", "允许"],
     "ans": -1
    },
    {
     "n": 15,
     "w": "allow",
     "pos": "v.",
     "meaning": "允许", "opts": ["属于", "允许", "激励；鼓舞"],
     "ans": 1
    },
    {
     "n": 16,
     "w": "belong",
     "pos": "v.",
     "meaning": "属于", "opts": ["激励；鼓舞", "认为；猜想", "属于"],
     "ans": 2
    },
    {
     "n": 17,
     "w": "suppose",
     "pos": "v.",
     "meaning": "认为；猜想", "opts": ["认为；猜想", "回收利用", "允许"],
     "ans": 0
    },
    {
     "n": 18,
     "w": "recycle",
     "pos": "v.",
     "meaning": "回收利用", "opts": ["回收利用", "发明", "激励；鼓舞"],
     "ans": 0
    },
    {
     "n": 19,
     "w": "industry",
     "pos": "n.",
     "meaning": "工业；行业", "opts": ["勇气", "奇迹", "注意"],
     "ans": -1
    },
    {
     "n": 20,
     "w": "responsible",
     "pos": "adj.",
     "meaning": "有责任心的", "opts": ["方便的", "有责任心的", "数字的"],
     "ans": 1
    }
   ]
  }
 ]
};

if (typeof window !== "undefined") window.VT_DATA = VT_DATA;
if (typeof module !== "undefined" && module.exports) module.exports = VT_DATA;

/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 纯逻辑（选择题版，无 DOM，可在 Node 中测试）
 * ---------------------------------------------------------------------------
 * 题型：每题 3 个中文释义选项（A/B/C，下标 0–2）＋ 选项 D「以上都不正确」（下标 3）
 *       ans = 0/1/2 → 正确选项为对应释义；ans = -1 → 正确答案为 D
 * 判分：选对 1 分；选错 / 未答 0 分（答错不倒扣）
 * ========================================================================== */
(function (root) {
  "use strict";

  var PASS = 16;
  var EDGE = 12;
  var NONE_INDEX = 3;

  /** 正确答案下标（0–3） */
  function answerOf(item) {
    return item.ans === -1 ? NONE_INDEX : item.ans;
  }

  /** 单题判分：correct / wrong / timeout / blank（blank = 未测） */
  function grade(item, choice) {
    if (choice === -1) return "timeout";
    if (choice === undefined || choice === null) return "blank";
    return choice === answerOf(item) ? "correct" : "wrong";
  }

  /** 单级状态：pass / edge / fail / empty */
  function levelStatus(count) {
    if (count >= PASS) return "pass";
    if (count >= EDGE) return "edge";
    if (count > 0) return "fail";
    return "empty";
  }

  function roundInt(n) {
    return Math.round(n);
  }

  /** 通过级的词汇量区间（该级 16–20 分） */
  function rangeForPass(level, nextLevel) {
    return [level.cum, roundInt(level.cum + (11 / 20) * nextLevel.inc)];
  }

  /** 边缘级的词汇量区间（该级 12–15 分） */
  function rangeForEdge(level, nextLevel) {
    return [roundInt(level.cum + (12 / 20) * nextLevel.inc), roundInt(level.cum + 0.75 * nextLevel.inc)];
  }

  /** 把题库拍平成 100 题（带级别信息与全局序号） */
  function flatten(data) {
    var out = [];
    data.levels.forEach(function (lv) {
      lv.words.forEach(function (w) {
        out.push({
          g: out.length,
          levelId: lv.id,
          levelIndex: data.levels.indexOf(lv),
          levelName: lv.name,
          color: lv.color,
          n: w.n,
          w: w.w,
          pos: w.pos,
          meaning: w.meaning,
          opts: w.opts,
          ans: w.ans,
          trap: w.ans === -1
        });
      });
    });
    return out;
  }

  /** 定级与词汇量估算（counts = 每级答对数） */
  function evaluate(counts, data, autoPassed) {
    var levels = data.levels;
    var total = counts.reduce(function (a, b) { return a + b; }, 0);

    var highest = 0;
    for (var i = 0; i < levels.length; i++) {
      if (counts[i] >= PASS || (autoPassed && autoPassed[i])) highest = i + 1;
      else break;
    }

    var perLevel = levels.map(function (lv, idx) {
      return {
        id: lv.id,
        count: counts[idx],
        status: autoPassed && autoPassed[idx] ? "pass" : levelStatus(counts[idx]),
        passed: counts[idx] >= PASS || !!(autoPassed && autoPassed[idx])
      };
    });

    var result = { total: total, counts: counts.slice(), highest: highest, perLevel: perLevel };

    if (highest === 0) {
      result.code = "below";
      result.label = "未达 Level 1";
      result.levelIndex = 0;
      result.k = 1;
      result.stop = "第 1 级";
      result.recommend = "Level 1 起步级";
      result.estimate = roundInt((counts[0] / 20) * levels[0].inc);
      result.range = [0, roundInt(0.75 * levels[0].inc)];
    } else if (highest === levels.length) {
      var top = levels[levels.length - 1];
      result.code = "perfect";
      result.label = "Level 5 " + top.name;
      result.levelIndex = 5;
      result.k = 5;
      result.stop = "五级全过";
      result.recommend = "保持 Level 5，向高中衔接拓展";
      result.estimate = roundInt(top.cum - top.inc + (counts[4] / 20) * top.inc);
      result.range = [roundInt(top.cum - 0.2 * top.inc), top.cum];
    } else {
      var nextIdx = highest;
      var next = levels[nextIdx];
      var prev = levels[highest - 1];
      var nextCount = counts[nextIdx];

      result.levelIndex = highest;
      result.k = highest + 1;
      result.stop = "第 " + (highest + 1) + " 级";
      result.recommend = "Level " + (highest + 1) + " " + next.name;
      result.estimate = roundInt(prev.cum + (nextCount / 20) * next.inc);

      if (nextCount >= EDGE && nextCount <= PASS - 1) {
        result.code = "edge";
        result.label = "Level " + highest + " 边缘";
        result.range = rangeForEdge(prev, next);
      } else {
        result.code = "pass";
        result.label = "Level " + highest + " " + prev.name;
        result.range = rangeForPass(prev, next);
      }
    }

    result.rangeText = result.range[0] + "–" + result.range[1] + " 词";
    result.estimateText = "约 " + result.estimate + " 词";
    return result;
  }

  /** 整卷判分：answers = { 全局题号: 0–3 } */
  function score(answers, data, autoPassed) {
    var items = flatten(data);
    var perLevel = data.levels.map(function (lv) {
      return {
        id: lv.id,
        name: lv.name,
        color: lv.color,
        total: lv.words.length,
        correct: 0,
        wrong: 0,
        timeout: 0,
        blank: 0
      };
    });

    var details = items.map(function (item, i) {
      var has = Object.prototype.hasOwnProperty.call(answers, i);
      var choice = has ? answers[i] : null;
      var st = grade(item, choice);
      perLevel[item.levelIndex][st] += 1;
      return {
        g: i,
        levelId: item.levelId,
        levelIndex: item.levelIndex,
        levelName: item.levelName,
        color: item.color,
        n: item.n,
        w: item.w,
        pos: item.pos,
        meaning: item.meaning,
        opts: item.opts,
        ans: item.ans,
        answer: answerOf(item),
        trap: item.trap,
        choice: choice,
        state: st
      };
    });

    var total = { correct: 0, wrong: 0, timeout: 0, blank: 0, answered: 0, total: items.length };
    perLevel.forEach(function (p) {
      total.correct += p.correct;
      total.wrong += p.wrong;
      total.timeout += p.timeout;
      total.blank += p.blank;
    });
    total.answered = total.correct + total.wrong + total.timeout;

    var counts = perLevel.map(function (p) { return p.correct; });
    var result = evaluate(counts, data, autoPassed);

    var trapTotal = 0, trapCorrect = 0;
    details.forEach(function (d) {
      if (d.trap) {
        trapTotal++;
        if (d.state === "correct") trapCorrect++;
      }
    });

    return {
      items: items,
      details: details,
      perLevel: perLevel,
      counts: counts,
      total: total,
      trap: { total: trapTotal, correct: trapCorrect },
      result: result,
      accuracy: total.answered ? total.correct / total.answered : 0
    };
  }

  /** 速查表：定级结果 → 估算词汇量区间 */
  function rangeTable(data) {
    var levels = data.levels;
    var rows = [];
    rows.push({
      label: "未达 Level 1",
      case: "L1 答对 0–15 题（含 L1 边缘）",
      range: [0, roundInt(0.75 * levels[0].inc)]
    });
    for (var i = 0; i < levels.length; i++) {
      var lv = levels[i];
      var isTop = i === levels.length - 1;
      if (isTop) {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "五级全部通过（L5 答对 16–20 题）",
          range: [roundInt(lv.cum - 0.2 * lv.inc), lv.cum]
        });
      } else {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 答对 0–11 题",
          range: rangeForPass(lv, levels[i + 1])
        });
        rows.push({
          label: "Level " + lv.id + " 边缘",
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 答对 12–15 题",
          range: rangeForEdge(lv, levels[i + 1])
        });
      }
    }
    return rows;
  }

  var api = {
    PASS: PASS,
    EDGE: EDGE,
    NONE_INDEX: NONE_INDEX,
    answerOf: answerOf,
    grade: grade,
    levelStatus: levelStatus,
    flatten: flatten,
    evaluate: evaluate,
    score: score,
    rangeTable: rangeTable,
    rangeForPass: rangeForPass,
    rangeForEdge: rangeForEdge
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.VT_LOGIC = api;
})(typeof window !== "undefined" ? window : globalThis);

/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 交互逻辑（v4：5 秒/题 · 全屏 · 即时判对错 · 10 连错结束）
 * 依赖：data.js（VT_DATA）、logic.js（VT_LOGIC）；无第三方库
 * ========================================================================== */
(function () {
  "use strict";

  var data = window.VT_DATA;
  var logic = window.VT_LOGIC;
  var levels = data.levels;
  var items = logic.flatten(data);
  var meta = data.meta;
  var NONE_OPTION = meta.noneOption;
  var STORAGE_KEY = "vt-vocab-placement-v4";
  var LETTERS = ["A", "B", "C", "D"];
  var QUESTION_MS = 5000;      // 每题 5 秒
  var FEEDBACK_MS = 1500;      // 反馈停留时间
  var STREAK_LIMIT = 10;       // 连续 10 题答错结束
  var PASS_PER_LEVEL = 15;     // 本级答对 15 题通过；前 15 题全对自动跳级
  var CD_CIRC = 2 * Math.PI * 20;

  /* ------------------------------ 状态 ------------------------------ */
  var state = {
    answers: {},          // { 全局题号: 0–3 | -1(超时) }
    autoPassed: {},       // { levelIndex: true } 前 15 题全对、自动跳级的级别
    current: 0,
    startedAt: null,
    elapsed: 0,
    timerId: null,
    finished: false,
    earlyStop: false,
    completedAll: false,
    stopLevel: 0,
    streak: 0,
    locked: false,
    phase: "idle",
    mode: "placement",
    countdownId: null,
    countdownStart: 0,
    nextTimer: null,
    profile: { name: "", cls: "" },
    history: []
  };

  var els = {};
  var scoreCache = null;

  /* ------------------------------ 工具 ------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtTime(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function todayText() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function toast(msg) {
    var t = els.toast;
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toast._tid);
    toast._tid = setTimeout(function () { t.classList.remove("is-show"); }, 2400);
  }

  function answeredCount() { return Object.keys(state.answers).length; }
  function isAnswered(g) { return Object.prototype.hasOwnProperty.call(state.answers, g); }

  function statusOf(g) {
    if (!isAnswered(g)) return "untested";
    var c = state.answers[g];
    if (c === -1) return "timeout";
    return c === logic.answerOf(items[g]) ? "correct" : "wrong";
  }

  /* 当前级别的题号区间与答对数 */
  function levelRange(li) {
    var start = 0;
    for (var i = 0; i < li; i++) start += levels[i].words.length;
    return [start, start + levels[li].words.length];
  }
  function levelCorrect(li) {
    var range = levelRange(li), n = 0;
    for (var g = range[0]; g < range[1]; g++) {
      if (state.answers[g] === logic.answerOf(items[g])) n++;
    }
    return n;
  }
  function nextLevelStart(li) {
    return levelRange(li)[1];
  }

  function estimateLabel(result) {
    if (result.estimate < 100) return "不足 100 词";
    return "约 " + result.estimate + " 词";
  }

  function itemAnswerText(item) {
    if (item.ans === -1) return "D. " + NONE_OPTION;
    return LETTERS[item.ans] + ". " + item.opts[item.ans];
  }

  function choiceText(item, choice) {
    if (choice === null || choice === undefined) return "未测";
    if (choice === -1) return "超时未答";
    if (choice === 3) return "D. " + NONE_OPTION;
    return LETTERS[choice] + ". " + item.opts[choice];
  }

  /* ------------------------------ 存储 ------------------------------ */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: state.answers,
        autoPassed: state.autoPassed,
        current: state.current,
        startedAt: state.startedAt,
        elapsed: state.elapsed,
        finished: state.finished,
        earlyStop: state.earlyStop,
        completedAll: state.completedAll,
        stopLevel: state.stopLevel,
        mode: state.mode,
        profile: state.profile,
        history: state.history,
        savedAt: Date.now()
      }));
    } catch (e) { /* 隐私模式忽略 */ }
  }

  function loadState() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return;
      state.answers = obj.answers && typeof obj.answers === "object" ? obj.answers : {};
      state.autoPassed = obj.autoPassed && typeof obj.autoPassed === "object" ? obj.autoPassed : {};
      state.current = Number.isFinite(obj.current) ? Math.min(items.length - 1, Math.max(0, obj.current)) : 0;
      state.finished = !!obj.finished;
      state.earlyStop = !!obj.earlyStop;
      state.completedAll = !!obj.completedAll;
      state.stopLevel = Number(obj.stopLevel) || 0;
      state.mode = obj.mode === "practice" ? "practice" : "placement";
      state.elapsed = Number(obj.elapsed) || 0;
      state.profile = obj.profile || { name: "", cls: "" };
      state.history = Array.isArray(obj.history) ? obj.history : [];
      if (obj.startedAt && !state.finished) state.startedAt = Date.now() - state.elapsed;
    } catch (e) { /* 数据损坏则忽略 */ }
  }

  /* ------------------------------ 计时 ------------------------------ */
  function startTimer() {
    if (state.timerId) return;
    if (!state.startedAt) state.startedAt = Date.now() - (state.elapsed || 0);
    state.timerId = setInterval(function () {
      state.elapsed = Date.now() - state.startedAt;
      updateTimer();
    }, 500);
    updateTimer();
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimer() {
    var text = fmtTime(state.elapsed);
    if (els.timerText) els.timerText.textContent = text;
    if (els.outTimer2) els.outTimer2.textContent = text;
    if (els.stageTimer) els.stageTimer.textContent = text;
    if (els.timer) {
      els.timer.classList.toggle("is-warn", state.elapsed > 12 * 60000 && state.elapsed <= 18 * 60000);
      els.timer.classList.toggle("is-over", state.elapsed > 18 * 60000);
    }
  }

  /* ------------------------------ 全屏 ------------------------------ */
  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function requestFullscreen() {
    var el = document.documentElement;
    var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!fn) { toast("当前浏览器不支持全屏，已进入专注模式"); return; }
    try {
      var p = fn.call(el);
      if (p && p.catch) p.catch(function () { toast("浏览器未允许全屏，已进入专注模式"); });
    } catch (e) { /* 忽略 */ }
  }

  function exitFullscreen() {
    if (!isFullscreen()) return;
    var fn = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (!fn) return;
    try {
      var p = fn.call(document);
      if (p && p.catch) p.catch(function () {});
    } catch (e) { /* 忽略 */ }
  }

  function syncFullscreenBtn() {
    if (!els.btnFullscreen) return;
    els.btnFullscreen.textContent = isFullscreen() ? "退出全屏" : "全屏";
  }

  /* ------------------------------ 首屏五级阶梯 ------------------------------ */
  function renderHeroLadder() {
    if (!els.heroLadder) return;
    var max = levels[levels.length - 1].cum;
    els.heroLadder.innerHTML = levels.map(function (lv) {
      return '<li class="ladder-row" style="--lv:' + lv.color + '">' +
        '<span class="lv-name">L' + lv.id + '<small>' + lv.name + "</small></span>" +
        '<span class="ladder-bar"><i style="width:' + Math.round(lv.cum / max * 100) + "%;background:" + lv.color + '"></i></span>' +
        '<span class="lv-cum">≈ ' + lv.cum + " 词</span>" +
        "</li>";
    }).join("");
  }

  /* ------------------------------ 答题进度图 ------------------------------ */
  function renderProgressMap() {
    if (!els.sheetMap) return;
    var html = "";
    levels.forEach(function (lv, li) {
      html += '<div class="stage-group" style="--lv:' + lv.color + '">' +
        '<span class="sgg-label">L' + lv.id + "</span>" +
        '<div class="sgg-cells">';
      for (var i = 0; i < 20; i++) {
        var g = li * 20 + i;
        html += '<span class="stage-cell" data-g="' + g + '" title="第 ' + (g + 1) + ' 题">' + (i + 1) + "</span>";
      }
      html += "</div></div>";
    });
    els.sheetMap.innerHTML = html;
    updateProgressMap();
  }

  function updateProgressMap() {
    if (!els.sheetMap) return;
    $$(".stage-cell", els.sheetMap).forEach(function (b) {
      var g = Number(b.getAttribute("data-g"));
      var st = statusOf(g);
      b.className = "stage-cell is-" + st +
        (g === state.current && state.phase !== "finished" ? " is-current" : "");
    });
    if (els.streakNum) els.streakNum.textContent = state.streak;
    if (els.streak) {
      els.streak.classList.toggle("is-warn", state.streak >= 7);
      els.streak.classList.toggle("is-danger", state.streak >= 9);
    }
  }

  /* ------------------------------ 开始面板 ------------------------------ */
  function isPractice() { return state.mode === "practice"; }

  function renderMode() {
    var practice = isPractice();
    var locked = answeredCount() > 0 && !state.finished;
    if (els.modeSwitch) {
      els.modeSwitch.hidden = locked;
      Array.prototype.forEach.call(els.modeSwitch.querySelectorAll(".mode-btn"), function (b) {
        var on = b.getAttribute("data-mode") === state.mode;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    if (els.modeHint) els.modeHint.hidden = locked;
    if (els.btnStart) els.btnStart.textContent = practice ? "开始练习（进入全屏）" : "开始答题（进入全屏）";
  }

  function setMode(mode) {
    if (state.phase === "testing" && answeredCount() > 0 && !state.finished) {
      toast("答题中不能切换模式，请先结束或重新开始");
      return;
    }
    state.mode = mode === "practice" ? "practice" : "placement";
    saveState();
    renderStartPanel();
  }

  function renderStartPanel() {
    if (!els.startPanel) return;
    var answered = answeredCount();
    var hasProgress = answered > 0 && !state.finished;

    els.startPanel.hidden = false;
    els.testStage.hidden = true;
    document.body.classList.remove("is-testing", "is-practice");
    renderMode();

    if (state.finished) {
      els.startTitle.textContent = isPractice() ? "本次练习已结束" : "本次测试已结束";
      els.startSub.textContent = scoreCache
        ? (state.earlyStop ? "提前结束 · " : "") + "答对 " + scoreCache.total.correct + " / 100 · 定级 " + scoreCache.result.label
        : "已完成";
      els.btnStart.hidden = true;
      els.btnResume.hidden = false;
      els.btnResume.textContent = "查看结果";
      els.btnRestart2.hidden = false;
      els.startNote.textContent = "如需重测，点击“重新开始”会清空本次答案与计时（复测记录保留）。";
    } else if (hasProgress) {
      els.startTitle.textContent = "继续上次答题";
      els.startSub.textContent = "已答 " + answered + " / 100 题 · 已用 " + fmtTime(state.elapsed);
      els.btnStart.hidden = true;
      els.btnResume.hidden = false;
      els.btnResume.textContent = "继续答题（进入全屏）";
      els.btnRestart2.hidden = false;
      els.startNote.textContent = "进度保存在本机浏览器；也可以重新开始一套新的。";
    } else {
      els.startTitle.textContent = "准备好了吗？";
      els.startSub.textContent = isPractice()
        ? "共 100 题 · 不限时 · 选完立刻看释义，手动进入下一题"
        : "共 100 题 · 每题 4 个选项 · 每题 5 秒自动进入下一题";
      els.btnStart.hidden = false;
      els.btnResume.hidden = true;
      els.btnRestart2.hidden = true;
      els.startNote.textContent = isPractice()
        ? "练习模式不自动跳题、不因连续答错提前结束；可随时点“结束测试”查看统计。"
        : "开始后进入全屏专注模式；连续 10 题答错会自动结束测试。";
    }
  }

  /* ------------------------------ 题目渲染 ------------------------------ */
  function renderQuestion() {
    var item = items[state.current];
    if (!item) return;
    state.phase = "testing";
    state.locked = false;

    if (els.qLevel) {
      els.qLevel.textContent = "Level " + item.levelId + " " + item.levelName;
      els.qLevel.style.setProperty("--lv", item.color);
    }
    if (els.qCount) els.qCount.textContent = "第 " + (state.current + 1) + " / " + items.length + " 题";
    if (els.qLevelCount) els.qLevelCount.textContent = "本级 " + item.n + "/20";
    if (els.qWord) els.qWord.textContent = item.w;
    if (els.qPos) els.qPos.textContent = item.pos;
    if (els.feedback) {
      els.feedback.hidden = true;
      els.feedback.className = "feedback";
      els.feedback.textContent = "";
    }

    var html = "";
    for (var i = 0; i < 4; i++) {
      html += '<button type="button" class="opt' + (i === 3 ? " opt-none" : "") +
        '" data-choice="' + i + '">' +
        '<span class="opt-letter">' + LETTERS[i] + "</span>" +
        '<span class="opt-text">' + (i === 3 ? NONE_OPTION : item.opts[i]) + "</span>" +
        "</button>";
    }
    els.qOptions.innerHTML = html;

    updateProgressMap();
    if (isPractice()) {
      stopCountdown();
      if (els.countdown) els.countdown.hidden = true;
      if (els.cdNum) els.cdNum.textContent = "–";
    } else {
      if (els.countdown) els.countdown.hidden = false;
      startCountdown();
    }
  }

  /* ------------------------------ 5 秒倒计时 ------------------------------ */
  function startCountdown() {
    clearInterval(state.countdownId);
    state.countdownStart = Date.now();
    updateCountdown(QUESTION_MS);
    state.countdownId = setInterval(function () {
      var left = QUESTION_MS - (Date.now() - state.countdownStart);
      if (left <= 0) {
        clearInterval(state.countdownId);
        state.countdownId = null;
        updateCountdown(0);
        handleTimeout();
        return;
      }
      updateCountdown(left);
    }, 80);
  }

  function updateCountdown(left) {
    var sec = Math.max(0, Math.ceil(left / 1000));
    var ratio = Math.max(0, Math.min(1, left / QUESTION_MS));
    if (els.cdNum) els.cdNum.textContent = sec;
    if (els.cdFg) {
      els.cdFg.style.strokeDasharray = CD_CIRC;
      els.cdFg.style.strokeDashoffset = CD_CIRC * (1 - ratio);
    }
    if (els.countdown) {
      els.countdown.classList.toggle("is-urgent", sec <= 2 && state.phase === "testing");
      els.countdown.classList.toggle("is-paused", state.phase !== "testing");
    }
  }

  function stopCountdown() {
    clearInterval(state.countdownId);
    state.countdownId = null;
  }

  /* ------------------------------ 判题与反馈 ------------------------------ */
  function showFeedback(pkg) {
    var item = pkg.item;
    var answerIdx = logic.answerOf(item);
    var correct = pkg.state === "correct";

    $$(".opt", els.qOptions).forEach(function (b) {
      var idx = Number(b.getAttribute("data-choice"));
      b.classList.remove("is-right", "is-wrong");
      b.disabled = true;
      if (idx === answerIdx) b.classList.add("is-right");
      if (!correct && idx === pkg.choice) b.classList.add("is-wrong");
    });

    if (els.feedback) {
      els.feedback.hidden = false;
      els.feedback.className = "feedback " + (correct ? "is-correct" : pkg.timeout ? "is-timeout" : "is-wrong");
      els.feedback.innerHTML = correct
        ? '<b>✓ 正确</b><span>你是对的</span>'
        : '<b>' + (pkg.timeout ? "⏱ 超时未答" : "✗ 答错") + "</b><span>正确答案：" + itemAnswerText(item) +
          (item.ans === -1 ? '<i>（标准释义：' + item.meaning + "）</i>" : "") + "</span>";
    }
    if (isPractice() && els.feedback) {
      var meaning = item.meaning ? "<b>" + item.w + "：</b>" + item.meaning : "";
      els.feedback.innerHTML += '<span class="practice-explain">' + meaning + "</span>" +
        '<button type="button" class="practice-next" id="practiceNext">' +
        (state.current >= items.length - 1 ? "查看统计" : "下一题 →") + "</button>";
    }
    if (els.cdNum) els.cdNum.textContent = "–";
    if (els.countdown) els.countdown.classList.add("is-paused");
  }

  function scheduleNext(delay, endAfter, target) {
    clearTimeout(state.nextTimer);
    state.nextTimer = setTimeout(function () {
      if (endAfter) { finishQuiz(true); return; }
      if (target == null) target = state.current + 1;
      if (target >= items.length) { finishQuiz(false); return; }
      state.current = target;
      saveState();
      renderQuestion();
    }, delay);
  }

  function practiceNext() {
    if (!isPractice()) return;
    if (state.current >= items.length - 1) { finishQuiz(false); return; }
    state.current += 1;
    state.locked = false;
    saveState();
    renderQuestion();
    updateProgressMap();
  }

  function selectChoice(choice) {
    if (state.locked || state.phase !== "testing" || state.finished) return;
    state.locked = true;
    stopCountdown();

    var item = items[state.current];
    var answerIdx = logic.answerOf(item);
    var st = choice === answerIdx ? "correct" : "wrong";
    state.answers[state.current] = choice;
    if (st === "correct") state.streak = 0;
    else state.streak += 1;
    state.stopLevel = item.levelId;

    showFeedback({ item: item, state: st, choice: choice, timeout: false });
    updateProgressMap();
    saveState();

    if (isPractice()) return;

    var end = state.streak >= STREAK_LIMIT;
    var target = null;
    if (st === "correct") {
      var range = levelRange(item.levelIndex);
      var correctNow = levelCorrect(item.levelIndex);
      if (correctNow >= PASS_PER_LEVEL && state.current === range[0] + PASS_PER_LEVEL - 1) {
        target = nextLevelStart(item.levelIndex);
        state.autoPassed[item.levelIndex] = true;
        var nextLv = levels[item.levelIndex + 1];
        toast(nextLv
          ? "本级已答对 15 题，通过；自动进入 " + (nextLv.code || ("Level " + nextLv.id)) + " " + nextLv.name
          : "本级已答对 15 题，测试完成");
      }
    }
    scheduleNext(FEEDBACK_MS + 150, end, target);
  }

  function handleTimeout() {
    if (state.locked || state.phase !== "testing" || state.finished) return;
    state.locked = true;
    var item = items[state.current];
    state.answers[state.current] = -1;
    state.streak += 1;
    state.stopLevel = item.levelId;
    showFeedback({ item: item, state: "timeout", choice: -1, timeout: true });
    updateProgressMap();
    saveState();
    var end = state.streak >= STREAK_LIMIT;
    scheduleNext(FEEDBACK_MS + 250, end);
  }

  /* ------------------------------ 开始 / 继续 / 重置 ------------------------------ */
  function enterTestMode() {
    document.body.classList.add("is-testing");
    els.startPanel.hidden = true;
    els.testStage.hidden = false;
    requestFullscreen();
    state.phase = "testing";
    state.locked = false;
    state.streak = 0;
    document.body.classList.toggle("is-practice", isPractice());
    if (els.countdown) els.countdown.hidden = isPractice();
    if (!state.startedAt) state.startedAt = Date.now();
    startTimer();
    renderQuestion();
    updateProgressMap();
    syncFullscreenBtn();
  }

  function startFresh() {
    if (answeredCount() > 0 && !state.finished) {
      if (!window.confirm("重新开始会清空已答的题目，确定吗？")) return;
    }
    state.answers = {};
    state.autoPassed = {};
    state.current = 0;
    state.startedAt = Date.now();
    state.elapsed = 0;
    state.finished = false;
    state.earlyStop = false;
    state.completedAll = false;
    state.stopLevel = 0;
    state.streak = 0;
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    saveState();
    scoreCache = null;
    enterTestMode();
    toast("答题开始：每题 5 秒，选完自动进入下一题");
  }

  function resumeQuiz() {
    if (state.finished) {
      var r = document.getElementById("result");
      if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var idx = state.current;
    while (idx < items.length && isAnswered(idx)) idx++;
    state.current = Math.min(items.length - 1, idx);
    enterTestMode();
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ block: "start" });
  }

  function restartQuiz() {
    var msg = state.finished ? "确定重新开始一套新的测试吗？当前结果将被清空（复测记录保留）。" : "确定重新开始吗？已答的题目会被清空。";
    if (!window.confirm(msg)) return;
    exitFullscreen();
    state.answers = {};
    state.current = 0;
    state.startedAt = null;
    state.elapsed = 0;
    state.finished = false;
    state.earlyStop = false;
    state.completedAll = false;
    state.stopLevel = 0;
    state.streak = 0;
    state.phase = "idle";
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    updateTimer();
    saveState();
    document.body.classList.remove("is-testing");
    renderStartPanel();
    renderResult();
    renderLevelTable(null);
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    toast("已清空，可重新开始");
  }

  /* ------------------------------ 结束 ------------------------------ */
  function finishQuiz(early) {
    if (state.finished) return;
    state.finished = true;
    state.earlyStop = !!early;
    state.completedAll = !early && answeredCount() >= items.length;
    if (early) state.streak = STREAK_LIMIT;
    state.phase = "finished";
    state.locked = true;
    if (state.startedAt) state.elapsed = Date.now() - state.startedAt;
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    exitFullscreen();
    document.body.classList.remove("is-testing");
    saveState();
    scoreCache = logic.score(state.answers, data, state.autoPassed);
    renderResult();
    renderStartPanel();
    updateTimer();
    toast(early ? "连续 10 题答错，测试已提前结束" : "测试已结束，结果已生成");
    var r = document.getElementById("result");
    if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitNow() {
    if (state.finished) {
      var r0 = document.getElementById("result");
      if (r0) r0.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var blank = items.length - answeredCount();
    var ok = window.confirm(blank > 0
      ? "还有 " + blank + " 题未测，未测按 0 分计。确定结束测试吗？"
      : "确定结束测试并查看结果吗？");
    if (!ok) return;
    finishQuiz(false);
  }

  /* ------------------------------ 结果渲染 ------------------------------ */
  function resultSub(result) {
    if (result.code === "below") return "Level 1 未达通过 —— 建议先从起步级词表系统补起";
    if (result.code === "perfect") return "五级全部通过，达到本单上限（约 2400 词）";
    if (result.code === "edge") return "连续通过 Level 1–" + result.highest + "，停在 Level " + (result.highest + 1) + "（边缘）";
    return "连续通过 Level 1–" + result.highest + "，停在 Level " + (result.highest + 1);
  }

  function goalText(result) {
    var h = result.highest;
    if (h >= 4) return "已达到初三期望线（Level 4）";
    if (h === 3) return "已达到初二期望线（Level 3）；距初三期望线（Level 4）还差 1 级";
    if (h >= 1) return "距初二期望线（Level 3）还差 " + (3 - h) + " 级";
    return "距初二期望线（Level 3）还差 3 级";
  }

  function timeNote(ms) {
    if (isPractice()) return "练习模式 · 不限时";
    var min = ms / 60000;
    if (ms <= 0) return "尚未开始计时";
    if (min > 18) return "明显超过预期用时，结果仅供参考";
    if (min > 12) return "用时略长";
    if (min < 1) return "用时很短，说明作答非常迅速";
    return "用时正常（每题 5 秒节奏）";
  }

  function renderResult() {
    var body = els.resultBody;
    var empty = els.resultEmpty;
    if (!state.finished || !scoreCache) {
      if (body) body.hidden = true;
      if (empty) empty.hidden = false;
      if (els.earlyBanner) els.earlyBanner.hidden = true;
      return;
    }
    if (body) body.hidden = false;
    if (empty) empty.hidden = true;

    var sc = scoreCache;
    var result = sc.result;

    if (els.earlyBanner) {
      els.earlyBanner.hidden = !state.earlyStop;
      if (state.earlyStop) {
        if (els.earlyReason) {
          els.earlyReason.textContent = "连续 " + STREAK_LIMIT + " 题答错（含超时未答），测试在 Level " + state.stopLevel +
            " 第 " + (state.current % 20 + 1) + " 题处提前结束。";
        }
        if (els.earlyNote) {
          els.earlyNote.textContent = "为什么提前结束：连续答错说明当前级别已明显超出你的词汇水平，继续测容易变成猜题，既测不出真实词汇量，也会浪费时间。未测题目记为“未测”，不参与答对计数；定级按已测部分计算（未测级别按 0 分计）。建议从 " + result.recommend + " 开始系统回补。";
        }
      }
    }

    els.resLevel.textContent = result.label;
    els.resSub.textContent = (isPractice() ? "练习模式 · " : "") + resultSub(result);
    var badge = els.resBadge;
    badge.textContent = result.code === "edge" ? "边缘" : result.code === "below" ? "未达" : result.code === "perfect" ? "满级" : "通过";
    badge.className = "rc-badge" + (result.code === "edge" ? " is-edge" : result.code === "below" ? " is-below" : "");

    els.resEstimate.textContent = estimateLabel(result);
    els.resRange.textContent = "区间 " + result.rangeText;
    els.resCorrect.textContent = sc.total.correct + " / 100";
    els.resAccuracy.textContent = "已答 " + sc.total.answered + " 题 · 正确率 " + Math.round(sc.accuracy * 100) + "%";
    els.resTime.textContent = fmtTime(state.elapsed);
    els.resTimeNote.textContent = timeNote(state.elapsed);
    els.resRecommend.textContent = result.recommend;
    els.resStop.textContent = state.earlyStop
      ? "提前结束（Level " + state.stopLevel + "）"
      : (result.code === "below" ? "止于第 1 级" : result.code === "perfect" ? "五级全过" : "止于第 " + (result.highest + 1) + " 级");

    var parts = [
      "正确 " + sc.total.correct,
      "错误 " + sc.total.wrong,
      "超时未答 " + sc.total.timeout,
      "未测 " + sc.total.blank,
      "“无正确含义”题答对 " + sc.trap.correct + " / " + sc.trap.total
    ];
    els.resMeta.textContent = parts.join(" · ");

    var adviceLv = levels[Math.min(4, Math.max(0, result.levelIndex - 1))] || levels[0];
    els.resAdvice.textContent = result.code === "below"
      ? "从 Level 1 起步级开始：先过七上单元词表，每天 15 词（词 → 义 → 拼写），先补高频名词与动词。"
      : adviceLv.advice;
    els.resGoal.textContent = goalText(result) + "；期望线：初二 ≥ Level 3，初三 ≥ Level 4。";

    renderDist(sc);
    if (els.ruler) els.ruler.innerHTML = rulerSvg(result);
    if (els.rulerNote) {
      els.rulerNote.textContent = "你的估算位置落在 " + result.label + " 区间（" + result.rangeText + "）；下一目标：" + result.recommend + "。";
    }
    renderWrongList(sc);
    renderReview(sc);
    renderLevelTable(result);
    renderRangeHighlight(result);
    fillPrintHeader();
  }

  function renderDist(sc) {
    if (!els.distGrid) return;
    var html = levels.map(function (lv, li) {
      var cells = "";
      for (var i = 0; i < 20; i++) {
        var g = li * 20 + i;
        var st = statusOf(g);
        var cls = "dist-cell is-" + st + (i > 0 && i % 5 === 0 ? " is-sep" : "");
        var txt = st === "correct" ? "答对" : st === "wrong" ? "答错" : st === "timeout" ? "超时" : "未测";
        cells += '<span class="' + cls + '" title="L' + lv.id + " 第 " + (i + 1) + " 题：" + txt + '"></span>';
      }
      return '<div class="dist-row" style="--lv:' + lv.color + '">' +
        '<span class="dr-label">L' + lv.id + "</span>" +
        '<span class="dist-cells">' + cells + "</span>" +
        "</div>";
    }).join("");
    els.distGrid.innerHTML = html;

    if (els.distLegend) {
      els.distLegend.innerHTML = sc.perLevel.map(function (p) {
        return '<li style="--lv:' + p.color + '"><span class="chip"></span>L' + p.id + " " + p.name +
          "：对 " + p.correct + " · 错 " + p.wrong + " · 超时 " + p.timeout + " · 未测 " + p.blank + "</li>";
      }).join("");
    }
  }

  function rulerSvg(result) {
    var W = 480, H = 198;
    var padL = 20, padR = 16;
    var axisY = 118;
    var x = function (v) { return padL + (v / 2400) * (W - padL - padR); };
    var p = [];

    levels.forEach(function (lv, i) {
      var start = i === 0 ? 0 : levels[i - 1].cum;
      var x0 = x(start), x1 = x(lv.cum);
      p.push('<rect x="' + x0 + '" y="' + (axisY + 4) + '" width="' + Math.max(1, x1 - x0) +
        '" height="28" fill="' + lv.color + '" fill-opacity="0.15" stroke="' + lv.color +
        '" stroke-opacity="0.55" stroke-width="1"/>');
      p.push('<text x="' + ((x0 + x1) / 2) + '" y="' + (axisY + 22) +
        '" text-anchor="middle" font-size="11" font-weight="700" fill="' + lv.color + '">L' + lv.id + "</text>");
    });

    p.push('<line x1="' + padL + '" y1="' + axisY + '" x2="' + (W - padR) + '" y2="' + axisY + '" stroke="#134B70" stroke-width="1.6"/>');

    for (var v = 0; v <= 2400; v += 100) {
      var xv = x(v);
      var major = v % 600 === 0;
      p.push('<line x1="' + xv + '" y1="' + axisY + '" x2="' + xv + '" y2="' + (axisY - (major ? 16 : 8)) +
        '" stroke="#6c8296" stroke-width="' + (major ? 1.3 : 0.9) + '"/>');
      if (major) {
        p.push('<text x="' + xv + '" y="' + (axisY - 22) + '" text-anchor="middle" font-size="10" fill="#5B7184">' + v + "</text>");
      }
    }

    var x1600 = x(1600);
    p.push('<line x1="' + x1600 + '" y1="' + (axisY - 32) + '" x2="' + x1600 + '" y2="' + (axisY + 34) +
      '" stroke="#A9721A" stroke-width="1.4" stroke-dasharray="5 4"/>');
    p.push('<text x="' + x1600 + '" y="' + (axisY - 37) + '" text-anchor="middle" font-size="9.5" fill="#A9721A">课标 1600</text>');

    var xe = x(Math.min(2400, Math.max(0, result.estimate)));
    var labelX = Math.min(W - padR - 40, Math.max(padL + 40, xe));
    p.push('<line x1="' + xe + '" y1="' + axisY + '" x2="' + xe + '" y2="' + (axisY - 40) + '" stroke="#C0553F" stroke-width="1.8"/>');
    p.push('<polygon points="' + xe + "," + (axisY - 40) + " " + (xe - 5) + "," + (axisY - 50) + " " + (xe + 5) + "," + (axisY - 50) + '" fill="#C0553F"/>');
    p.push('<text x="' + labelX + '" y="' + (axisY - 56) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#C0553F">▲ ' + estimateLabel(result) + "</text>");
    p.push('<text x="' + (W - padR) + '" y="' + (H - 4) + '" text-anchor="end" font-size="9.5" fill="#8BA0B1">累计词汇量（词）</text>');

    return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="词汇量刻度尺：估算 ' + result.estimate + ' 词">' + p.join("") + "</svg>";
  }

  function renderWrongList(sc) {
    if (!els.wrongList) return;
    var bad = sc.details.filter(function (d) { return d.state === "wrong" || d.state === "timeout"; });
    if (!bad.length) {
      els.wrongList.innerHTML = '<div class="wrong-empty">已测题目全部答对，没有需要回补的词。<br>下一阶段可保持每周 2 次阅读 + 1 次写作，向高中衔接词拓展。</div>';
      return;
    }
    var html = "";
    levels.forEach(function (lv, li) {
      var list = bad.filter(function (d) { return d.levelIndex === li; });
      if (!list.length) return;
      html += '<div class="wrong-group" style="--lv:' + lv.color + '">' +
        '<div class="wg-head"><span class="wg-name">Level ' + lv.id + " " + lv.name + "</span>" +
        '<span class="wg-count">' + list.length + " 题需回补</span></div>" +
        '<div class="wg-items">';
      list.forEach(function (d) {
        html += '<div class="wrong-item">' +
          '<span class="wi-word">' + d.w + ' <i>' + d.pos + "</i></span>" +
          '<span class="wi-meaning">' + d.meaning + "</span>" +
          '<span class="wi-state ' + (d.state === "timeout" ? "is-blank" : "is-wrong") + '">' +
          (d.state === "timeout" ? "超时未答" : "你选了 " + choiceText(d, d.choice)) + "</span>" +
          '<span class="wi-answer">正确：' + itemAnswerText(d) + "</span>" +
          "</div>";
      });
      html += "</div></div>";
    });
    els.wrongList.innerHTML = html;
  }

  function exportWrongCsv() {
    if (!scoreCache) { toast("结束测试后才能导出"); return; }
    var sc = scoreCache;
    var bad = sc.details.filter(function (d) { return d.state === "wrong" || d.state === "timeout"; });
    if (!bad.length) { toast("没有错题可导出"); return; }
    var rows = [["级别", "题号", "单词", "词性", "正确释义", "你的选择", "状态"]];
    bad.forEach(function (d) {
      var lv = levels[d.levelIndex] || { id: "", name: "" };
      rows.push([
        "Level " + lv.id + " " + lv.name, d.n, d.w, d.pos,
        itemAnswerText(d), choiceText(d, d.choice),
        d.state === "timeout" ? "超时未答" : "答错"
      ]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "词汇错题清单-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast("已导出 " + bad.length + " 题");
  }

  function renderReview(sc) {
    if (!els.reviewTables) return;
    var html = "";
    levels.forEach(function (lv, li) {
      html += '<div class="review-block" style="--lv:' + lv.color + '">' +
        '<h4>Level ' + lv.id + " " + lv.name + "（" + (li * 20 + 1) + "–" + (li * 20 + 20) + " 题）</h4>" +
        '<div class="table-wrap"><table class="table review-table"><thead><tr>' +
        "<th>#</th><th>单词</th><th>你的选择</th><th>正确答案</th><th>结果</th></tr></thead><tbody>";
      for (var i = 0; i < 20; i++) {
        var g = li * 20 + i;
        var d = sc.details[g];
        var st = statusOf(g);
        var mark = st === "correct" ? '<span class="mk ok">✓ 对</span>'
          : st === "wrong" ? '<span class="mk no">✗ 错</span>'
            : st === "timeout" ? '<span class="mk timeout">⏱ 超时</span>'
              : '<span class="mk blank">— 未测</span>';
        html += "<tr>" +
          "<td>" + d.n + "</td>" +
          "<td><b>" + d.w + "</b> <small>" + d.pos + "</small></td>" +
          "<td>" + choiceText(d, d.choice) + "</td>" +
          "<td>" + itemAnswerText(d) + "</td>" +
          "<td>" + mark + "</td>" +
          "</tr>";
      }
      html += "</tbody></table></div></div>";
    });
    els.reviewTables.innerHTML = html;
  }

  function renderLevelTable(result) {
    var tbody = els.levelTable ? els.levelTable.querySelector("tbody") : null;
    if (!tbody) return;
    var current = result ? result.highest : -1;
    tbody.innerHTML = levels.map(function (lv) {
      var highlight = current === lv.id ? ' class="is-current"' : "";
      return "<tr" + highlight + ">" +
        "<td>Level " + lv.id + "<br>" + lv.name + "</td>" +
        "<td>约 " + lv.cum + " 词</td>" +
        "<td>" + lv.book + "</td>" +
        "<td>" + lv.desc + "</td>" +
        "<td>" + lv.exam + "</td>" +
        "<td>" + lv.advice + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderRangeTable() {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    tbody.innerHTML = logic.rangeTable(data).map(function (r) {
      return '<tr data-range-label="' + escapeHtml(r.label) + '">' +
        "<td>" + r.label + "</td><td>" + r.case + "</td><td>" + r.range[0] + "–" + r.range[1] + " 词</td></tr>";
    }).join("");
  }

  function renderRangeHighlight(result) {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    $$("tr", tbody).forEach(function (tr) {
      tr.classList.toggle("is-current", tr.getAttribute("data-range-label") === result.label);
    });
  }

  function renderAnswerTables() {
    if (!els.answerTables) return;
    els.answerTables.innerHTML = levels.map(function (lv) {
      var rows = lv.words.map(function (w) {
        var ansTxt = w.ans === -1 ? "D. " + NONE_OPTION : LETTERS[w.ans] + ". " + w.opts[w.ans];
        return "<tr>" +
          "<td>" + w.n + "</td>" +
          "<td><b>" + w.w + "</b> <small>" + w.pos + "</small></td>" +
          "<td>" + w.meaning + "</td>" +
          "<td>" + ansTxt + "</td>" +
          "<td>" + (w.ans === -1 ? '<span class="tag trap">无正确含义</span>' : '<span class="tag">正常题</span>') + "</td>" +
          "</tr>";
      }).join("");
      return '<div class="answer-block" style="--lv:' + lv.color + '">' +
        "<h4><i></i>Level " + lv.id + " " + lv.name + "（20 题）</h4>" +
        '<div class="table-wrap"><table class="table answer-table"><thead><tr>' +
        "<th>#</th><th>单词</th><th>标准释义</th><th>正确答案</th><th>题型</th>" +
        "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
    }).join("");
  }

  /* ------------------------------ 复测记录 ------------------------------ */
  function renderHistory() {
    if (!els.historyTable) return;
    var tbody = els.historyTable.querySelector("tbody");
    var list = state.history.slice().sort(function (a, b) { return a.ts - b.ts; });
    if (!list.length) {
      tbody.innerHTML = '<tr class="empty"><td colspan="8">还没有保存记录。测试结束后点“保存本次记录”，即可在这里追踪变化。</td></tr>';
      if (els.historyEmpty) els.historyEmpty.hidden = true;
      return;
    }
    if (els.historyEmpty) els.historyEmpty.hidden = true;
    var prev = null;
    tbody.innerHTML = list.map(function (h, i) {
      var delta = prev == null ? "—" : (h.estimate - prev >= 0 ? "+" : "") + (h.estimate - prev) + " 词";
      prev = h.estimate;
      var when = new Date(h.ts);
      var date = when.getFullYear() + "-" + ("0" + (when.getMonth() + 1)).slice(-2) + "-" + ("0" + when.getDate()).slice(-2);
      var who = [h.name, h.cls].filter(Boolean).join(" / ") || "未填写";
      return "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + date + "</td>" +
        "<td>" + escapeHtml(who) + "</td>" +
        "<td>" + fmtTime(h.elapsed || 0) + "</td>" +
        "<td>" + h.correct + " / 100</td>" +
        "<td>" + escapeHtml(h.label) + (h.early ? "（提前结束）" : "") + "</td>" +
        "<td>约 " + h.estimate + " 词</td>" +
        "<td>" + delta + "</td>" +
        "</tr>";
    }).join("");
  }

  function saveResult() {
    if (!scoreCache) { toast("结束测试后才能保存结果"); return; }
    state.history.push({
      ts: Date.now(),
      name: state.profile.name,
      cls: state.profile.cls,
      elapsed: state.elapsed,
      correct: scoreCache.total.correct,
      label: scoreCache.result.label,
      estimate: scoreCache.result.estimate,
      early: state.earlyStop
    });
    if (state.history.length > 24) state.history = state.history.slice(-24);
    saveState();
    renderHistory();
    toast("已保存本次记录（共 " + state.history.length + " 次）");
  }

  /* ------------------------------ 复制 / 打印 ------------------------------ */
  function buildResultText() {
    if (!scoreCache) return "";
    var sc = scoreCache;
    var who = [state.profile.name, state.profile.cls].filter(Boolean).join(" / ") || "未填写";
    var lines = [
      "【初中英语词汇量快速定级测试单 · 选择题版（5 秒/题）】",
      "模式：" + (isPractice() ? "练习模式（不限时、手动下一题）" : "正式定级（5 秒/题、自动跳题）"),
      "姓名/班级：" + who,
      "答对题数：" + sc.total.correct + " / 100（已答 " + sc.total.answered + " 题，正确率 " + Math.round(sc.accuracy * 100) + "%）",
      "定级：" + sc.result.label,
      "估算词汇量：" + estimateLabel(sc.result) + "（区间 " + sc.result.rangeText + "）",
      "用时：" + fmtTime(state.elapsed),
      "正确 " + sc.total.correct + " · 错误 " + sc.total.wrong + " · 超时未答 " + sc.total.timeout + " · 未测 " + sc.total.blank,
      "“无正确含义”题答对：" + sc.trap.correct + " / " + sc.trap.total,
      "建议回补：" + sc.result.recommend
    ];
    if (state.earlyStop) lines.push("说明：连续 " + STREAK_LIMIT + " 题答错，测试提前结束（未测题按 0 分计）。");
    lines.push("生成时间：" + new Date().toLocaleString("zh-CN"));
    return lines.join("\n");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(); });
    }
    return Promise.resolve(fallback());
    function fallback() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
  }

  function fillPrintHeader() {
    if (els.pfName) els.pfName.textContent = state.profile.name || "____________";
    if (els.pfClass) els.pfClass.textContent = state.profile.cls || "____________";
    if (els.pfDate) els.pfDate.textContent = todayText();
    if (els.pfTime) els.pfTime.textContent = fmtTime(state.elapsed);
  }

  /* ------------------------------ 事件绑定 ------------------------------ */
  function bindEvents() {
    if (els.qOptions) els.qOptions.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".opt") : null;
      if (!b || b.disabled) return;
      selectChoice(Number(b.getAttribute("data-choice")));
    });
    if (els.btnStart) els.btnStart.addEventListener("click", startFresh);
    if (els.modeSwitch) els.modeSwitch.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".mode-btn") : null;
      if (b) setMode(b.getAttribute("data-mode"));
    });
    if (els.feedback) els.feedback.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("#practiceNext") : null;
      if (b) practiceNext();
    });
    if (els.btnResume) els.btnResume.addEventListener("click", resumeQuiz);
    if (els.btnRestart2) els.btnRestart2.addEventListener("click", restartQuiz);
    if (els.btnReset) els.btnReset.addEventListener("click", restartQuiz);
    if (els.btnRetake) els.btnRetake.addEventListener("click", restartQuiz);
    if (els.btnEndTest) els.btnEndTest.addEventListener("click", submitNow);
    if (els.btnFullscreen) {
      els.btnFullscreen.addEventListener("click", function () {
        if (isFullscreen()) exitFullscreen();
        else requestFullscreen();
      });
    }
    if (els.btnSaveResult) els.btnSaveResult.addEventListener("click", saveResult);
    if (els.btnCopyResult) {
      els.btnCopyResult.addEventListener("click", function () {
        var text = buildResultText();
        if (!text) { toast("结束测试后才能复制结果"); return; }
        copyText(text).then(function (ok) {
          toast(ok ? "结果已复制到剪贴板" : "复制失败，请手动选择文本");
        });
      });
    }
    if (els.btnPrint) els.btnPrint.addEventListener("click", function () { window.print(); });
    if (els.btnPrintResult) els.btnPrintResult.addEventListener("click", function () { window.print(); });
    if (els.btnExportWrong) els.btnExportWrong.addEventListener("click", exportWrongCsv);

    if (els.inpName) {
      els.inpName.addEventListener("input", function () {
        state.profile.name = els.inpName.value.slice(0, 24);
        saveState();
        fillPrintHeader();
      });
    }
    if (els.inpClass) {
      els.inpClass.addEventListener("input", function () {
        state.profile.cls = els.inpClass.value.slice(0, 24);
        saveState();
        fillPrintHeader();
      });
    }

    if (els.btnGoResult) {
      els.btnGoResult.addEventListener("click", function (e) {
        if (!state.finished) {
          e.preventDefault();
          toast("结束测试后才能查看结果");
          var t = document.getElementById("test");
          if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (state.finished || state.phase !== "testing" || !els.testStage || els.testStage.hidden) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      var k = e.key;
      if (isPractice() && state.locked && (k === "Enter" || k === " ")) { practiceNext(); e.preventDefault(); return; }
      if (k >= "1" && k <= "4") { selectChoice(Number(k) - 1); e.preventDefault(); }
      else if (k === "a" || k === "A") { selectChoice(0); e.preventDefault(); }
      else if (k === "b" || k === "B") { selectChoice(1); e.preventDefault(); }
      else if (k === "c" || k === "C") { selectChoice(2); e.preventDefault(); }
      else if (k === "d" || k === "D") { selectChoice(3); e.preventDefault(); }
    });

    document.addEventListener("fullscreenchange", syncFullscreenBtn);
    document.addEventListener("webkitfullscreenchange", syncFullscreenBtn);

    window.addEventListener("pagehide", saveState);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) saveState();
    });
  }

  /* ------------------------------ 初始化 ------------------------------ */
  function init() {
    els = {
      heroLadder: $("#heroLadder"),
      timer: $("#timer"),
      timerText: $("#timerText"),
      outTimer2: $("#outTimer2"),
      outDate: $("#outDate"),
      startPanel: $("#startPanel"),
      startTitle: $("#startTitle"),
      startSub: $("#startSub"),
      startNote: $("#startNote"),
      modeSwitch: $("#modeSwitch"),
      modeHint: $("#modeHint"),
      btnStart: $("#btnStart"),
      btnResume: $("#btnResume"),
      btnRestart2: $("#btnRestart2"),
      testStage: $("#testStage"),
      stageTimer: $("#stageTimer"),
      countdown: $("#countdown"),
      cdNum: $("#cdNum"),
      cdFg: $("#cdFg"),
      qLevel: $("#qLevel"),
      qCount: $("#qCount"),
      qLevelCount: $("#qLevelCount"),
      qWord: $("#qWord"),
      qPos: $("#qPos"),
      qOptions: $("#qOptions"),
      feedback: $("#feedback"),
      streak: $("#streak"),
      streakNum: $("#streakNum"),
      sheetMap: $("#sheetMap"),
      btnFullscreen: $("#btnFullscreen"),
      btnEndTest: $("#btnEndTest"),
      resultEmpty: $("#resultEmpty"),
      resultBody: $("#resultBody"),
      earlyBanner: $("#earlyBanner"),
      earlyReason: $("#earlyReason"),
      earlyNote: $("#earlyNote"),
      resLevel: $("#resLevel"),
      resSub: $("#resSub"),
      resBadge: $("#resBadge"),
      resEstimate: $("#resEstimate"),
      resRange: $("#resRange"),
      resCorrect: $("#resCorrect"),
      resAccuracy: $("#resAccuracy"),
      resTime: $("#resTime"),
      resTimeNote: $("#resTimeNote"),
      resRecommend: $("#resRecommend"),
      resStop: $("#resStop"),
      resMeta: $("#resMeta"),
      resAdvice: $("#resAdvice"),
      resGoal: $("#resGoal"),
      distGrid: $("#distGrid"),
      distLegend: $("#distLegend"),
      ruler: $("#ruler"),
      rulerNote: $("#rulerNote"),
      wrongList: $("#wrongList"),
      btnExportWrong: $("#btnExportWrong"),
      reviewTables: $("#reviewTables"),
      levelTable: $("#levelTable"),
      rangeTable: $("#rangeTable"),
      answerTables: $("#answerTables"),
      historyTable: $("#historyTable"),
      historyEmpty: $("#historyEmpty"),
      btnSaveResult: $("#btnSaveResult"),
      btnCopyResult: $("#btnCopyResult"),
      btnPrintResult: $("#btnPrintResult"),
      btnPrint: $("#btnPrint"),
      btnReset: $("#btnReset"),
      btnRetake: $("#btnRetake"),
      btnGoResult: $("#btnGoResult"),
      inpName: $("#inpName"),
      inpClass: $("#inpClass"),
      toast: $("#toast"),
      pfName: $("#pfName"),
      pfClass: $("#pfClass"),
      pfDate: $("#pfDate"),
      pfTime: $("#pfTime")
    };

    loadState();

    renderHeroLadder();
    renderProgressMap();
    renderAnswerTables();
    renderRangeTable();
    renderLevelTable(null);
    bindEvents();

    if (els.inpName) els.inpName.value = state.profile.name || "";
    if (els.inpClass) els.inpClass.value = state.profile.cls || "";
    if (els.outDate) els.outDate.textContent = todayText();

    if (state.finished) {
      scoreCache = logic.score(state.answers, data, state.autoPassed);
      renderResult();
      renderStartPanel();
    } else {
      if (state.startedAt) {
        state.timerId = setInterval(function () {
          state.elapsed = Date.now() - state.startedAt;
          updateTimer();
        }, 500);
      }
      renderStartPanel();
      updateTimer();
    }

    renderHistory();
    updateProgressMap();
    fillPrintHeader();
    syncFullscreenBtn();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
