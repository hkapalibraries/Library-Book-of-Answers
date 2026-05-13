import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Book, Info, Globe, Library, Microscope, Compass, XCircle, ThumbsUp, Smile, Meh } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { t, Lang } from './translations';

type Step = 'welcome' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'countdown' | 'result';

interface DivinationResult {
  title: string;
  interpretation: string;
  guidance: string;
  guideUrl?: string;
  isAI?: boolean;
}

const VintageFrame = () => {
  const CornerSVG = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={`absolute text-[#e4b95f]/90 w-[100px] h-[100px] drop-shadow-[0_0_8px_rgba(228,185,95,0.4)] ${className}`} style={style} fill="none" stroke="currentColor">
      <path d="M 100 1 L 40 1 C 18 1 1 18 1 40 L 1 100" strokeWidth="1.5" />
      <path d="M 94 6 L 46 6 C 24 6 6 24 6 46 L 6 94" strokeWidth="1" opacity="0.7" />
      <path d="M 40 1 C 40 30 15 40 15 55 C 15 65 25 72 32 65 C 38 58 32 52 26 55" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 1 40 C 30 40 40 15 55 15 C 65 15 72 25 65 32 C 58 38 52 32 55 26" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 30 30 C 15 15 15 35 25 45 C 35 55 42 50 38 45 C 34 40 30 45 32 48" strokeWidth="1" />
      <path d="M 30 30 C 45 15 35 15 45 25 C 55 35 50 42 45 38 C 40 34 45 30 48 32" strokeWidth="1" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
      <circle cx="50" cy="50" r="1.5" fill="currentColor" opacity="0.9" />
      <circle cx="65" cy="65" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  );

  return (
    <div className="absolute inset-4 sm:inset-6 md:inset-8 pointer-events-none z-0">
      <div className="absolute top-[1px] left-[99px] right-[99px] h-[1.5px] bg-[#e4b95f]/70 shadow-[0_0_8px_rgba(228,185,95,0.4)]" />
      <div className="absolute bottom-[1px] left-[99px] right-[99px] h-[1.5px] bg-[#e4b95f]/70 shadow-[0_0_8px_rgba(228,185,95,0.4)]" />
      <div className="absolute left-[1px] top-[99px] bottom-[99px] w-[1.5px] bg-[#e4b95f]/70 shadow-[0_0_8px_rgba(228,185,95,0.4)]" />
      <div className="absolute right-[1px] top-[99px] bottom-[99px] w-[1.5px] bg-[#e4b95f]/70 shadow-[0_0_8px_rgba(228,185,95,0.4)]" />

      <div className="absolute top-[6px] left-[93px] right-[93px] h-[1px] bg-[#e4b95f]/40" />
      <div className="absolute bottom-[6px] left-[93px] right-[93px] h-[1px] bg-[#e4b95f]/40" />
      <div className="absolute left-[6px] top-[93px] bottom-[93px] w-[1px] bg-[#e4b95f]/40" />
      <div className="absolute right-[6px] top-[93px] bottom-[93px] w-[1px] bg-[#e4b95f]/40" />

      <CornerSVG className="top-0 left-0" />
      <CornerSVG className="top-0 right-0" style={{ transform: 'scaleX(-1)' }} />
      <CornerSVG className="bottom-0 left-0" style={{ transform: 'scaleY(-1)' }} />
      <CornerSVG className="bottom-0 right-0" style={{ transform: 'scale(-1, -1)' }} />
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const [step, setStep] = useState<Step>('welcome');
  const [identity, setIdentity] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [motivation, setMotivation] = useState<string[]>([]);
  const [expectation, setExpectation] = useState<string[]>([]);
  const [futureTopic, setFutureTopic] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeOptionInfo, setActiveOptionInfo] = useState<string | null>(null);

  const d = t[lang];

  const handleNext = (nextStep: Step) => {
    setStep(nextStep);
  };

  const handleSubmit = async (isRepeat: boolean = false) => {
    const repeat = isRepeat === true;
    setStep('countdown');
    setCountdown(5);

    const timerPromise = new Promise(resolve => {
      let count = 5;
      const interval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });

    try {
      const finalMotivation = motivation.map(id => d.q3Options.find(o => o.id === id)?.label || id).join(';');
      const finalExpectation = expectation.map(id => d.q4Options.find(o => o.id === id)?.label || id).join(';');

      const submitToGoogleFormLocal = async (divinationResult: string) => {
        try {
          const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeUXZuS_1Mwd3UwKoBZmzrOX0tywa8opqM-mLcmVSmIxXywEQ/formResponse';
          const formData = new URLSearchParams();
          if (!repeat && identity) formData.append('entry.124506886', identity);
          if (!repeat && discipline) formData.append('entry.1652002964', discipline);
          if (!repeat && finalMotivation) formData.append('entry.1969355139', finalMotivation);
          if (!repeat && finalExpectation) formData.append('entry.1984032152', finalExpectation);
          if (!repeat && futureTopic) formData.append('entry.1056213779', futureTopic);
          if (divinationResult) formData.append('entry.159526329', divinationResult);

          await fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
          });
        } catch (err) {
          console.error('Failed to submit form directly:', err);
        }
      };

      const fetchPromise = fetch('/api/divination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, discipline, motivation: finalMotivation, expectation: finalExpectation, futureTopic, lang }),
      }).then(async (response) => {
        if (!response.ok) throw new Error('Failed to fetch divination api');
        return await response.json();
      });

      const [_, data] = await Promise.all([timerPromise, fetchPromise]);
      const divinationText = `${data.title}\n\n${data.interpretation}\n\n推薦指引：${data.guidance}`;
      submitToGoogleFormLocal(divinationText);
      
      setResult(data);
      setStep('result');
    } catch (error) {
      console.warn('API error encountered, switching to robust local fallback.', error);
      await timerPromise;

      const GUIDE_URLS: Record<string, string> = {
        "Subject Guides: Dance": "https://libguides.hkapa.edu/dance",
        "Subject Guides: Drama": "https://libguides.hkapa.edu/drama",
        "Subject Guides: Chinese Opera": "https://libguides.hkapa.edu/chinese_opera_chi_version",
        "Subject Guides: F/TV": "https://libguides.hkapa.edu/ftv",
        "Subject Guides: Music": "https://libguides.hkapa.edu/music",
        "Subject Guides: TEA": "https://libguides.hkapa.edu/tea",
        "How to use Primo@Lib (Basic & Advanced Search)": "https://libguides.hkapa.edu/primolib",
        "Seminar Room & Solo Pod Booking System": "https://libguides.hkapa.edu/srbs",
        "Embedding Video Resources in Canvas": "https://libguides.hkapa.edu/embedding_video_resources_in_canvas",
        "How to download eBooks?": "https://libguides.hkapa.edu/c.php?g=956912",
        "Keyword Search Techniques": "https://libguides.hkapa.edu/searchstrategy",
        "Academic Writing": "https://libguides.hkapa.edu/academicwriting",
        "Performing Arts Research": "https://libguides.hkapa.edu/performing_arts_research",
        "Using Turnitin with Canvas 在Canvas平台上使用Turnitin": "https://libguides.hkapa.edu/turnitin",
        "AI Literacy": "https://libguides.hkapa.edu/ai-literacy",
        "Open Educational Resources (OER)": "https://libguides.hkapa.edu/OER",
        "Scholarship Application": "https://libguides.hkapa.edu/scholarship"
      };

      const zhAnswers = [
        { title: "就是現在", interpretation: "別再等待完美時機，現在就是最好的開始。" },
        { title: "刪繁就簡", interpretation: "目前的困惑源於想得太多。試著去掉那些不必要的細節。" },
        { title: "換個環境", interpretation: "答案不在你現在坐的位置，起身去另一個角落吧。" },
        { title: "值得付出", interpretation: "雖然過程艱辛，但最終的結果會讓你覺得一切都值得。" },
        { title: "暫時放下", interpretation: "先去喝杯咖啡或散個步。當你不再苦思時，靈感會自己敲門。" },
        { title: "這不是重點", interpretation: "你正在糾結的問題其實並不關鍵，看遠一點。" },
        { title: "專注於當下", interpretation: "不要擔心中場休息後的結果，先處理好眼前的這段旋律。" }
      ];

      const enAnswers = [
        { title: "The Time is Now", interpretation: "Stop waiting for the perfect moment. Now is the best time to start." },
        { title: "Simplify", interpretation: "Your confusion stems from overthinking. Try removing unnecessary details." },
        { title: "Change Your Environment", interpretation: "The answer isn't where you are sitting now. Get up and go somewhere else." },
        { title: "It's Worth It", interpretation: "The process may be tough, but the result will make it all worthwhile." },
        { title: "Let It Go for Now", interpretation: "Go for a coffee or a walk. Inspiration will knock when you stop forcing it." },
        { title: "Missing the Point", interpretation: "What you're stressing over isn't the real issue. Look further ahead." },
        { title: "Focus on the Present", interpretation: "Don't worry about the aftermath; handle the melody in front of you first." }
      ];

      const fbAnswers = lang === 'en' ? enAnswers : zhAnswers;
      const guidesList = Object.keys(GUIDE_URLS);
      const randAns = fbAnswers[Math.floor(Math.random() * fbAnswers.length)];
      const randGuide = guidesList[Math.floor(Math.random() * guidesList.length)];

      const fbGuidanceText = lang === 'en' 
        ? `'${randGuide}' might give you the answer.`
        : `『${randGuide}』或許能給你答案。`;

      const fbResult = {
        title: randAns.title,
        interpretation: randAns.interpretation,
        guidance: fbGuidanceText,
        guideUrl: GUIDE_URLS[randGuide] || "https://libguides.hkapa.edu/?b=g&d=a",
        isAI: false
      };

      const finalMotivationFallback = motivation.map(id => d.q3Options.find(o => o.id === id)?.label || id).join(';');
      const finalExpectationFallback = expectation.map(id => d.q4Options.find(o => o.id === id)?.label || id).join(';');
      const divinationTextLocal = `${fbResult.title}\n\n${fbResult.interpretation}\n\n推薦指引：${fbResult.guidance} (降級模式)`;

      try {
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeUXZuS_1Mwd3UwKoBZmzrOX0tywa8opqM-mLcmVSmIxXywEQ/formResponse';
        const formData = new URLSearchParams();
        if (!repeat && identity) formData.append('entry.124506886', identity);
        if (!repeat && discipline) formData.append('entry.1652002964', discipline);
        if (!repeat && finalMotivationFallback) formData.append('entry.1969355139', finalMotivationFallback);
        if (!repeat && finalExpectationFallback) formData.append('entry.1984032152', finalExpectationFallback);
        if (!repeat && futureTopic) formData.append('entry.1056213779', futureTopic);
        formData.append('entry.159526329', divinationTextLocal);

        await fetch(formUrl, { method: 'POST', mode: 'no-cors', body: formData });
      } catch (e) {
        console.error('Fallback Form sumbission failed', e);
      }

      setResult(fbResult);
      setStep('result');
    }
  };

  const handleToggleLang = () => {
    setLang(l => l === 'zh' ? 'en' : 'zh');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div 
      className="min-h-screen text-ink font-oracle selection:bg-ink/20 overflow-hidden relative flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1730371851241-aad9cf97525f")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a60]/75 via-[#1a0532]/80 to-[#080112]/90 pointer-events-none" />
      <VintageFrame />
      <button 
        onClick={handleToggleLang}
        className="absolute top-6 right-6 z-50 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black hover:bg-white/90 rounded-full transition-all text-sm font-medium tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        {lang === 'zh' ? 'EN' : '中'}
      </button>
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-xl w-full text-center space-y-8 z-10"
          >
            <div className="flex justify-center mb-6">
              <BookOpen className="w-24 h-24 text-ink/80" strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <h1 className="font-georgia text-[2.6rem] tracking-[10px] text-ink uppercase border-b border-border-ink pb-[20px] text-center">
                {d.title}
              </h1>
              <p className="text-ink-light text-[14px] tracking-[5px] uppercase pt-2">{d.subtitle}</p>
            </div>
            <div className="text-ink text-[17px] leading-relaxed max-w-xl mx-auto font-light flex flex-col items-center">
              <p>{d.q1}</p>
              <div className="flex items-center justify-center mt-3 relative group">
                <p className="font-georgia text-[18px] tracking-[2px] animate-text-glow relative inline-block">
                  {d.q2}
                </p>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  onBlur={() => setTimeout(() => setShowInfo(false), 200)}
                  className="focus:outline-none"
                >
                  <Info className="w-5 h-5 ml-2 text-ink-light hover:text-ink cursor-help transition-all duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </button>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[260px] p-4 bg-[#1a0532]/95 border border-ink/30 text-ink-light text-[14px] leading-relaxed rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md z-50 text-left pointer-events-none ${showInfo ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                  {d.tooltipText1}<strong className="text-ink font-medium">{d.tooltipHighlight}</strong>{d.tooltipText2}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink/30"></div>
                </div>
              </div>
              <div className="mt-10 py-4 px-6 border-y border-ink/30 bg-ink/5 relative overflow-hidden group/prelude">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
                <p className="text-ink text-[16px] tracking-[2px] font-medium relative z-10 flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 opacity-70" />
                  {d.prelude}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => handleNext('q1')}
              className="bg-transparent text-ink border-[1px] border-ink hover:bg-ink/10 transition-all duration-300 px-10 py-8 rounded-none text-[16px] tracking-[3px] uppercase group shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              {d.startBtn}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        )}

        {step === 'q1' && (
          <motion.div key="q1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[40px] relative shadow-2xl rounded-none">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-ink-light text-[14px] tracking-[2px] uppercase font-medium">{d.page1Label}</span>
                  <h2 className="text-[18px] text-ink p-3 bg-ink/5 border-l-2 border-ink mt-2 text-left tracking-[1px]">{d.page1Title}</h2>
                </div>
                <RadioGroup value={identity} onValueChange={setIdentity} className="space-y-4">
                  {d.identities.map((item) => (
                    <div key={item} className="flex items-center space-x-4 bg-transparent p-5 border border-border-ink hover:border-ink/60 hover:bg-ink/5 transition-all cursor-pointer" onClick={() => setIdentity(item)}>
                      <RadioGroupItem value={item} id={item} className="border-ink text-[#1a0532] w-5 h-5" />
                      <Label htmlFor={item} className="text-ink text-[17px] cursor-pointer flex-1 font-light">{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-end mt-10">
                  <Button 
                    disabled={!identity} 
                    onClick={() => handleNext('q2')}
                    className="bg-transparent border border-ink text-ink hover:bg-ink/10 disabled:opacity-50 rounded-none tracking-[2px] uppercase text-[15px] px-6 py-5 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {d.nextBtn} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'q2' && (
          <motion.div key="q2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[40px] relative shadow-2xl rounded-none">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-ink-light text-[14px] tracking-[2px] uppercase font-medium">{d.page2Label}</span>
                  <h2 className="text-[18px] text-ink p-3 bg-ink/5 border-l-2 border-ink mt-2 text-left tracking-[1px]">{d.page2Title}</h2>
                </div>
                <Select value={discipline} onValueChange={setDiscipline}>
                  <SelectTrigger className="w-full bg-transparent border-border-ink text-ink h-14 text-[17px] focus:ring-ink/50 rounded-none font-light px-4">
                    <SelectValue placeholder={d.disciplinePlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 backdrop-blur-xl border-ink text-ink rounded-none">
                    {d.disciplines.map((item) => (
                      <SelectItem key={item} value={item} className="focus:bg-ink/20 focus:text-ink cursor-pointer text-[17px] py-4 rounded-none">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-between mt-10">
                  <Button variant="ghost" onClick={() => handleNext('q1')} className="text-ink-light hover:text-ink hover:bg-transparent tracking-[2px] uppercase text-[14px] rounded-none px-0">
                    {d.prevBtn}
                  </Button>
                  <Button 
                    disabled={!discipline} 
                    onClick={() => handleNext('q3')}
                    className="bg-transparent border border-ink text-ink hover:bg-ink/10 disabled:opacity-50 rounded-none tracking-[2px] uppercase text-[15px] px-6 py-5 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {d.nextBtn} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'q3' && (
          <motion.div key="q3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[40px] relative shadow-2xl rounded-none">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-ink-light text-[14px] tracking-[2px] uppercase font-medium">{d.page3Label}</span>
                  <h2 className="text-[18px] text-ink p-3 bg-ink/5 border-l-2 border-ink mt-2 text-left tracking-[1px]">{d.page3Title}</h2>
                </div>
                
                <div className="w-full h-[85px] md:h-[100px] bg-[#6a358c]/10 border border-ink/20 mt-4 overflow-hidden flex-shrink-0 flex">
                  <img src="https://d329ms1y997xa5.cloudfront.net/sites/18098/banner/banner_5.jpg" alt="Library Banner" className="w-full h-full object-cover object-left" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 mt-6 relative z-20">
                  {d.q3Options.map((option, index) => {
                    const isSelected = motivation.includes(option.id);
                    // Determine tooltip alignment based on column (0 for left, 1 for right, 2 for left, 3 for right, etc.)
                    const isRightCol = index % 2 !== 0;
                    const tooltipAlignClass = option.id === 'None' 
                      ? 'right-1/2 translate-x-1/2' 
                      : (isRightCol ? 'right-[-10px] md:right-0' : 'left-[-10px] md:left-0');
                    const tooltipArrowClass = option.id === 'None'
                      ? 'right-1/2 translate-x-1/2'
                      : (isRightCol ? 'right-[20px] md:right-[30px]' : 'left-[20px] md:left-[30px]');

                    return (
                      <div
                        key={option.id}
                        role="button"
                        onClick={() => {
                          if (option.id === 'None') {
                            setMotivation(prev => prev.includes('None') ? [] : ['None']);
                          } else {
                            setMotivation(prev => {
                              const prevFiltered = prev.filter(p => p !== 'None');
                              return prevFiltered.includes(option.id)
                                ? prevFiltered.filter(p => p !== option.id)
                                : [...prevFiltered, option.id];
                            });
                          }
                        }}
                        className={`relative flex flex-col items-center justify-center p-6 border transition-all duration-300 rounded-none gap-3 font-medium text-center cursor-pointer ${
                          isSelected 
                            ? 'bg-ink/10 text-ink border-ink shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-100' 
                            : 'bg-transparent border-border-ink text-ink-light hover:border-ink/80 hover:bg-ink/5 hover:text-ink'
                        } ${option.id === 'None' ? 'col-span-2 flex-row py-4' : ''}`}
                      >
                        {option.desc && (
                          <div className="absolute top-2 right-2 z-20">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveOptionInfo(activeOptionInfo === option.id ? null : option.id);
                              }}
                              onBlur={() => setTimeout(() => setActiveOptionInfo(null), 200)}
                              className="focus:outline-none p-2 -m-2 group/info"
                            >
                              <Info className="w-5 h-5 md:w-4 md:h-4 text-ink-light hover:text-ink transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                              
                              <div className={`absolute bottom-full mb-3 w-[260px] p-4 pointer-events-none bg-[#1a0532]/95 border border-ink/30 text-ink-light text-[13.5px] leading-relaxed break-words whitespace-normal rounded-md shadow-[0_0_20px_rgba(255,255,255,0.2)] backdrop-blur-md text-left transition-all duration-300 z-50 ${tooltipAlignClass} ${activeOptionInfo === option.id ? 'opacity-100 visible' : 'opacity-0 invisible md:group-hover/info:opacity-100 md:group-hover/info:visible'}`}>
                                {option.desc}
                                <div className={`absolute top-full border-4 border-transparent border-t-ink/30 ${tooltipArrowClass}`}></div>
                              </div>
                            </button>
                          </div>
                        )}
                        {(() => {
                          const iconClass = option.id === 'None' ? "w-6 h-6 mr-1" : "w-10 h-10 mb-1";
                          switch (option.icon) {
                            case 'library': return <Library className={iconClass} />;
                            case 'book': return <Book className={iconClass} />;
                            case 'microscope': return <Microscope className={iconClass} />;
                            case 'compass': return <Compass className={iconClass} />;
                            case 'xcircle': return <XCircle className={iconClass} />;
                            default: return <Info className={iconClass} />;
                          }
                        })()}
                        <span className="text-[15px]">{option.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-10">
                  <Button variant="ghost" onClick={() => handleNext('q2')} className="text-ink-light hover:text-ink hover:bg-transparent tracking-[2px] uppercase text-[14px] rounded-none px-0">
                    {d.prevBtn}
                  </Button>
                  <Button 
                    disabled={motivation.length === 0} 
                    onClick={() => {
                      if (motivation.includes('None')) {
                        setExpectation([]); // Clear expectation if they haven't used guides
                        handleNext('q5');
                      } else {
                        handleNext('q4');
                      }
                    }}
                    className="bg-transparent border border-ink text-ink hover:bg-ink/10 disabled:opacity-50 rounded-none tracking-[2px] uppercase text-[15px] px-6 py-5 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {d.nextBtn} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'q4' && (
          <motion.div key="q4" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[40px] relative shadow-2xl rounded-none">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-ink-light text-[14px] tracking-[2px] uppercase font-medium">{d.page4Label}</span>
                  <h2 className="text-[18px] text-ink p-3 bg-ink/5 border-l-2 border-ink mt-2 text-left tracking-[1px]">{d.page4Title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4 max-h-[350px] overflow-y-auto pr-2">
                  {d.q4Options.map(option => {
                    const isSelected = expectation.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => setExpectation([option.id])}
                        className={`flex items-center p-5 border transition-all duration-300 rounded-none gap-4 font-medium text-left ${
                          isSelected 
                            ? 'bg-ink/10 text-ink border-ink shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-[1.02]' 
                            : 'bg-transparent border-border-ink text-ink-light hover:border-ink/80 hover:bg-ink/5 hover:text-ink'
                        }`}
                      >
                        {(() => {
                          const iconClass = "w-6 h-6";
                          switch (option.icon) {
                            case 'thumbsup': return <ThumbsUp className={iconClass} />;
                            case 'smile': return <Smile className={iconClass} />;
                            case 'meh': return <Meh className={iconClass} />;
                            default: return <Info className={iconClass} />;
                          }
                        })()}
                        <span className="text-[16px]">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-10">
                  <Button variant="ghost" onClick={() => handleNext('q3')} className="text-ink-light hover:text-ink hover:bg-transparent tracking-[2px] uppercase text-[14px] rounded-none px-0">
                    {d.prevBtn}
                  </Button>
                  <Button 
                    disabled={expectation.length === 0}
                    onClick={() => handleNext('q5')}
                    className="bg-transparent border border-ink text-ink hover:bg-ink/10 disabled:opacity-50 rounded-none tracking-[2px] uppercase text-[15px] px-6 py-5 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {d.nextBtn} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'q5' && (
          <motion.div key="q5" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[40px] relative shadow-2xl rounded-none">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-2 text-center">
                  <span className="text-ink-light text-[14px] tracking-[2px] uppercase font-medium">{d.page5Label}</span>
                  <h2 className="text-[18px] text-ink p-3 bg-ink/5 border-l-2 border-ink mt-2 text-left tracking-[1px]">{d.page5Title}</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {d.q5Presets.map(preset => (
                    <button 
                      key={preset}
                      onClick={() => setFutureTopic(prev => prev ? `${prev}, ${preset}` : preset)}
                      className="px-4 py-2 border border-ink/40 rounded-none text-ink hover:bg-ink/10 hover:border-ink/80 text-[14px] transition-all duration-300 shadow-[0_0_5px_rgba(255,255,255,0.05)] hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
                <Textarea 
                  value={futureTopic}
                  onChange={(e) => setFutureTopic(e.target.value)}
                  placeholder={d.futureTopicPlaceholder}
                  className="min-h-[140px] bg-transparent border-border-ink text-ink focus-visible:ring-ink/70 resize-none text-[17px] rounded-none font-light p-4"
                />
                <div className="flex justify-between mt-10">
                  <Button variant="ghost" onClick={() => {
                    if (motivation.includes('None')) {
                      handleNext('q3');
                    } else {
                      handleNext('q4');
                    }
                  }} className="text-ink-light hover:text-ink hover:bg-transparent tracking-[2px] uppercase text-[14px] rounded-none px-0">
                    {d.prevBtn}
                  </Button>
                  <Button 
                    onClick={() => handleSubmit(false)}
                    className="bg-transparent border border-ink text-ink hover:bg-ink/10 rounded-none tracking-[2px] uppercase text-[15px] px-6 py-5 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {d.submitBtn} <Book className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'countdown' && (
          <motion.div key="countdown" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center space-y-8 z-10">
            <div className="space-y-4">
              <h2 className="text-[24px] text-ink font-georgia tracking-[6px]">{d.countdownTitle}</h2>
              <div className="text-[72px] font-light text-ink/90 font-georgia">
                {countdown}
              </div>
            </div>
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center mt-10">
              <motion.div 
                animate={{ rotateY: 180 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-20 border-[3px] border-ink rounded-r-lg border-l-[6px] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </div>
            <p className="text-ink-light tracking-[5px] uppercase text-[14px] animate-pulse">{d.flipping}</p>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div key="result" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-2xl w-full z-10">
            <Card className="bg-black/60 backdrop-blur-md border-ink/40 p-[50px] relative shadow-2xl text-center rounded-none">
              <CardContent className="p-0 space-y-8 relative">
                <div className="space-y-4">
                  <h2 className="text-[32px] font-semibold text-ink font-georgia tracking-[10px] mb-[30px]">
                    {result.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-[20px] leading-[1.8] mb-[40px] text-ink text-center font-light">
                    {result.interpretation}
                  </p>
                  
                  <div className="flex flex-col items-center mt-8">
                    <div className="text-[13px] text-ink-light mb-[12px] tracking-[3px] font-medium uppercase opacity-80">{d.resultTitle}</div>
                    <a 
                      href={result.guideUrl || "https://libguides.hkapa.edu/?b=g&d=a"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row items-center justify-center gap-4 px-10 py-5 bg-black/40 border-[1px] border-ink/80 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:-translate-y-1 text-ink hover:text-[#1a0532] hover:bg-ink/95 no-underline text-[18px] tracking-[2px] transition-all duration-500 rounded-none w-full sm:w-auto relative overflow-hidden"
                    >
                      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                      <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full animate-pulse blur-[1px] opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-50 group-hover:opacity-100 transition-opacity" />
                      
                      <span className="font-semibold relative z-10">{result.guidance}</span>
                      <div className="bg-ink/10 group-hover:bg-[#1a0532]/20 border border-ink/40 group-hover:border-[#1a0532]/30 p-2 rounded-full transition-colors relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:shadow-none">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </a>
                  </div>
                </div>

                {!result.isAI && (
                  <div className="mt-4">
                    <p className="text-[10px] text-ink-light/70 tracking-[1px]">{d.fallbackNotice}</p>
                  </div>
                )}

                <div className="absolute -bottom-[80px] left-0 right-0 text-[12px] text-ink-light italic text-center">
                  {d.disclaimer}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <Button 
                    onClick={() => handleSubmit(true)}
                    variant="ghost"
                    className="text-ink hover:bg-ink/5 tracking-[2px] uppercase text-[12px] rounded-none border border-transparent hover:border-ink/20"
                  >
                    {d.playAgainBtn}
                  </Button>
                  <Button 
                    onClick={() => {
                      setIdentity('');
                      setDiscipline('');
                      setMotivation([]);
                      setExpectation([]);
                      setFutureTopic('');
                      setStep('welcome');
                    }}
                    variant="ghost"
                    className="text-ink-light hover:text-ink hover:bg-transparent tracking-[2px] uppercase text-[12px] rounded-none opacity-60"
                  >
                    {lang === 'en' ? 'Start Over' : '重新作答'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
