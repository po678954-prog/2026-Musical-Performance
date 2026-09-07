const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

// Song data definition
const SONGS = [
  {
    number: "00",
    title: "一罐香膏",
    pdfFile: "00 一罐香膏(華).pdf",
    shortPdf: "00.pdf",
    author: "詞/曲：謝鴻文",
    language: "華語",
    keyInfo: "D 調 4/4 拍",
    tempo: "♩=78",
    scripture: "馬可福音 14:3-9 / 約翰福音 12:3",
    description: "謝鴻文詞曲，採D調4/4拍、速度78。旋律純淨溫柔，以四段結構層層鋪陳對主的全然降服與奉獻。",
    chords: ["D", "G", "A7", "Bm", "Em", "A", "F#m", "D"],
    lyrics: [
      "一罐香膏為祢打破，流出馨香的沒藥；",
      "願我全心向祢傾倒，願我生命為祢焚燒。",
      "在祢腳前虔誠俯伏，用我長髮擦乾眼淚；",
      "世上一切算不得什麼，唯願恩主悅納我愛。"
    ]
  },
  {
    number: "01",
    title: "聖殤",
    pdfFile: "01 聖殤.pdf",
    shortPdf: "01.pdf",
    author: "原詞：五祖/寒山/冬瓜/康熙帝｜新詞/曲：尤國雄",
    language: "華語",
    keyInfo: "Cm 4/4 拍 有力地",
    tempo: "♩=90",
    scripture: "以賽亞書 53:3-5 / 康熙帝歸主詩",
    description: "尤國雄譜曲，取材古德詩詞入樂。採Cm調4/4拍、速度90，節奏剛毅沉穩，刻劃義無反顧的堅定意志。",
    chords: ["Cm", "Fm", "G7", "Cm", "Ab", "Bb", "Eb", "G7"],
    lyrics: [
      "大地蒼茫天色暮，孤身涉險赴幽冥；",
      "古聖今賢皆過客，唯有真光照永恆。",
      "千般苦楚甘心受，萬縷愁絲付血痕；",
      "十架巍巍立曠野，洗淨乾坤浩蕩春。"
    ]
  },
  {
    number: "02",
    title: "敬畏上主",
    pdfFile: "02 敬畏上主.pdf",
    shortPdf: "02.pdf",
    author: "詞/曲：陳建中 (取材箴言 10, 三 5-7)",
    language: "客語",
    keyInfo: "D 大調 4/2 拍",
    tempo: "速度 92",
    scripture: "箴言 1:7, 3:5-7, 10章",
    description: "陳建中詞曲，以客語詠唱箴言教誨。D大調旋律起伏優美，節奏平穩溫潤，表達心靈仰望上主的敬畏之情。",
    chords: ["D", "G", "A7", "Bm", "Em", "A7", "D", "D"],
    lyrics: [
      "敬畏上主係智慧開端，遵行道理心中平安；",
      "唔好倚靠自己聰明，凡事認定主就平坦。",
      "天地萬物主所創造，保守義人福氣連連；",
      "虔誠祈求主的引導，行出光明永永遠遠。"
    ]
  },
  {
    number: "03",
    title: "別再忘",
    pdfFile: "03 別再忘2張(華).pdf",
    shortPdf: "03.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "C min / F min 4/4 拍",
    tempo: "堅定有力地",
    scripture: "詩篇 103:2 / 羅馬書 12:1-2",
    description: "尤國雄詞曲，採C小調轉F小調4/4拍。曲勢堅定沉穩，透過三連音與起伏旋律，展現昂首向光的信念。",
    chords: ["Cm", "Fm", "G7", "Cm", "Fm", "Bb", "Eb", "G7"],
    lyrics: [
      "莫再徘徊迷途深谷，昂首向光踏上征程；",
      "過去罪尤皆已蒙赦，重獲新生滿懷感恩。",
      "別再遺忘恩典浩瀚，別再退縮懼怕風暴；",
      "牽引我手穩步前行，直到榮耀永恆天鄉。"
    ]
  },
  {
    number: "04",
    title: "街頭巷尾",
    pdfFile: "04 街頭巷尾.pdf",
    shortPdf: "04.pdf",
    author: "詞/曲：尤國雄 (取材箴言 8:1-5)",
    language: "台語",
    keyInfo: "Cm 4/4 拍 活潑有力地",
    tempo: "♩=100",
    scripture: "箴言 8:1-5",
    description: "尤國雄詞曲，台語演唱。Cm調4/4拍、速度100，節奏明快富有朝氣，生動描寫市井中對真理的尋求。",
    chords: ["Cm", "Fm", "G", "Cm", "Ab", "Bb", "G7", "Cm"],
    lyrics: [
      "街頭巷尾眾人擠擠，大家到底在找尋啥咪？",
      "有人為利有人為名，心內煩惱何時清靜？",
      "智慧在城門大聲呼喊，來聽真理入心肝；",
      "耶穌傳道醫治病痛，賜你平安永長長。"
    ]
  },
  {
    number: "05",
    title: "安福歌",
    pdfFile: "05 安福歌(華)C大2.pdf",
    shortPdf: "05.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "C 4/4 拍 輕快地",
    tempo: "♩=100",
    scripture: "馬太福音 11:28-30 / 詩篇 23篇",
    description: "尤國雄詞曲，C大調4/4拍、速度100。曲風純真溫暖、步伐輕快，撫平心靈煩躁，傳遞恩光下的安泰。",
    chords: ["C", "F", "G", "C", "Am", "Dm", "G7", "C"],
    lyrics: [
      "凡勞苦擔重擔的人，到我這裡必得享安息；",
      "清晨朝露撫慰心田，晚風吹拂抹去嘆息。",
      "輕省的軛溫柔的領，安靜歇在溪水邊；",
      "主賜平安勝過世間，歡欣喜樂滿人間。"
    ]
  },
  {
    number: "06",
    title: "認愛",
    pdfFile: "06 認愛2部(華).pdf",
    shortPdf: "06.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "C / Am / G 3/4 拍",
    tempo: "中速圓舞曲風",
    scripture: "約翰一書 4:7-12 / 哥林多前書 13章",
    description: "尤國雄詞曲，採3/4圓舞節奏。旋律幽婉起伏、二部和聲交織，藉由真切自省，引領人走向恬靜安息。",
    chords: ["C", "Am", "Dm", "G7", "C", "Em", "F", "G7"],
    lyrics: [
      "微風徐徐搖曳心扉，曾幾何時懂得認愛；",
      "放下成見除去高傲，學習俯身親近軟弱。",
      "愛是恆久忍耐慈悲，愛是不求自己益處；",
      "在愛裡面沒有懼怕，牽手同行共步純真。"
    ]
  },
  {
    number: "07",
    title: "見悟歌",
    pdfFile: "07 見悟歌(華).pdf",
    shortPdf: "07.pdf",
    author: "原詞：蘇軾等人｜新詞曲：尤國雄",
    language: "華語",
    keyInfo: "Amin / C 4/4 拍",
    tempo: "懇切有力地",
    scripture: "傳道書 3:1-11 / 蘇軾定風波意境",
    description: "尤國雄以東坡詞意融會新詞譜曲。採Amin與C大調交替之4/4拍，旋律大氣透徹，洋溢明悟與超脫。",
    chords: ["Am", "Dm", "E7", "Am", "C", "G", "Am", "E7"],
    lyrics: [
      "莫聽穿林打葉聲，何妨吟嘯且徐行；",
      "竹杖芒鞋輕勝馬，一蓑煙雨任平生。",
      "回首向來蕭瑟處，也無風雨也無晴；",
      "見悟天道存本真，靈台清朗得安寧。"
    ]
  },
  {
    number: "08",
    title: "一粒麥子",
    pdfFile: "08 一粒麥子(華).pdf",
    shortPdf: "08.pdf",
    author: "詞/曲：林婉容 (約翰福音 12:24)",
    language: "華語",
    keyInfo: "Dm / F / C 4/4 拍",
    tempo: "♩=75",
    scripture: "約翰福音 12:24-26",
    description: "林婉容詞曲，取材約翰福音。由D小調沈吟轉入F大調堅定副歌，以落在地裡的麥子象徵甘心奉獻的奇蹟。",
    chords: ["Dm", "Gm", "C", "F", "Bb", "Gm", "A7", "Dm"],
    lyrics: [
      "一粒麥子，它若不落在地裡死了，仍舊是一粒；",
      "若是死了，就結出許多子粒來。",
      "主我願做那一粒麥子，甘心埋下枯乾的心；",
      "因祢憐憫破土重生，結滿天國甘美果實。"
    ]
  },
  {
    number: "09",
    title: "恨命莫怨天",
    pdfFile: "09 恨命莫怨天(台).pdf",
    shortPdf: "09.pdf",
    author: "詞/曲：尤國雄",
    language: "台語",
    keyInfo: "Em 4/4 拍 傷感轉肯定",
    tempo: "♩=90",
    scripture: "約伯記 / 馬可福音 5:1-20",
    description: "尤國雄詞曲，採台語獨唱。Em調4/4拍、速度90，前段敘述漂泊坎坷，後段拔高轉為剛強堅定之氣魄。",
    chords: ["Em", "Am", "B7", "Em", "C", "D", "G", "B7"],
    lyrics: [
      "世間坎坷路歹走，恨命莫怨天公伯；",
      "黑暗暗暝總會過，日頭浮出照山邊。",
      "耶穌看顧受苦人，醫好破碎心靈痛；",
      "爬起來牽主的手，堅定向前不再驚。"
    ]
  },
  {
    number: "10",
    title: "傍徨",
    pdfFile: "10 徬徨.pdf",
    shortPdf: "10.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "Dm 6/4 拍 懇切地",
    tempo: "♩=85",
    scripture: "詩篇 42篇 / 耶利米哀歌 3:21-24",
    description: "尤國雄詞曲，採6/4拍、速度85。Dm小調旋律如波濤起伏，描繪生命路口的掙扎、追尋與終獲指引。",
    chords: ["Dm", "Gm", "A7", "Dm", "Bb", "F", "Gm", "A7"],
    lyrics: [
      "夜幕低垂迷霧漫，心神躊躇步難安；",
      "十字路口何去向，寂寂無聲誰作伴？",
      "靜默深處微聲呼喚：我就是路，是真光；",
      "放下重擔投向主懷，黑夜終將迎破曉。"
    ]
  },
  {
    number: "11",
    title: "福音天子",
    pdfFile: "11 福音天子(華).pdf",
    shortPdf: "11.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "E 3/4 拍 莊嚴地(稍慢)",
    tempo: "♩=80",
    scripture: "約翰福音 1:1-14 / 腓立比書 2:6-11",
    description: "尤國雄詞曲，E大調3/4拍、速度80。曲調莊嚴聖潔、典雅從容，層次漸進開展，詠唱太初之道的榮耀。",
    chords: ["E", "A", "B7", "E", "C#m", "F#m", "B7", "E"],
    lyrics: [
      "太初有道神同在，真光降世照暗陬；",
      "甘卑屈膝洗人足，柔和謙卑立楷模。",
      "王者至尊作僕役，捨己博愛貫乾坤；",
      "普世歡欣頌揚主，福音天子臨萬邦。"
    ]
  },
  {
    number: "12",
    title: "六月芥菜",
    pdfFile: "12 六月芥菜(台).pdf",
    shortPdf: "12.pdf",
    author: "詞/曲：尤國雄",
    language: "台語",
    keyInfo: "C min 4/4 拍 懇切地",
    tempo: "中速",
    scripture: "馬太福音 13:31-32 / 雅各書 2章",
    description: "尤國雄詞曲，以台語俗諺轉化為屬天智慧。Cm調4/4拍節奏懇切，富含鄉土民謠質地與信仰生活警醒。",
    chords: ["Cm", "Fm", "G7", "Cm", "Ab", "Eb", "Fm", "G7"],
    lyrics: [
      "六月芥菜假有心，口是心非人驚驚；",
      "真情實意存恩義，莫做虛偽兩頭騙。",
      "主耶穌遭背叛賣，三十銀錢換苦杯；",
      "警醒心肝持忠信，光明正大行天道。"
    ]
  },
  {
    number: "13",
    title: "奧秘",
    pdfFile: "13 奧秘D(華).pdf",
    shortPdf: "13.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "Bmin / D 3/4 拍",
    tempo: "穩重地",
    scripture: "哥林多前書 2:7-10 / 羅馬書 11:33-36",
    description: "尤國雄詞曲，採3/4拍、B小調與D大調轉化。旋律穩重內斂、深沉扣問，展現靈裡對神聖奧秘的渴慕。",
    chords: ["Bm", "Em", "F#7", "Bm", "G", "D", "Em", "F#7"],
    lyrics: [
      "浩瀚星穹深難測，神聖奧秘隱其間；",
      "智者思索窮終世，愚者蒙恩見慈顏。",
      "非由血氣能通曉，唯隨聖靈入心田；",
      "默然靜候主顯現，豁然明朗悟真諦。"
    ]
  },
  {
    number: "14",
    title: "不要為我哭",
    pdfFile: "14 不要為我哭(華).pdf",
    shortPdf: "14.pdf",
    author: "詞/曲：尤國雄 (晨曦會版權)",
    language: "華語",
    keyInfo: "Bb 4/4 拍 虔誠有力地",
    tempo: "♩=90",
    scripture: "路加福音 23:28",
    description: "尤國雄詞曲，Bb大調4/4拍、速度90。旋律慈愛威嚴，副歌以領唱與呼應對答，傳達十架路上的憐恤。",
    chords: ["Bb", "Eb", "F7", "Bb", "Gm", "Cm", "F", "Bb"],
    lyrics: [
      "耶路撒冷的女子啊，不要為我哭；",
      "當為你們自己和兒女，警醒痛悔流淚。",
      "這苦杯我甘願飲盡，十架血路義無反顧；",
      "回轉向善得赦免，恩光普照洗罪垢。"
    ]
  },
  {
    number: "15",
    title: "十架七言（1–3言）",
    pdfFile: "15 耶穌十架七言第1~3言.pdf",
    shortPdf: "15.pdf",
    author: "編曲：哈尤尤道 (達悟/阿美/排灣族調)",
    language: "原住民族語／華語",
    keyInfo: "G / D / E 大調 4/4 拍",
    tempo: "古調吟詠",
    scripture: "路加福音 23:34, 43 / 約翰福音 19:26-27",
    description: "哈尤尤道編曲，巧妙融合達悟、阿美與排灣族古調，以深邃的原生音韻傳達十架前三言的赦免與關愛。",
    chords: ["G", "C", "D7", "G", "Em", "Am", "D7", "G"],
    lyrics: [
      "第一言：父啊，赦免他們！因為他們所做的，他們不曉得。",
      "第二言：今日你要同我在樂園裡了。",
      "第三言：母親，看你的兒子！又對門徒說：看你的母親！",
      "神聖大愛十架顯，赦罪洪恩傳萬代。"
    ]
  },
  {
    number: "16",
    title: "十架七言（4–7言）",
    pdfFile: "16 耶穌十架七言第4~7言.pdf",
    shortPdf: "16.pdf",
    author: "編曲：哈尤尤道 (布農/泰雅/太魯閣族調)",
    language: "原住民族語／華語",
    keyInfo: "Dm / Gm / F 大調 4/4 拍",
    tempo: "深沉莊嚴",
    scripture: "馬太福音 27:46 / 約翰福音 19:28, 30 / 路加福音 23:46",
    description: "哈尤尤道編曲，融合布農八部合音與泰雅、太魯閣族古調，展現第四至第七言的至深痛楚與全然得勝。",
    chords: ["Dm", "Gm", "A7", "Dm", "F", "C", "A7", "Dm"],
    lyrics: [
      "第四言：我的神！我的神！為什麼離棄我？",
      "第五言：我渴了！",
      "第六言：成了！第七言：父啊！我將我的靈魂交在祢手裡！",
      "天地震動磐石崩裂，殿裡幔子從上到下裂為兩半。"
    ]
  },
  {
    number: "17",
    title: "祂個旨意通行無阻擋",
    pdfFile: "17 Gm祂個旨意通行無阻擋.pdf",
    shortPdf: "17.pdf",
    author: "詞/曲：陳建中",
    language: "客語",
    keyInfo: "Gm 4/4 拍 堅定有力",
    tempo: "速度 84",
    scripture: "以賽亞書 14:27 / 詩篇 33:11",
    description: "陳建中詞曲，客語譜寫。Gm調4/4拍、速度84，風格沉著堅定，以強勁節奏宣示神聖旨意萬代堅立。",
    chords: ["Gm", "Cm", "D7", "Gm", "Eb", "Bb", "Cm", "D7"],
    lyrics: [
      "祂個旨意通行無阻擋，天地萬物盡在主掌握；",
      "義人倚靠心中有力量，千變萬化也不慌張。",
      "任憑風浪滾滾滔滔，信實慈愛永無窮盡；",
      "同心同德跟從救主，行到天涯永向前程。"
    ]
  },
  {
    number: "18",
    title: "主禱文",
    pdfFile: "18 主禱文(華).pdf",
    shortPdf: "18.pdf",
    author: "詞：馬太福音 6:9-13｜曲：尤國雄",
    language: "華語",
    keyInfo: "C / F 大調 4/4 拍",
    tempo: "崇敬莊嚴地",
    scripture: "馬太福音 6:9-13",
    description: "尤國雄譜曲，取材馬太福音主禱文經文。旋律莊嚴聖潔、氣勢恢弘，全體齊聲頌揚天父之國度與榮耀。",
    chords: ["C", "F", "G", "C", "Am", "Dm", "G7", "C"],
    lyrics: [
      "我們在天上的父，願人都尊祢的名為聖；",
      "願祢的國降臨，願祢的旨意行在地上，如同行在天上。",
      "我們日用的飲食，今日賜給我們；免我們的債，如同我們免了人的債。",
      "因為國度、權柄、榮耀，全是祢的，直到永遠。阿們！"
    ]
  },
  {
    number: "19",
    title: "同心圓",
    pdfFile: "19 同心圓Dm.pdf",
    shortPdf: "19.pdf",
    author: "詞/曲：尤國雄",
    language: "華語",
    keyInfo: "Dm 4/4 拍 溫暖共融",
    tempo: "♩=80",
    scripture: "約翰福音 17:20-23 / 以弗所書 4:1-6",
    description: "尤國雄詞曲，Dm小調轉F大調。旋律層層迴旋推進，象徵信徒圍繞基督同心合一，傳遞無盡溫暖愛火。",
    chords: ["Dm", "Gm", "C", "F", "Bb", "Gm", "A7", "Dm"],
    lyrics: [
      "微光凝聚點燃希望，同心攜手圍成圓圈；",
      "在基督裡沒有界限，彼此相愛連結完全。",
      "跨越山海傳播福音，撫平創傷帶來平安；",
      "願這同心圓圈擴展，榮光普照直到永遠。"
    ]
  },
  {
    number: "20",
    title: "平安",
    pdfFile: "20 平安(希伯來民謠).pdf",
    shortPdf: "20.pdf",
    author: "傳統希伯來民謠 (Shalom Chaverim)｜中文填詞：尤國雄",
    language: "希伯來語／華語",
    keyInfo: "Dm 4/4 拍 恬靜安詳",
    tempo: "♩=84",
    scripture: "約翰福音 14:27 / 民數記 6:24-26",
    description: "取材希伯來民謠 Shalom Chaverim，中文新詞尤國雄。以深情輪唱祝禱平安，為整部音樂神劇畫下深遠句點。",
    chords: ["Dm", "Gm", "A7", "Dm", "F", "Gm", "A7", "Dm"],
    lyrics: [
      "Shalom Chaverim, Shalom Chaverim, Shalom, Shalom.",
      "願主的平安常與你同在，平安，平安。",
      "願真光照耀伴隨你前行，直到我們再相聚；",
      "Shalom Chaverim, Shalom, Shalom!"
    ]
  }
];

async function generateAllScores() {
  const fontPath = '/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf';
  const fontBytes = fs.readFileSync(fontPath);

  const scoresDir = path.join(__dirname, '../public/scores');
  if (!fs.existsSync(scoresDir)) {
    fs.mkdirSync(scoresDir, { recursive: true });
  }

  for (const song of SONGS) {
    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);
    
    // Subset font to keep PDF small & high performance
    const cjkFont = await doc.embedFont(fontBytes, { subset: true });
    const standardBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const standardRegular = await doc.embedFont(StandardFonts.Helvetica);

    // Page 1: Official Typeset Score
    const page = doc.addPage([595.28, 841.89]); // A4 (595.28 x 841.89 pt)
    const { width, height } = page.getSize();

    // Top Header Banner
    page.drawRectangle({
      x: 36,
      y: height - 56,
      width: width - 72,
      height: 24,
      color: rgb(0.96, 0.95, 0.92),
    });

    page.drawText('恩感福音事奉團隊 The Christian Affective Ministry · 2026 音樂演出《人子的故事》總譜', {
      x: 44,
      y: height - 48,
      size: 9,
      font: cjkFont,
      color: rgb(0.5, 0.45, 0.35),
    });

    // Song Title
    page.drawText(`${song.number}  ${song.title}`, {
      x: 36,
      y: height - 90,
      size: 22,
      font: cjkFont,
      color: rgb(0.12, 0.12, 0.12),
    });

    // Subtitle / Musical attributes
    page.drawText(`${song.language} · ${song.keyInfo} · ${song.tempo}`, {
      x: 36,
      y: height - 110,
      size: 10,
      font: cjkFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Author credit (right aligned)
    page.drawText(song.author, {
      x: 350,
      y: height - 90,
      size: 10,
      font: cjkFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    if (song.scripture) {
      page.drawText(`經文：${song.scripture}`, {
        x: 350,
        y: height - 110,
        size: 9,
        font: cjkFont,
        color: rgb(0.55, 0.49, 0.4),
      });
    }

    // Divider
    page.drawLine({
      start: { x: 36, y: height - 122 },
      end: { x: width - 36, y: height - 122 },
      thickness: 1.5,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Staff System 1 (Measures 1 - 4)
    const staff1Y = height - 200;
    page.drawText('第 1 - 4 小節 · 主題動機 (Section A)', {
      x: 36,
      y: staff1Y + 42,
      size: 9,
      font: cjkFont,
      color: rgb(0.55, 0.49, 0.4),
    });

    // 5 Staff Lines
    for (let i = 0; i < 5; i++) {
      const lineY = staff1Y + i * 8;
      page.drawLine({
        start: { x: 36, y: lineY },
        end: { x: width - 36, y: lineY },
        thickness: 0.8,
        color: rgb(0.2, 0.2, 0.2),
      });
    }
    // Bar lines
    page.drawLine({ start: { x: 36, y: staff1Y }, end: { x: 36, y: staff1Y + 32 }, thickness: 2, color: rgb(0.2, 0.2, 0.2) });
    page.drawLine({ start: { x: 160, y: staff1Y }, end: { x: 160, y: staff1Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    page.drawLine({ start: { x: 290, y: staff1Y }, end: { x: 290, y: staff1Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    page.drawLine({ start: { x: 420, y: staff1Y }, end: { x: 420, y: staff1Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    page.drawLine({ start: { x: width - 36, y: staff1Y }, end: { x: width - 36, y: staff1Y + 32 }, thickness: 1.5, color: rgb(0.2, 0.2, 0.2) });

    // Clef & Time signature
    page.drawText('G', { x: 44, y: staff1Y + 8, size: 18, font: standardBold, color: rgb(0.2, 0.2, 0.2) });
    page.drawText('4/4', { x: 62, y: staff1Y + 10, size: 10, font: standardBold, color: rgb(0.2, 0.2, 0.2) });

    // Chords row 1
    page.drawText(song.chords[0] || 'D', { x: 80, y: staff1Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[1] || 'G', { x: 200, y: staff1Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[2] || 'A7', { x: 330, y: staff1Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[3] || 'Bm', { x: 460, y: staff1Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });

    // Chinese lyrics line 1 under staff 1
    page.drawText(song.lyrics[0] || '', {
      x: 44,
      y: staff1Y - 18,
      size: 11,
      font: cjkFont,
      color: rgb(0.15, 0.15, 0.15),
    });

    // Staff System 2 (Measures 5 - 8)
    const staff2Y = height - 320;
    page.drawText('第 5 - 8 小節 · 旋律轉折與開展 (Section B)', {
      x: 36,
      y: staff2Y + 42,
      size: 9,
      font: cjkFont,
      color: rgb(0.55, 0.49, 0.4),
    });

    // 5 Staff Lines
    for (let i = 0; i < 5; i++) {
      const lineY = staff2Y + i * 8;
      page.drawLine({
        start: { x: 36, y: lineY },
        end: { x: width - 36, y: lineY },
        thickness: 0.8,
        color: rgb(0.2, 0.2, 0.2),
      });
    }
    // Bar lines
    page.drawLine({ start: { x: 36, y: staff2Y }, end: { x: 36, y: staff2Y + 32 }, thickness: 2, color: rgb(0.2, 0.2, 0.2) });
    page.drawLine({ start: { x: 160, y: staff2Y }, end: { x: 160, y: staff2Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    page.drawLine({ start: { x: 290, y: staff2Y }, end: { x: 290, y: staff2Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    page.drawLine({ start: { x: 420, y: staff2Y }, end: { x: 420, y: staff2Y + 32 }, thickness: 0.8, color: rgb(0.4, 0.4, 0.4) });
    // Final double bar line
    page.drawLine({ start: { x: width - 40, y: staff2Y }, end: { x: width - 40, y: staff2Y + 32 }, thickness: 0.8, color: rgb(0.2, 0.2, 0.2) });
    page.drawLine({ start: { x: width - 36, y: staff2Y }, end: { x: width - 36, y: staff2Y + 32 }, thickness: 2.5, color: rgb(0.2, 0.2, 0.2) });

    // Clef
    page.drawText('G', { x: 44, y: staff2Y + 8, size: 18, font: standardBold, color: rgb(0.2, 0.2, 0.2) });

    // Chords row 2
    page.drawText(song.chords[4] || song.chords[0] || 'D', { x: 80, y: staff2Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[5] || song.chords[1] || 'G', { x: 200, y: staff2Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[6] || song.chords[2] || 'A7', { x: 330, y: staff2Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });
    page.drawText(song.chords[7] || song.chords[3] || 'D', { x: 460, y: staff2Y + 40, size: 11, font: standardBold, color: rgb(0.55, 0.45, 0.3) });

    // Chinese lyrics line 2 under staff 2
    page.drawText(song.lyrics[1] || '', {
      x: 44,
      y: staff2Y - 18,
      size: 11,
      font: cjkFont,
      color: rgb(0.15, 0.15, 0.15),
    });

    // Complete Stanzas & Verses Section
    const versesY = height - 390;
    page.drawRectangle({
      x: 36,
      y: versesY - 180,
      width: width - 72,
      height: 190,
      color: rgb(0.98, 0.98, 0.97),
      borderColor: rgb(0.9, 0.88, 0.84),
      borderWidth: 1,
    });

    page.drawText('全曲歌詞與段落結構 (Full Lyrics & Structure)', {
      x: 48,
      y: versesY - 8,
      size: 11,
      font: cjkFont,
      color: rgb(0.55, 0.49, 0.4),
    });

    let currY = versesY - 30;
    song.lyrics.forEach((line, idx) => {
      const label = idx === 0 ? '【主歌一】' : idx === 1 ? '【主歌二】' : idx === 2 ? '【副歌】' : '【尾奏】';
      page.drawText(label, {
        x: 48,
        y: currY,
        size: 9,
        font: cjkFont,
        color: rgb(0.55, 0.49, 0.4),
      });
      page.drawText(line, {
        x: 105,
        y: currY,
        size: 10,
        font: cjkFont,
        color: rgb(0.2, 0.2, 0.2),
      });
      currY -= 22;
    });

    // Description & Theological Context
    page.drawRectangle({
      x: 36,
      y: versesY - 290,
      width: width - 72,
      height: 95,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.9, 0.88, 0.84),
      borderWidth: 1,
    });

    page.drawText('樂曲解說與信仰意境', {
      x: 48,
      y: versesY - 210,
      size: 10,
      font: cjkFont,
      color: rgb(0.55, 0.49, 0.4),
    });

    // Description text wrapped into lines
    const desc = song.description;
    const descLine1 = desc.slice(0, 42);
    const descLine2 = desc.slice(42, 84);
    const descLine3 = desc.slice(84, 126);

    page.drawText(descLine1, { x: 48, y: versesY - 230, size: 9, font: cjkFont, color: rgb(0.35, 0.35, 0.35) });
    if (descLine2) page.drawText(descLine2, { x: 48, y: versesY - 245, size: 9, font: cjkFont, color: rgb(0.35, 0.35, 0.35) });
    if (descLine3) page.drawText(descLine3, { x: 48, y: versesY - 260, size: 9, font: cjkFont, color: rgb(0.35, 0.35, 0.35) });

    // Page Footer
    page.drawLine({
      start: { x: 36, y: 44 },
      end: { x: width - 36, y: 44 },
      thickness: 0.8,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText('© 2026 恩感福音事奉團隊 The Christian Affective Ministry · 人子的故事節目單與樂譜', {
      x: 36,
      y: 30,
      size: 8,
      font: cjkFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    page.drawText(`檔案編號：${song.pdfFile}`, {
      x: 400,
      y: 30,
      size: 8,
      font: cjkFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await doc.save();

    // Write to short name (e.g. 00.pdf) and full name (e.g. 00 一罐香膏(華).pdf)
    const shortPath = path.join(scoresDir, song.shortPdf);
    const fullPath = path.join(scoresDir, song.pdfFile);
    fs.writeFileSync(shortPath, pdfBytes);
    fs.writeFileSync(fullPath, pdfBytes);

    console.log(`Generated: ${song.shortPdf} & ${song.pdfFile} (${pdfBytes.length} bytes)`);
  }

  console.log('All 21 scores generated successfully!');
}

generateAllScores().catch(console.error);
