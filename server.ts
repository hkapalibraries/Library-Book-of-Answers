import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

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

  const DEFAULT_GUIDE_URL = "https://libguides.hkapa.edu/?b=g&d=a";

  function getGuideUrl(guidanceText: string): string {
    for (const [name, url] of Object.entries(GUIDE_URLS)) {
      if (guidanceText.includes(name)) {
        return url;
      }
    }
    return DEFAULT_GUIDE_URL;
  }

  app.use(express.json());

  // API Route for Divination
  app.post('/api/divination', async (req, res) => {
    try {
      const { identity, discipline, motivation, expectation, futureTopic, lang = 'zh' } = req.body;
      const grokApiKey = process.env.GROK_API_KEY;

      const answers = [
        { title: "就是現在", interpretation: "別再等待完美時機，現在就是最好的開始。" },
        { title: "刪繁就簡", interpretation: "目前的困惑源於想得太多。試著去掉那些不必要的細節。" },
        { title: "換個環境", interpretation: "答案不在你現在坐的位置，起身去另一個角落吧。" },
        { title: "值得付出", interpretation: "雖然過程艱辛，但最終的結果會讓你覺得一切都值得。" },
        { title: "暫時放下", interpretation: "先去喝杯咖啡或散個步。當你不再苦思時，靈感會自己敲門。" },
        { title: "這不是重點", interpretation: "你正在糾結的問題其實並不關鍵，看遠一點。" },
        { title: "專注於當下", interpretation: "不要擔心中場休息後的結果，先處理好眼前的這段旋律。" }
      ];

      const guides = Object.keys(GUIDE_URLS);

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const randomGuide = guides[Math.floor(Math.random() * guides.length)];

      const fallbackGuidanceText = lang === 'en' 
        ? `'${randomGuide}' might give you the answer.`
        : `『${randomGuide}』或許能給你答案。`;

      const fallbackResult = {
        title: randomAnswer.title,
        interpretation: randomAnswer.interpretation,
        guidance: fallbackGuidanceText,
        guideUrl: getGuideUrl(randomGuide),
        isAI: false
      };

      if (!grokApiKey) {
        console.warn('GROK_API_KEY environment variable is missing. Falling back to random answers.');
        return res.json(fallbackResult);
      }

      const libraryGuides = `
Subject Guides: Dance
Subject Guides: Drama
Subject Guides: Chinese Opera
Subject Guides: F/TV
Subject Guides: Music
Subject Guides: TEA
How to use Primo@Lib (Basic & Advanced Search)
Seminar Room & Solo Pod Booking System
Embedding Video Resources in Canvas
How to download eBooks?
Keyword Search Techniques
Academic Writing
Performing Arts Research
Using Turnitin with Canvas 在Canvas平台上使用Turnitin
AI Literacy
Open Educational Resources (OER)
Scholarship Application
      `;

      const zhPrompt = `
你是一本充滿神秘感與智慧的圖書館《解答之書》(The Library's "Book of Answers")。
使用者在心中默念了一個問題，並翻開了你。請給出一個簡短、神秘且具備哲理的箴言作為回答。
注意：解答必須如同原版《解答之書》一般，高度凝練、一語中的（如：「毫無疑問」、「這不值得」、「順其自然」、「現在還不是時候」等），並且**絕對不要**在箴言(title與interpretation)中刻意提及使用者以下的預先選項（身份、學科、動機等），保持解答的抽象性與通用性。

不過，你需要根據使用者提供的背景資訊（特別是「期望」），從下方列表中挑選一個最適合推薦給使用者的「圖書館指南」。

使用者的背景資訊：
- 身份：${identity}
- 藝術領域：${discipline}
- 動機：${motivation}
- 期望（覺得有用的指南類型）：${expectation}
- 未來想探索的課題：${futureTopic}

可推薦的圖書館指南列表：
${libraryGuides}

請以 JSON 格式回覆，包含以下欄位：
- "title": 簡短的解答標題（例如：「順其自然」、「毫無疑問」），盡量在五個字以內。
- "interpretation": 對這個解答的簡短詮釋（約 1-2 句話，維持神秘與哲理，絕不可提及使用者的學科與選項）。
- "guidance": 推薦的圖書館指南名稱（例如：「『Academic Writing』或許能給你答案。」）。請注意，指南名稱不需要也不應該包含網址。

請只回傳 JSON 格式的字串，不要包含其他說明文字或 Markdown 標記。請以繁體中文回答。
`;

      const enPrompt = `
You are a mysterious and wise "Book of Answers" from the Library.
The user has silently recited a question and opened you. Please provide a brief, cryptic, and philosophical aphorism as an answer.
Note: The answer must be highly condensed and hit the mark just like the original "Book of Answers" (e.g., "Without a doubt", "Not worth it", "Let it be", "Now is not the time"). You must **absolutely not** mention the user's pre-filled options (identity, discipline, motivation) in the aphorism (title and interpretation). Keep the answer abstract and universally applicable.

However, you need to select ONE most suitable library guide from the provided list based on the user's background (especially "expectations").

User Background:
- Identity: ${identity}
- Discipline: ${discipline}
- Motivation: ${motivation}
- Expected Guides: ${expectation}
- Desired Topics: ${futureTopic}

Available Library Guides List:
${libraryGuides}

Respond in JSON format containing the following fields:
- "title": The short aphorism (1-5 words)
- "interpretation": A short explanation or extension of the aphorism (20-50 words)
- "guidance": The recommended library guide name (e.g. "'Academic Writing' might give you the answer."). Do not include URLs.

Return ONLY valid JSON without any Markdown tags like \`\`\`json or \`\`\`. Please respond entirely in English.
`;

      const prompt = lang === 'en' ? enPrompt : zhPrompt;

      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${grokApiKey}`
        },
        body: JSON.stringify({
          model: 'grok-4-1-fast',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that outputs strictly in JSON format.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Grok API error:', errorData);
        console.warn('Falling back to random answers due to API error.');
        return res.json(fallbackResult);
      }

      const data = await response.json();
      const content = data.choices[0].message.content.trim();
      
      // Clean up potential markdown formatting
      const jsonStr = content.replace(/^\`\`\`json/i, '').replace(/\`\`\`$/i, '').trim();
      const result = JSON.parse(jsonStr);
      result.isAI = true;
      result.guideUrl = getGuideUrl(result.guidance);

      res.json(result);
    } catch (error) {
      console.error('Divination error:', error);
      
      // Fallback on any other error
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

      const answers = req.body?.lang === 'en' ? enAnswers : zhAnswers;

      const guides = Object.keys(GUIDE_URLS);

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const randomGuide = guides[Math.floor(Math.random() * guides.length)];

      const fallbackGuidanceText = req.body?.lang === 'en' 
        ? `'${randomGuide}' might give you the answer.`
        : `『${randomGuide}』或許能給你答案。`;

      res.json({
        title: randomAnswer.title,
        interpretation: randomAnswer.interpretation,
        guidance: fallbackGuidanceText,
        guideUrl: getGuideUrl(randomGuide),
        isAI: false
      });
    }
  });

  // API Route for Google Form Submission
  app.post('/api/submit', async (req, res) => {
    try {
      const { identity, discipline, motivation, expectation, futureTopic, divinationResult } = req.body;
      
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeUXZuS_1Mwd3UwKoBZmzrOX0tywa8opqM-mLcmVSmIxXywEQ/formResponse';
      
      const formData = new URLSearchParams();
      formData.append('entry.124506886', identity);
      formData.append('entry.1652002964', discipline);
      formData.append('entry.1969355139', motivation);
      formData.append('entry.1984032152', expectation);
      if (futureTopic) {
        formData.append('entry.1056213779', futureTopic);
      }
      if (divinationResult) {
        formData.append('entry.159526329', divinationResult);
      }

      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Google Forms returns 200 even if it's a redirect to the confirmation page
      res.json({ success: true });
    } catch (error) {
      console.error('Form submission error:', error);
      res.status(500).json({ error: 'Failed to submit form' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
