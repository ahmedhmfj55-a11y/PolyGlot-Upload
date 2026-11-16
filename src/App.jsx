import { useState, useEffect } from 'react'
import {
  BookOpen, Volume2, Trophy, ArrowRight, CheckCircle,
  Home, Star, Languages, MessageCircle, Sparkles,
  Globe, Search, RotateCcw, Moon, Sun
} from 'lucide-react'
import { Browser } from '@capacitor/browser'
import './App.css'

const languages = [
  { name: 'الإنجليزية', flag: '🇬🇧', level: 'الأكثر شعبية', count: '120 درساً' },
  { name: 'الإسبانية', flag: '🇪🇸', level: 'لغة عالمية', count: '85 درساً' },
  { name: 'الفرنسية', flag: '🇫🇷', level: 'لغة الثقافة', count: '90 درساً' },
  { name: 'الألمانية', flag: '🇩🇪', level: 'لغة الأعمال', count: '75 درساً' },
  { name: 'الإيطالية', flag: '🇮🇹', level: 'لغة الفن', count: '60 درساً' },
  { name: 'اليابانية', flag: '🇯🇵', level: 'لغة مميزة', count: '70 درساً' },
]

const quizQuestions = [
  { question: 'ما معنى Hello؟', options: ['وداعاً', 'مرحباً', 'شكراً'], answer: 'مرحباً' },
  { question: 'ما معنى Thank you؟', options: ['من فضلك', 'صباح الخير', 'شكراً لك'], answer: 'شكراً لك' },
  { question: 'ما معنى Friend؟', options: ['صديق', 'مدرسة', 'كتاب'], answer: 'صديق' },
  { question: 'ما معنى Beautiful؟', options: ['سريع', 'جميل', 'كبير'], answer: 'جميل' },
]

const quizLevels = {
  beginner: quizQuestions,
  intermediate: [
    { question: 'ما معنى I am learning English؟', options: ['أنا أتعلم الإنجليزية', 'أنا أحب السفر', 'أين أنت؟'], answer: 'أنا أتعلم الإنجليزية' },
    { question: 'ما معنى Yesterday؟', options: ['غداً', 'أمس', 'اليوم'], answer: 'أمس' },
    { question: 'ما معنى Important؟', options: ['مهم', 'سهل', 'بعيد'], answer: 'مهم' },
  ],
  advanced: [
    { question: 'ما معنى Although؟', options: ['لذلك', 'على الرغم من', 'بسبب'], answer: 'على الرغم من' },
    { question: 'ما معنى I would have gone؟', options: ['سأذهب', 'كنت سأذهب', 'أنا ذاهب'], answer: 'كنت سأذهب' },
    { question: 'ما معنى Opportunity؟', options: ['فرصة', 'مشكلة', 'نتيجة'], answer: 'فرصة' },
  ],
};

const words = [
  ['Hello', 'مرحباً'],
  ['Thank you', 'شكراً لك'],
  ['Good morning', 'صباح الخير'],
  ['Beautiful', 'جميل'],
  ['Friend', 'صديق'],
]


const lessonLevels = {
  beginner: [
    { word: 'Hello', meaning: 'مرحباً', example: 'Hello, my friend.', translation: 'مرحباً يا صديقي' },
    { word: 'Thank you', meaning: 'شكراً لك', example: 'Thank you very much.', translation: 'شكراً جزيلاً' },
    { word: 'Good morning', meaning: 'صباح الخير', example: 'Good morning, everyone.', translation: 'صباح الخير جميعاً' },
    { word: 'Friend', meaning: 'صديق', example: 'He is my friend.', translation: 'هو صديقي' },
    { word: 'Beautiful', meaning: 'جميل', example: 'It is a beautiful day.', translation: 'إنه يوم جميل' },
  ],
  intermediate: [
    { word: 'Actually', meaning: 'في الواقع', example: 'Actually, I agree with you.', translation: 'في الواقع، أنا أتفق معك' },
    { word: 'Improve', meaning: 'يطوّر / يحسّن', example: 'I want to improve my English.', translation: 'أريد تحسين لغتي الإنجليزية' },
    { word: 'Experience', meaning: 'تجربة / خبرة', example: 'It was a great experience.', translation: 'كانت تجربة رائعة' },
    { word: 'Usually', meaning: 'عادةً', example: 'I usually wake up early.', translation: 'عادةً أستيقظ مبكراً' },
  ],
  advanced: [
    { word: 'Nevertheless', meaning: 'مع ذلك', example: 'Nevertheless, we continued.', translation: 'مع ذلك، واصلنا' },
    { word: 'Achievement', meaning: 'إنجاز', example: 'This is a great achievement.', translation: 'هذا إنجاز عظيم' },
    { word: 'Opportunity', meaning: 'فرصة', example: 'Never miss an opportunity.', translation: 'لا تفوّت فرصة أبداً' },
    { word: 'Consequently', meaning: 'وبالتالي', example: 'Consequently, we changed our plan.', translation: 'وبالتالي، غيّرنا خطتنا' },
  ],
};

function App() {
  const [tab, setTab] = useState('home')
  const [uiLang, setUiLang] = useState(() => localStorage.getItem('polyglotUILang') || 'ar')
  const [theme, setTheme] = useState(() => localStorage.getItem('polyglotTheme') || 'dark')

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light')
    localStorage.setItem('polyglotTheme', theme)
  }, [theme])
  const [studentName, setStudentName] = useState(() => localStorage.getItem('polyglotStudentName') || '')
  const [nameInput, setNameInput] = useState('')
  const [language, setLanguage] = useState('الإنجليزية')
  const [lessonLevel, setLessonLevel] = useState('beginner')
  const [search, setSearch] = useState('')
  const [xp, setXp] = useState(0)
  const [completed, setCompleted] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [level, setLevel] = useState('beginner')
  const currentQuestions = quizLevels[level]

  const [updateInfo, setUpdateInfo] = useState(null)

  useEffect(() => {
    let active = true

    async function checkForUpdates() {
      try {
        const response = await fetch(
          'https://api.github.com/repos/ahmedhmfj55-a11y/PolyGlot-Upload/releases/latest'
        )
        if (!response.ok) return

        const release = await response.json()
        const latestVersion = (release.tag_name || '').replace(/^v/, '')
        const currentVersion = '1.0'

        const latest = latestVersion.split('.').map(Number)
        const current = currentVersion.split('.').map(Number)

        let isNewer = false
        for (let i = 0; i < Math.max(latest.length, current.length); i++) {
          const a = latest[i] || 0
          const b = current[i] || 0
          if (a > b) { isNewer = true; break }
          if (a < b) break
        }

        const apk = release.assets?.find(asset =>
          asset.name.toLowerCase().endsWith('.apk')
        )

        if (active && isNewer && apk) {
          setUpdateInfo({
            version: latestVersion,
            url: apk.browser_download_url
          })
        }
      } catch (error) {
        console.log('Update check unavailable:', error)
      }
    }

    checkForUpdates()
    return () => { active = false }
  }, [])


  function enterApp(e) {
    e.preventDefault()
    const cleanName = nameInput.trim()
    if (!cleanName) return
    localStorage.setItem('polyglotStudentName', cleanName)
    setStudentName(cleanName)
  }

  function changeLevel(value) {
    setLevel(value)
    setQuizIndex(0)
    setSelected('')
    setScore(0)
    setFeedback('')
  }

  function chooseLanguage(name) {
    setLanguage(name)
    setTab('lessons')
  }

  function completeWord() {
    setXp(value => value + 10)
    setCompleted(value => [...value, Date.now()])
  }

  function answerQuestion(option) {
    if (selected) return
    setSelected(option)
    if (option === currentQuestions[quizIndex].answer) {
      setScore(value => value + 1)
      setXp(value => value + 10)
      setFeedback('إجابة صحيحة! أحسنت 🎉')
    } else {
      setFeedback('ليست صحيحة. حاول في السؤال القادم 💪')
    }
  }

  function nextQuestion() {
    setQuizIndex(value => (value + 1) % currentQuestions.length)
    setSelected('')
    setFeedback('')
  }

  function speak(word) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className={`app ${theme === "light" ? "light-mode" : ""}`} dir={uiLang === "ar" ? "rtl" : "ltr"}>
      {!studentName ? (
        <section className="student-entry">
          <div className="student-entry-logo"><Globe size={38} /> <b>PolyGlot <span>AI</span></b></div>
          <div className="student-entry-icon">🎓</div>
          <h1>{uiLang === 'ar' ? 'أهلاً بك في PolyGlot AI' : 'Welcome to PolyGlot AI'}</h1>
          <p>{uiLang === 'ar' ? 'قبل أن نبدأ رحلة تعلّم اللغات، أخبرنا باسمك.' : 'Before we begin, tell us your name.'}</p>
          <form onSubmit={enterApp}>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder={uiLang === 'ar' ? 'اكتب اسم الطالب هنا' : 'Enter your name'}
              required
            />
            <button className="primary" type="submit">{uiLang === 'ar' ? 'ابدأ التعلم' : 'Start Learning'} <ArrowRight size={18}/></button>
          </form>
        </section>
      ) : (
      <>
      <header className="topbar">
        <div className="logo"><Globe /> PolyGlot <span>AI</span></div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={() => {
            const next = uiLang === 'ar' ? 'en' : 'ar';
            setUiLang(next);
            localStorage.setItem('polyglotUILang', next);
          }}>
            {uiLang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme(value => value === 'dark' ? 'light' : 'dark')}
            aria-label="تبديل الوضع"
            title="تبديل الوضع"
          >
            {theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}
            <span>{theme === 'dark' ? (uiLang === 'ar' ? 'نهاري' : 'Light') : (uiLang === 'ar' ? 'ليلي' : 'Dark')}</span>
          </button>
          <div className="xp"><Trophy size={17} /> {xp} XP</div>
        </div>
      </header>

      <main>
        {tab === 'home' && <>
          <section className="welcome">
            <span className="eyebrow"><Sparkles size={14}/> {uiLang === 'ar' ? 'مستقبلك يبدأ بكلمة' : 'Your future starts with one word'}</span>
            <p className="student-greeting">أهلاً {studentName}، {uiLang === 'ar' ? 'سعيدون بوجودك معنا!' : 'Glad to have you here!'} 👋</p>
            <h1>{uiLang === 'ar' ? 'تعلّم لغة جديدة،' : 'Learn a new language,'}<br/><span>{uiLang === 'ar' ? 'وافتح العالم أمامك.' : 'and open the world.'}</span></h1>
            <p>{uiLang === 'ar' ? 'رحلة ذكية لتعلّم اللغات بطريقة ممتعة وسهلة.' : 'A smarter, easier, and more fun way to learn languages.'}</p>
            <button className="primary" onClick={() => setTab('languages')}>
              {uiLang === 'ar' ? 'ابدأ رحلتك' : 'Start your journey'} <ArrowRight size={18}/>
            </button>
            <div className="globe">🌐</div>
          </section>

          <div className="stats">
            <div><Trophy/><b>{xp}</b><small>{uiLang === 'ar' ? 'نقاط الخبرة' : 'XP Points'}</small></div>
            <div><Star/><b>{completed.length}</b><small>{uiLang === 'ar' ? 'إنجازات' : 'Achievements'}</small></div>
            <div><Globe/><b>{languages.length}</b><small>{uiLang === 'ar' ? 'لغات' : 'Languages'}</small></div>
          </div>

          <section className="section">
            <div className="section-title"><h2>{uiLang === 'ar' ? 'اكتشف أدواتك الذكية ✨' : 'Explore your smart tools ✨'}</h2></div>
            <div className="lesson-card">
              <Languages size={28}/>
              <div><b>{uiLang === 'ar' ? 'الترجمة الذكية' : 'Smart Translation'}</b><p>{uiLang === 'ar' ? 'ترجم الكلمات والعبارات' : 'Translate words and phrases'}</p></div>
              <button onClick={() => setTab('translate')}>{uiLang === 'ar' ? 'افتح' : 'Open'}</button>
            </div>
            <div className="lesson-card">
              <MessageCircle size={28}/>
              <div><b>{uiLang === 'ar' ? 'محادثة AI' : 'AI Conversation'}</b><p>{uiLang === 'ar' ? 'تدرّب على اللغات مع مساعدك' : 'Practice languages with your assistant'}</p></div>
              <button onClick={() => setTab('chat')}>{uiLang === 'ar' ? 'افتح' : 'Open'}</button>
            </div>
            <div className="lesson-card">
              <BookOpen size={28}/>
              <div><b>{uiLang === 'ar' ? 'تعلم اللغات' : 'Learn Languages'}</b><p>{uiLang === 'ar' ? 'دروس ومفردات جديدة' : 'New lessons and vocabulary'}</p></div>
              <button onClick={() => setTab('languages')}>{uiLang === 'ar' ? 'ابدأ' : 'Start'}</button>
            </div>
            <div className="lesson-card">
              <CheckCircle size={28}/>
              <div><b>{uiLang === 'ar' ? 'اختبر نفسك' : 'Test Yourself'}</b><p>{uiLang === 'ar' ? 'أسئلة تفاعلية واجمع النقاط' : 'Answer questions and earn points'}</p></div>
              <button onClick={() => setTab('quiz')}>{uiLang === 'ar' ? 'ابدأ' : 'Start'}</button>
            </div>
          </section>
        </>}

        {tab === 'languages' && <section className="section page">
          <h1>{uiLang === 'ar' ? 'اكتشف لغة جديدة 🌍' : 'Discover a new language 🌍'}</h1>
          <p>{uiLang === 'ar' ? 'اختر اللغة التي تريد تعلمها.' : 'Choose the language you want to learn.'}</p>
          <div className="language-list">
            {languages.filter(item => item.name.includes(search)).map(item => (
              <button className="language-card" key={item.name} onClick={() => chooseLanguage(item.name)}>
                <span>{item.flag}</span>
                <b>{item.name}</b>
                <small>{item.level}</small>
                <small>{item.count}</small>
              </button>
            ))}
          </div>
        </section>}

        {tab === 'lessons' && <section className="section page">
          <h1>تعلم {language} 📚</h1>
          <p>{uiLang === 'ar' ? 'اختر مستواك وابدأ بالتعلم والاستماع.' : 'Choose your level and start learning.'}</p>

          <h2>{uiLang === 'ar' ? 'مستوى التعلم' : 'Learning Level'}</h2>
          <div className="language-list">
            <button className="language-card" onClick={() => setLessonLevel('beginner')}>🌱 {uiLang === 'ar' ? 'مبتدئ' : 'Beginner'} {lessonLevel === 'beginner' ? '✓' : ''}</button>
            <button className="language-card" onClick={() => setLessonLevel('intermediate')}>📘 {uiLang === 'ar' ? 'متوسط' : 'Intermediate'} {lessonLevel === 'intermediate' ? '✓' : ''}</button>
            <button className="language-card" onClick={() => setLessonLevel('advanced')}>🚀 {uiLang === 'ar' ? 'متقدم' : 'Advanced'} {lessonLevel === 'advanced' ? '✓' : ''}</button>
          </div>

          <h2>{uiLang === 'ar' ? 'مفردات وجمل المستوى' : 'Level Vocabulary and Sentences'}</h2>
          {lessonLevels[lessonLevel].map(item => (
            <div className="lesson-card" key={item.word}>
              <BookOpen/>
              <div>
                <b>{item.word}</b>
                <p>{item.meaning}</p>
                <small>{item.example}</small>
                <p>{item.translation}</p>
              </div>
              <button onClick={() => speak(item.word)} aria-label="استمع للنطق"><Volume2 size={18}/></button>
            </div>
          ))}
          <button className="primary" onClick={completeWord}>{uiLang === 'ar' ? 'إكمال الدرس وجمع 10 نقاط' : 'Complete Lesson and Earn 10 XP'} <CheckCircle/></button>
        </section>}

        {tab === 'quiz' && <section className="section page">
          <h1>{uiLang === 'ar' ? 'الاختبار التفاعلي 🧠' : 'Interactive Quiz 🧠'}</h1>
          <p>{uiLang === 'ar' ? 'اختبر معلوماتك في اللغة الإنجليزية واجمع النقاط.' : 'Test your English knowledge and earn points.'}</p>
          <h2>{uiLang === 'ar' ? 'اختر مستوى التعلم' : 'Choose Your Level'}</h2>
          <div className="language-list">
            <button className="language-card" onClick={() => changeLevel('beginner')}>🌱 {uiLang === 'ar' ? 'مبتدئ' : 'Beginner'} {level === 'beginner' ? '✓' : ''}</button>
            <button className="language-card" onClick={() => changeLevel('intermediate')}>📘 {uiLang === 'ar' ? 'متوسط' : 'Intermediate'} {level === 'intermediate' ? '✓' : ''}</button>
            <button className="language-card" onClick={() => changeLevel('advanced')}>🚀 {uiLang === 'ar' ? 'متقدم' : 'Advanced'} {level === 'advanced' ? '✓' : ''}</button>
          </div>
          <div className="lesson-card">
            <div>
              <small>السؤال {quizIndex + 1} من {currentQuestions.length}</small>
              <h2>{currentQuestions[quizIndex].question}</h2>
            </div>
          </div>
          <div className="language-list">
            {currentQuestions[quizIndex].options.map(option => (
              <button
                className="language-card"
                key={option}
                onClick={() => answerQuestion(option)}
                disabled={!!selected}
              >
                {option}
                {selected === option && (option === currentQuestions[quizIndex].answer ? ' ✓' : ' ✗')}
              </button>
            ))}
          </div>
          {feedback && <div className="lesson-card"><b>{feedback}</b></div>}
          <p>نتيجتك: {score} من {currentQuestions.length}</p>
          <button className="primary" onClick={nextQuestion}>
            {uiLang === 'ar' ? 'السؤال التالي' : 'Next Question'} <ArrowRight/>
          </button>
        </section>}

        {tab === 'translate' && <section className="section page">
          <h1>{uiLang === 'ar' ? 'الترجمة الذكية 🌐' : 'Smart Translation 🌐'}</h1>
          <p>{uiLang === 'ar' ? 'هذه الواجهة جاهزة، وسنربط خدمة الترجمة لاحقاً.' : 'This page is ready. Translation service will be connected later.'}</p>
          <textarea placeholder={uiLang === 'ar' ? 'اكتب النص الذي تريد ترجمته...' : 'Enter text to translate...'} />
          <button className="primary" onClick={() => alert(uiLang === 'ar' ? 'سنضيف الترجمة الذكية لاحقاً' : 'Smart translation will be added later')}>{uiLang === 'ar' ? 'ترجم النص' : 'Translate Text'}</button>
        </section>}

        {tab === 'chat' && <section className="section page">
          <h1>{uiLang === 'ar' ? 'محادثة AI' : 'AI Conversation'} 🤖</h1>
          <p>{uiLang === 'ar' ? 'تدرّب على اللغة التي تتعلمها. ربط المساعد الذكي سيكون في خطوة لاحقة.' : 'Practice the language you are learning. AI assistant will be connected later.'}</p>
          <textarea placeholder={uiLang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
          <button className="primary" onClick={() => alert('سنربط المساعد الذكي لاحقاً')}>{uiLang === 'ar' ? 'إرسال' : 'Send'}</button>
        </section>}
        {updateInfo && (
          <div className="update-overlay">
            <div className="update-modal">
              <div className="update-icon">🚀</div>
              <h2>{uiLang === 'ar' ? 'تحديث جديد متوفر!' : 'New Update Available!'}</h2>
              <p>
                {uiLang === 'ar'
                  ? `الإصدار الجديد ${updateInfo.version} أصبح متاحاً. حدّث التطبيق للاستفادة من التحسينات.`
                  : `Version ${updateInfo.version} is available. Update the app to get the latest improvements.`}
              </p>
              <button className="primary" onClick={() => Browser.open({ url: updateInfo.url })}>
                {uiLang === 'ar' ? 'تحديث الآن' : 'Update Now'}
              </button>
              <button className="update-later" onClick={() => setUpdateInfo(null)}>
                {uiLang === 'ar' ? 'لاحقاً' : 'Later'}
              </button>
            </div>
          </div>
        )}

      </main>

      <nav className="bottom-nav">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}><Home/><small>{uiLang === 'ar' ? 'الرئيسية' : 'Home'}</small></button>
        <button className={tab === 'languages' || tab === 'lessons' ? 'active' : ''} onClick={() => setTab('languages')}><BookOpen/><small>{uiLang === 'ar' ? 'التعلم' : 'Learn'}</small></button>
        <button className={tab === 'translate' ? 'active' : ''} onClick={() => setTab('translate')}><Languages/><small>{uiLang === 'ar' ? 'الترجمة' : 'Translate'}</small></button>
        <button className={tab === 'chat' ? 'active' : ''} onClick={() => setTab('chat')}><MessageCircle/><small>{uiLang === 'ar' ? 'المحادثة' : 'Chat'}</small></button>
        <button className={tab === 'quiz' ? 'active' : ''} onClick={() => setTab('quiz')}><CheckCircle/><small>{uiLang === 'ar' ? 'الاختبار' : 'Quiz'}</small></button>
      </nav>
      </>)}
    </div>
  )
}

export default App
