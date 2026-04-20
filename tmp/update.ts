import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add definitions
const importsReplacement = `import { BookOpen, ArrowRight, Book, Info, Globe } from 'lucide-react';\nimport { t, Lang } from './translations';`;
content = content.replace(`import { BookOpen, ArrowRight, Book, Info } from 'lucide-react';`, importsReplacement);

const stateReplacement = `const [lang, setLang] = useState<Lang>('zh');\n  const [step, setStep] = useState<Step>('welcome');`;
content = content.replace(`const [step, setStep] = useState<Step>('welcome');`, stateReplacement);

// 2. Add handlers and dict
const handlerReplacement = `
  const handleToggleLang = () => {
    setLang(l => l === 'zh' ? 'en' : 'zh');
    // If not on welcome screen, we could reset forms, but let's just let it be.
  };

  const d = t[lang];

  const handleNext = (nextStep: Step) => {
`;
content = content.replace(`  const handleNext = (nextStep: Step) => {`, handlerReplacement);

// Arrays and static strings update
content = content.replace(
  /const q3Presets \= \[\s+([^\]]+)\s+\];/m,
  `const q3Presets = [
    "Subject Guides (Dance, Drama, Chinese Opera, F/TV, Music, TEA)",
    "How to use Primo@Lib (Basic & Advanced Search)",
    "Seminar Room & Solo Pod Booking System",
    "Embedding Video Resources in Canvas",
    "How to download eBooks?",
    "Keyword Search Techniques",
    "Academic Writing",
    "Performing Arts Research",
    "Using Turnitin with Canvas 在Canvas平台上使用Turnitin",
    "AI Literacy",
    "Open Educational Resources (OER)",
    "Scholarship Application",
    d.noneSeen
  ];`
);

content = content.replace(
  `body: JSON.stringify({ identity, discipline, motivation: finalMotivation, expectation: finalExpectation, futureTopic }),`,
  `body: JSON.stringify({ identity, discipline, motivation: finalMotivation, expectation: finalExpectation, futureTopic, lang }),`
);

content = content.replace(`title: "靜心等待",`, `title: d.fallbackTitle,`);
content = content.replace(`interpretation: "書頁暫時無法翻開，請稍後再試。答案總會在適當的時候出現。",`, `interpretation: d.fallbackInterpretation,`);
content = content.replace(`guidance: "建議前往「一般指南：搜尋目錄操作」尋找線索。"`, `guidance: d.fallbackGuidance`);

// Translate template content
// Toggle button inject
content = content.replace(
  `<AnimatePresence mode="wait">`,
  `<button 
        onClick={handleToggleLang}
        className="absolute top-6 right-6 z-50 flex items-center justify-center gap-2 px-4 py-2 bg-black/40 border border-ink/30 text-ink/80 hover:text-ink hover:bg-ink/10 rounded-full transition-all text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        {lang === 'zh' ? 'EN' : '中'}
      </button>
      <AnimatePresence mode="wait">`
);

content = content.replace(`圖書館解答之書`, `{d.title}`);
content = content.replace(`翻開書頁，尋找你的指引`, `{d.subtitle}`);
content = content.replace(`你是否正在尋找一個答案？`, `{d.q1}`);
content = content.replace(`在心中默念你的問題，然後翻開這本書。`, `{d.q2}`);
content = content.replace(`內心設想一個問題，必須是「<strong className="text-ink font-medium">封閉式問題</strong>」。<br/><br/>例如：「我現在應徵的工作適合我嗎？」「這週末該出去旅遊嗎？」等`, 
  `{d.tooltipText1}<strong className="text-ink font-medium">{d.tooltipHighlight}</strong>{d.tooltipText2}`);
content = content.replace(`在這之前，請先回答幾個簡單問題。`, `{d.prelude}`);
content = content.replace(`翻開解答之書`, `{d.startBtn}`);

content = content.replaceAll(`Page I`, `{d.page1Label}`);
content = content.replace(`第一頁：你的身份是？`, `{d.page1Title}`);
content = content.replace(`{['本科生', '研究生', '教學職員', '行政職員'].map((item) => (`, `{d.identities.map((item) => (`);

content = content.replaceAll(`Page II`, `{d.page2Label}`);
content = content.replace(`第二頁：你屬於哪個學科？`, `{d.page2Title}`);
content = content.replace(`選擇你的學科...`, `{d.disciplinePlaceholder}`);
content = content.replace(`{['戲劇', '舞蹈', '中國戲曲', '電影電視', '音樂', '舞台及製作藝術', 'GE&R', '其他'].map((item) => (`, `{d.disciplines.map((item) => (`);

content = content.replaceAll(`Page III`, `{d.page3Label}`);
content = content.replace(`第三頁：你有看過以下哪些圖書館指南? (可多選)`, `{d.page3Title}`);
content = content.replace(/motivation\.includes\("沒有看過圖書館指南"\)/g, `motivation.includes(d.noneSeen)`);
content = content.replace(/preset === "沒有看過圖書館指南"/g, `preset === d.noneSeen`);
content = content.replace(/p !== "沒有看過圖書館指南"/g, `p !== d.noneSeen`);

content = content.replaceAll(`Page IV`, `{d.page4Label}`);
content = content.replace(`第四頁：你覺得以下哪些圖書館指南有用? (可多選)`, `{d.page4Title}`);

content = content.replaceAll(`Page V`, `{d.page5Label}`);
content = content.replace(`第五頁：你有沒有什麼想看到的圖書館指南題目? (選填)`, `{d.page5Title}`);
content = content.replace(`請輸入你的想法...`, `{d.futureTopicPlaceholder}`);

content = content.replaceAll(`其他...`, `{d.otherPlaceholder}`);
content = content.replaceAll(`>上一頁<`, `>{d.prevBtn}<`);
content = content.replaceAll(`下一頁 <ArrowRight`, `{d.nextBtn} <ArrowRight`);
content = content.replaceAll(`獲取解答 <Book`, `{d.submitBtn} <Book`);

content = content.replaceAll(`請在心中默念你的問題`, `{d.countdownTitle}`);
content = content.replace(/翻閱中\.\.\.<\/p>/, `{d.flipping}</p>`);

content = content.replace(`圖書館指南推薦`, `{d.resultTitle}`);
content = content.replace(`* 解答之書僅供娛樂，真正的智慧存於你的心中。`, `{d.disclaimer}`);
content = content.replace(`再問一次 `, `{d.playAgainBtn} `);

// Also update the 'd' variable prefix logic for preset in App.tsx
// wait, the "沒有看過圖書館指南" literal appeared in q3Presets logic.
// `currentDict.noneSeen` is what I used `d.noneSeen`.

fs.writeFileSync('src/App.tsx', content);
