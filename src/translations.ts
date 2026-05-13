export type Lang = 'zh' | 'en';

export const t = {
  zh: {
    title: "圖書館的「解答之書」",
    subtitle: "翻開書頁，尋找你的指引",
    q1: "你是否正在尋找一個答案？",
    q2: "在心中默念你的問題，然後翻開這本書。",
    tooltipText1: "內心設想一個問題，必須是「",
    tooltipHighlight: "封閉式問題",
    tooltipText2: "」。\n\n例如：「我現在應徵的工作適合我嗎？」「這週末該出去旅遊嗎？」等",
    prelude: "在這之前，請先回答幾個簡單問題。",
    startBtn: "翻開解答之書",
    
    page1Label: "Page I",
    page1Title: "第一頁：你的身份是？",
    identities: ['本科生', '研究生', '教學職員', '非教學職員'],
    
    page2Label: "Page II",
    page2Title: "第二頁：你屬於哪個學院 / 部門？",
    disciplines: ['戲劇', '舞蹈', '中國戲曲', '電影電視', '音樂', '舞台及製作藝術', 'GE&R', '其他'],
    disciplinePlaceholder: "選擇你的學院 / 部門...",

    page3Label: "Page III",
    page3Title: "第三頁：你使用過哪一種類型的圖書館指南？(可多選)",
    noneSeen: "沒有使用過圖書館指南",
    q3Options: [
      { id: "General Guides", label: "圖書館使用指南", icon: "library", desc: "e.g. Seminar Room & Solo Pod Booking System, Wi-Fi Printing in the Library, How to use Primo@Lib (Basic & Advanced Search), etc." },
      { id: "Subject Guides", label: "學科指南", icon: "book", desc: "Chinese Opera / Dance / Drama / Film & TV / Music / TEA Guides" },
      { id: "Research Guides", label: "學術研究指南", icon: "microscope", desc: "e.g. Academic Writing, Keyword Search Techniques, Performing Arts Research, Using Turnitin with Canvas 在Canvas平台上使用Turnitin, etc." },
      { id: "Topic Guides", label: "主題指南", icon: "compass", desc: "e.g. AI Literacy, Open Educational Resources (OER), Scholarship Application, etc." },
      { id: "None", label: "沒有使用過圖書館指南", icon: "xcircle", desc: "" }
    ],

    page4Label: "Page IV",
    page4Title: "第四頁：你覺得這些指南對你有幫助嗎？",
    q4Options: [
      { id: "Very Helpful", label: "非常有幫助", icon: "thumbsup" },
      { id: "Somewhat Helpful", label: "有一點幫助", icon: "smile" },
      { id: "Not Really", label: "沒有太大幫助", icon: "meh" }
    ],

    page5Label: "Page V",
    page5Title: "第五頁：你有沒有什麼想看到的圖書館指南題目? (非必答)",
    q5Presets: [
      "快速搜尋技巧",
      "特定軟件教學",
      "論文寫作與引用",
      "尋找多媒體資源"
    ],
    futureTopicPlaceholder: "請輸入你的想法或選擇上方標籤...",

    otherPlaceholder: "其他...",

    prevBtn: "上一頁",
    nextBtn: "下一頁",
    submitBtn: "獲取解答",

    countdownTitle: "請在心中默念你的問題",
    flipping: "翻閱中...",

    resultTitle: "圖書館指南推薦",
    disclaimer: "* 解答之書僅供娛樂，真正的智慧存於你的心中。",
    playAgainBtn: "再問一次",
    fallbackNotice: "此為預設隨機解答，非 AI 生成。",

    fallbackTitle: "靜心等待",
    fallbackInterpretation: "書頁暫時無法翻開，請稍後再試。答案總會在適當的時候出現。",
    fallbackGuidance: "建議前往「一般指南：搜尋目錄操作」尋找線索。"
  },
  en: {
    title: "The Library's \"Book of Answers\"",
    subtitle: "Open the pages, find your guide",
    q1: "Are you looking for an answer?",
    q2: "Silently recite your question, then open this book.",
    tooltipText1: "Think of a question in your mind, it must be a '",
    tooltipHighlight: "closed-ended question",
    tooltipText2: "'.\n\nFor example: 'Is the job I am applying for suitable for me?' or 'Should I go traveling this weekend?'",
    prelude: "Before that, please answer a few simple questions.",
    startBtn: "Open the Book of Answers",
    
    page1Label: "Page I",
    page1Title: "Page I: What is your identity?",
    identities: ['Undergraduate', 'Postgraduate', 'Academic Staff', 'Non-Academic Staff'],
    
    page2Label: "Page II",
    page2Title: "Page II: Which School / Department do you belong to?",
    disciplines: ['Drama', 'Dance', 'Chinese Opera', 'Film and Television', 'Music', 'Theatre and Entertainment Arts', 'GE&R', 'Other'],
    disciplinePlaceholder: "Select your School / Department...",

    page3Label: "Page III",
    page3Title: "Page III: What type of library guides have you used? (Multiple choice)",
    noneSeen: "Have not used any library guides",
    q3Options: [
      { id: "General Guides", label: "General Guides", icon: "library", desc: "e.g. Seminar Room & Solo Pod Booking System, Wi-Fi Printing in the Library, How to use Primo@Lib (Basic & Advanced Search), etc." },
      { id: "Subject Guides", label: "Subject Guides", icon: "book", desc: "Chinese Opera / Dance / Drama / Film & TV / Music / TEA Guides" },
      { id: "Research Guides", label: "Research Guides", icon: "microscope", desc: "e.g. Academic Writing, Keyword Search Techniques, Performing Arts Research, Using Turnitin with Canvas 在Canvas平台上使用Turnitin, etc." },
      { id: "Topic Guides", label: "Topic Guides", icon: "compass", desc: "e.g. AI Literacy, Open Educational Resources (OER), Scholarship Application, etc." },
      { id: "None", label: "Have not used any library guides", icon: "xcircle", desc: "" }
    ],

    page4Label: "Page IV",
    page4Title: "Page IV: Did you find them helpful?",
    q4Options: [
      { id: "Very Helpful", label: "Yes, very helpful", icon: "thumbsup" },
      { id: "Somewhat Helpful", label: "Somewhat helpful", icon: "smile" },
      { id: "Not Really", label: "Not really", icon: "meh" }
    ],

    page5Label: "Page V",
    page5Title: "Page V: What library guide topics would you like to see? (Optional)",
    q5Presets: [
      "Quick Search Tips",
      "Specific software tutorials",
      "Writing & Citations",
      "Finding Multimedia Resources"
    ],
    futureTopicPlaceholder: "Please enter your thoughts or select tags above...",

    otherPlaceholder: "Other...",

    prevBtn: "Previous",
    nextBtn: "Next",
    submitBtn: "Get Answer",

    countdownTitle: "Silently recite your question",
    flipping: "Flipping...",

    resultTitle: "Recommended Library Guide",
    disclaimer: "* The Book of Answers is for entertainment purposes only, true wisdom lies within you.",
    playAgainBtn: "Ask Again",
    fallbackNotice: "This is a random predefined answer, not AI generated.",

    fallbackTitle: "Please Wait",
    fallbackInterpretation: "The pages cannot be opened right now, please try again later. The answer will appear at the right time.",
    fallbackGuidance: "Suggested to visit 'General Guide: Catalogue Search' for clues."
  }
};
