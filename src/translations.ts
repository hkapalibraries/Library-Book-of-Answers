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
    identities: ['本科生', '研究生', '教學職員', '行政職員'],
    
    page2Label: "Page II",
    page2Title: "第二頁：你屬於哪個學科？",
    disciplines: ['戲劇', '舞蹈', '中國戲曲', '電影電視', '音樂', '舞台及製作藝術', 'GE&R', '其他'],
    disciplinePlaceholder: "選擇你的學科...",

    page3Label: "Page III",
    page3Title: "第三頁：你有看過以下哪些圖書館指南? (可多選)",
    noneSeen: "沒有看過圖書館指南",

    page4Label: "Page IV",
    page4Title: "第四頁：你覺得以下哪些圖書館指南有用? (可多選)",

    page5Label: "Page V",
    page5Title: "第五頁：你有沒有什麼想看到的圖書館指南題目? (選填)",
    futureTopicPlaceholder: "請輸入你的想法...",

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
    page2Title: "Page II: Which discipline do you belong to?",
    disciplines: ['Drama', 'Dance', 'Chinese Opera', 'Film and Television', 'Music', 'Theatre and Entertainment Arts', 'GE&R', 'Other'],
    disciplinePlaceholder: "Select your discipline...",

    page3Label: "Page III",
    page3Title: "Page III: Which library guides have you seen? (Multiple choice)",
    noneSeen: "Have not seen any library guides",

    page4Label: "Page IV",
    page4Title: "Page IV: Which library guides do you think are useful? (Multiple choice)",

    page5Label: "Page V",
    page5Title: "Page V: Are there any library guide topics you'd like to see? (Optional)",
    futureTopicPlaceholder: "Please enter your thoughts...",

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
