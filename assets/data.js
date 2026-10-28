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
  "subtitle": "人教版《英语》（新课纲版）· 成都适用 · 初二 / 初三",
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
