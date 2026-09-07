export interface ProgramItem {
  number: string;
  title: string;
  meta: string;
  actLabel?: string;
  actName?: string;
  isSpecial?: boolean;
}

export interface ProgramSection {
  title: string;
  items: ProgramItem[];
}

export const PROGRAM_INFO = {
  year: "2026",
  date: "9.15",
  time: "19:00",
  venue: "台中中山堂",
  address: "臺中市北區學士路98號",
  dramaTitle: "人子的故事",
  subtitle: "承擔與受難",
  descriptor: "一場融合戲劇、詠唱與原住民族音樂的生命演出",
  introQuote: "祂一生受難的經歷，兩千多年過去了，十字架的奉獻，依舊是人們心目中，百述不厭的千古流傳！",
  organizer: "恩感福音事奉團隊",
  association: "恩感福音事奉團隊 The Christian Affective Ministry",
  coOrganizers: ["晨曦會", "沐恩之家", "盧縣一委員/原住民族委員會"]
};

// Left page contents for desktop spread (Act 1 ~ 5)
export const PROGRAM_LEFT_ITEMS: ProgramItem[] = [
  {
    number: "00",
    title: "一罐香膏",
    meta: "(台) 牧者祝唱",
    actLabel: "序幕",
    actName: "牧者代表 致歡迎詞"
  },
  {
    number: "01",
    title: "聖殤",
    meta: "(華) 獨唱",
    actLabel: "第一幕",
    actName: "耶穌群眾引騷動"
  },
  {
    number: "02",
    title: "敬畏上主",
    meta: "(客)"
  },
  {
    number: "03",
    title: "別再忘",
    meta: "(華)",
    actLabel: "第二幕",
    actName: "耶穌生命入危"
  },
  {
    number: "04",
    title: "街頭巷尾",
    meta: "(台)"
  },
  {
    number: "05",
    title: "安福歌",
    meta: "(華)",
    actLabel: "第三幕",
    actName: "耶穌受試全得勝"
  },
  {
    number: "06",
    title: "認愛",
    meta: "(華)"
  },
  {
    number: "07",
    title: "見悟歌",
    meta: "(華)",
    actLabel: "第四幕",
    actName: "耶穌教導蒙福路"
  },
  {
    number: "08",
    title: "一粒麥子",
    meta: "(華)",
    actLabel: "第五幕",
    actName: "耶穌被疑受挑戰"
  }
];

// Right page contents for desktop spread (Act 6 ~ 15 and finale)
export const PROGRAM_RIGHT_ITEMS: ProgramItem[] = [
  {
    number: "09",
    title: "恨命莫怨天",
    meta: "(台) 獨唱",
    actLabel: "第六幕",
    actName: "耶穌止瘋醫病人"
  },
  {
    number: "10",
    title: "傍徨",
    meta: "(華)",
    actLabel: "第七幕",
    actName: "耶穌趕鬼復活人"
  },
  {
    number: "--",
    title: "中場休息",
    meta: "Intermission",
    isSpecial: true
  },
  {
    number: "11",
    title: "福音天子",
    meta: "(華)",
    actLabel: "第八幕",
    actName: "耶穌謙愛洗人腳"
  },
  {
    number: "12",
    title: "六月芥菜",
    meta: "(台)",
    actLabel: "第九幕",
    actName: "耶穌被賣遭人逮"
  },
  {
    number: "13",
    title: "奧秘",
    meta: "(華) 獨唱"
  },
  {
    number: "14",
    title: "不要為我哭",
    meta: "(華)",
    actLabel: "第十/十一幕",
    actName: "耶穌遭陷受審被誣告"
  },
  {
    number: "15",
    title: "十架七言（1–3言）",
    meta: "原住民族曲調",
    actLabel: "第十二幕",
    actName: "耶穌受鞭背十字架"
  },
  {
    number: "16",
    title: "十架七言（4–7言）",
    meta: "原住民族曲調",
    actLabel: "第十三幕",
    actName: "耶穌罪犯同被釘"
  },
  {
    number: "17",
    title: "祂的旨意無攔阻",
    meta: "(客)"
  },
  {
    number: "18",
    title: "主禱文",
    meta: "(華)",
    actLabel: "第十四/十五幕",
    actName: "耶穌受死埋葬與復活會門徒"
  },
  {
    number: "19",
    title: "同心園",
    meta: "(華)",
    actLabel: "尾聲",
    actName: "同心前行"
  },
  {
    number: "20",
    title: "平安",
    meta: "(希伯來民謠)",
    actLabel: "全劇終",
    actName: "喜樂謝幕"
  }
];
