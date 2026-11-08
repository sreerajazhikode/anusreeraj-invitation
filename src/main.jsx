import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

export const weddingData = {
  bride: { name: 'അനുശ്രീ മോഹൻ', father: 'മോഹനൻ എ പി', mother: 'ബിന്ദു മോഹ', house: 'ആശാരിപറമ്പിൽ ഹൗസ്', address: ['വള്ളിക്കാട്', 'പി ഒ വഴിക്കടവ് ', 'മലപ്പുറം - 679333'] },
  groom: { name: 'ശ്രീരാജ് കെ', father: 'കണ്ണപുരക്കാരൻ സുരേശ', mother: 'വത്സല പി പി', house: 'കണ്ണപുരക്കാരൻ ഹൗസ്', address: ['വൻകുളത്ത് വയൽ', 'പി ഒ അഴീക്കോട്', 'കണ്ണൂർ - 670009'] },
  wedding: { date: '04 ഏപ്രിൽ 2027', day: 'ഞായറാഴ്ച', time: 'ഉച്ചയ്ക്ക് 11 മണി മുതൽ', venue: 'വധൂ ഗൃഹം', location: 'വഴിക്കടവ്', mapUrl: 'https://maps.app.goo.gl/dbYHzCtmvpNHADSv6' },
  groomReception: { date: '04 ഏപ്രിൽ 2027', time: 'വൈകിട്ട് 5 മണി മുതൽ 9 മണി വരെ', venue: 'വരന്റെ വീട്ടിൽ', mapUrl: 'https://maps.app.goo.gl/VRp4pXDLXrNSUv7e8' },
  engagement: { url: 'https://album-two-opal.vercel.app/' },
  closing: { family: 'വേദമിത്ര · വൈഭവ് · അനുഷ · സുസ്മിത · സുഭീഷ്‌നാഥ്  ', signature: 'അനുശ്രീരാജ്' },
};

export const weddingDataEn = {
  bride: { name: 'Anusree Mohan', father: 'Mohanan A P', mother: 'Bindu Moha', house: 'Asharipparambil House', address: ['Vallikkad', 'P.O. Vazhikkadavu', 'Malappuram - 679333'] },
  groom: { name: 'Sreeraj K', father: 'Kannapurakkaran Suresa', mother: 'Valsala P P', house: 'Kannapurakkaran House', address: ['Vankulathu Vayal', 'P.O. Azhikode', 'Kannur - 670009'] },
  wedding: { date: '04 April 2027', day: 'Sunday', time: 'From 11 noon', venue: "Bride's Residence", location: 'Vazhikkadavu', mapUrl: weddingData.wedding.mapUrl },
  groomReception: { date: '04 April 2027', time: '5 PM to 9 PM', venue: "At the groom's residence", mapUrl: weddingData.groomReception.mapUrl },
  engagement: weddingData.engagement,
  closing: { family: 'Vedamithra · Vaibhav · Anusha · Susmitha · Subishnath', signature: 'Anu Sree Raj' },
};

// All visible text, per language
const CONTENT = {
  ml: {
    data: weddingData,
    pages: ['സ്വാഗതം', 'വധൂവരന്മാർ', 'വിവാഹദിനം', 'കല്യാണ സൽക്കാരം', 'വരന്റെ സൽക്കാരം', 'ക്ഷണം', 'ഓർമ്മകൾ', 'മംഗളാശംസകൾ'],
    langSwitch: 'English',
    langSwitchLabel: 'Read in English',
    gate: {
      eyebrow: 'ഒരു ചെറിയ രഹസ്യം',
      title: 'എന്നാണു ആ ദിവസം?',
      lead: 'Scratch Here, നിങ്ങൾ തന്നെ കണ്ടു പിടിക്കൂ!',
      hint: 'Scratch Here...',
      cardLabel: 'വിവാഹ തീയതി കാണാൻ ഈ കാർഡ് scratch ചെയ്യുക',
      reveal: 'തീയതി കാണിക്കുക',
      progress: 'Scratching',
      enter: 'ക്ഷണപത്രം തുറക്കുക',
    },
    scrollNext: 'അടുത്ത പേജ്',
    hero: { eyebrow: 'ക്ഷണപത്രം ', title: 'മാംഗല്യം', lines: ['ഞങ്ങളുടെ സന്തോഷത്തിൽ പങ്കുചേരാൻ', 'എല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.'], photoAlt: 'വധൂവരന്മാരുടെ ചിത്രം', next: 'അടുത്ത പേജിലേക്ക് പോകുക' },
    couple: { eyebrow: 'ഞങ്ങളുടെ പ്രണയ കഥയുടെ', title: 'പുതിയ അദ്ധ്യായം', lead: 'രണ്ട് ഹൃദയങ്ങൾ ഒന്നായി പുതിയ ജീവിതത്തിലേക്ക് കടക്കുന്നു ', brideAlt: 'വധു അനുശ്രീ മോഹൻ', groomAlt: 'വരൻ ശ്രീരാജ് കെ' },
    brideParents: (b) => <>{b.father}യുടെയും<br />{b.mother}ന്റെയും മകൾ</>,
    groomParents: (g) => <>{g.father}ന്റെയും<br />{g.mother}യുടെയും മകൻ</>,
    date: { eyebrow: 'നിങ്ങൾ കണ്ടു പിടിച്ച രഹസ്യം', title: 'ആ ദിവസം ഇതാ!', lead: 'ഞങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ഈ ദിവസം മാറ്റിവയ്ക്കൂ.' },
    wedding: { eyebrow: 'ഒന്നിച്ചുള്ള ജീവിതത്തിലേക്ക്', title: 'കല്യാണ സൽക്കാരം' },
    reception: { eyebrow: 'സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു', title: 'വരന്റെ സൽക്കാരം', photoAlt: 'വധൂവരന്മാരുടെ ഓർമ്മച്ചിത്രം' },
    directions: 'വഴി കാണുക',
    photoPending: 'ചിത്രം പിന്നീട് ചേർക്കും',
    message: { title: 'നിങ്ങളും നിങ്ങളുടെ കുടുംബസമേതവും', lines: ['ഞങ്ങളുടെ ഈ സന്തോഷാഘോഷത്തിൽ', 'പങ്കുചേരുവാൻ സാദരം ക്ഷണിക്കുന്നു.'], photoAlt: 'വധൂവരന്മാരുടെ ചിത്രം' },
    memories: { eyebrow: 'മനോഹര നിമിഷങ്ങൾ', title: 'ഞങ്ങളുടെ Engagement ഓർമ്മകൾ', lead: ['ഞങ്ങളുടെ മനോഹരമായ Engagement നിമിഷങ്ങൾ', 'കാണുവാൻ താഴെയുള്ള ലിങ്കിൽ ക്ലിക്ക് ചെയ്യുക.'], button: 'ഓർമ്മകളിലേക്ക് പോകാം', photoAlt: 'നിശ്ചയത്തിന്റെ സന്തോഷ നിമിഷം' },
    closing: { eyebrow: 'സ്നേഹത്തോടെ', title: 'സൗഹാർദ്ദപൂർവ്വം', and: 'എന്ന്', photoAlt: 'അനുശ്രീയും ശ്രീരാജും' },
    music: { off: 'സംഗീതം നിർത്തുക', on: 'സംഗീതം പ്ലേ ചെയ്യുക', mute: 'മ്യൂട്ട്', sound: 'ശബ്ദം', unmuteLabel: 'ശബ്ദം പുനഃസ്ഥാപിക്കുക', muteLabel: 'മ്യൂട്ട് ചെയ്യുക', hint: 'സംഗീതം കേൾക്കാൻ അമർത്തൂ' },
    navLabel: 'ക്ഷണക്കത്തിന്റെ പേജുകൾ',
  },
  en: {
    data: weddingDataEn,
    pages: ['Welcome', 'Bride & Groom', 'The Day', 'Wedding Reception', "Groom's Reception", 'Invitation', 'Memories', 'Blessings'],
    langSwitch: 'മലയാളം',
    langSwitchLabel: 'മലയാളത്തിൽ വായിക്കുക',
    gate: {
      eyebrow: 'A little secret',
      title: 'When is the big day?',
      lead: 'Scratch the card and find out!',
      hint: 'Scratch here...',
      cardLabel: 'Scratch this card to reveal the wedding date',
      reveal: 'Show the date',
      progress: 'Scratched',
      enter: 'Open the invitation',
    },
    scrollNext: 'Next page',
    hero: { eyebrow: 'Wedding Invitation', title: 'Mangalyam', lines: ['Please join us in our happiness.', 'We warmly invite you all.'], photoAlt: 'Photo of the bride and groom', next: 'Go to the next page' },
    couple: { eyebrow: 'A new chapter of', title: 'Our Love Story', lead: 'Two hearts become one as they step into a new life', brideAlt: 'Bride Anusree Mohan', groomAlt: 'Groom Sreeraj K' },
    brideParents: (b) => <>Daughter of<br />{b.father} &amp; {b.mother}</>,
    groomParents: (g) => <>Son of<br />{g.father} &amp; {g.mother}</>,
    date: { eyebrow: 'The secret you uncovered', title: 'Here is the day!', lead: 'Save this date to celebrate with us.' },
    wedding: { eyebrow: 'Into a life together', title: 'Wedding Reception' },
    reception: { eyebrow: 'With love, we invite you', title: "Groom's Reception", photoAlt: 'A memorable photo of the couple' },
    directions: 'Get directions',
    photoPending: 'Photo coming soon',
    message: { title: 'You and your family are invited', lines: ['To share in the joy of our celebration,', 'we warmly invite you.'], photoAlt: 'Photo of the bride and groom' },
    memories: { eyebrow: 'Beautiful moments', title: 'Our Engagement Memories', lead: ['To see our beautiful Engagement moments,', 'click the link below.'], button: 'Visit our memories', photoAlt: 'A happy moment from the engagement' },
    closing: { eyebrow: 'With love', title: 'With warm regards', and: 'from', photoAlt: 'Anusree and Sreeraj' },
    music: { off: 'Pause music', on: 'Play music', mute: 'Muted', sound: 'Sound on', unmuteLabel: 'Unmute', muteLabel: 'Mute', hint: 'Tap to play music' },
    navLabel: 'Invitation pages',
  },
};

// Background images cycled across pages (couple photos)
const BG_IMAGES = [
  '/assets/couple-main.jpg',
  '/assets/couple-1.jpg',
  '/assets/couple-2.jpg',
  '/assets/couple-main.jpg',
  '/assets/couple-3.jpg',
  '/assets/couple-4.jpg',
  '/assets/couple-5.jpg',
  '/assets/couple-6.jpg',
];

const SCRATCH_THRESHOLD = 0.45;
const LANG_KEY = 'wedding-lang';

// ── Petal rain symbols ────────────────────────────────────────────────
const PETAL_SYMBOLS = ['❀', '✿', '❁', '✾', '✽', '❃', '❋'];

function FlowerRain() {
  // Generate 22 petals with staggered positions/timings
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    symbol: PETAL_SYMBOLS[i % PETAL_SYMBOLS.length],
    left: `${(i * 4.7 + Math.sin(i * 1.3) * 8 + 2) % 96}%`,
    duration: `${6 + (i % 7) * 1.1}s`,
    delay: `${(i * 0.55) % 8}s`,
    fontSize: `${0.85 + (i % 5) * 0.18}rem`,
    opacity: 0.55 + (i % 4) * 0.1,
  }));
  return (
    <div className="flower-rain" aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.fontSize,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

// ── Per-page background ──────────────────────────────────────────────
function PageBg({ src }) {
  return (
    <div className="page-bg">
      <img src={src} alt="" aria-hidden="true" loading="lazy" />
    </div>
  );
}

function DecorativeBorder({ children, className = '' }) { return <div className={`frame ${className}`}><div className="frame-inner">{children}</div></div>; }
function SectionTitle({ children, eyebrow }) { return <header className="section-title">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{children}</h2><div className="ornament" aria-hidden="true"><i />❈<i /></div></header>; }
function CouplePhoto({ src, alt, pending, className = '' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`photo-shell ${className}`}>{!failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="photo-placeholder" role="img" aria-label={`${alt} — ${pending}`}><span className="placeholder-flower">❀</span><small>{pending}</small></div>}</div>;
}
function LocationCard({ title, subtitle, date, time, mapUrl, directions }) { return <article className="location-card"><span className="lamp" aria-hidden="true">♧</span>{date && <p className="event-date">{date}</p>}<h3>{title}</h3>{subtitle && <p>{subtitle}</p>}{time && <p>{time}</p>}<a className="gold-button" href={mapUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌖</span> {directions}</a></article>; }

function DateCard({ wedding }) {
  return <div className="scratch-card is-revealed"><div className="scratch-message"><span className="date-sparkle">✧</span><strong>{wedding.date}</strong><span>{wedding.day}</span></div></div>;
}

// ── Scratch card (used in the entry gate) ─────────────────────────────
function ScratchCard({ t, onReveal }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const lastMeasure = useRef(0);
  const done = useRef(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { wedding } = t.data;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#d7c08b'); gradient.addColorStop(.5, '#eee0ba'); gradient.addColorStop(1, '#c5a86d');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = 'rgba(92,48,51,.74)'; ctx.font = '500 18px "Noto Serif Malayalam", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(t.gate.hint, rect.width / 2, rect.height / 2);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 48; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  }, [t]);

  const reveal = () => { if (done.current) return; done.current = true; setRevealed(true); setProgress(1); onReveal(); };
  const measure = () => {
    const canvas = canvasRef.current; if (!canvas || done.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 28) { total++; if (data[i] < 40) clear++; }
    const ratio = clear / total; setProgress(ratio);
    if (ratio >= SCRATCH_THRESHOLD) reveal();
  };
  const point = (e) => { const r = canvasRef.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const scratch = (e) => {
    if (!drawing.current || done.current) return;
    const ctx = canvasRef.current.getContext('2d'); const p = point(e); const from = last.current || p;
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(p.x + 0.01, p.y); ctx.stroke(); last.current = p;
    const now = performance.now(); if (now - lastMeasure.current > 120) { lastMeasure.current = now; measure(); }
  };
  const stop = () => { if (!drawing.current) return; drawing.current = false; last.current = null; measure(); };
  const shown = Math.min(progress / SCRATCH_THRESHOLD, 1);

  return <>
    <div className={`scratch-card gate-card ${revealed ? 'is-revealed' : ''}`}>
      <div className="scratch-message"><span className="date-sparkle">✧</span><strong>{wedding.date}</strong><span>{wedding.day}</span></div>
      <canvas ref={canvasRef} className={revealed ? 'scratched-off' : ''} aria-label={t.gate.cardLabel}
        onPointerDown={(e) => { drawing.current = true; last.current = null; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={scratch} onPointerUp={stop} onPointerCancel={stop} />
      {!revealed && <button className="reveal-button" onClick={reveal}>{t.gate.reveal}</button>}
    </div>
    <div className="scratch-progress" role="progressbar" aria-label={t.gate.progress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(shown * 100)}>
      <span style={{ width: `${shown * 100}%` }} />
    </div>
  </>;
}

// ── Entry gate: language popup → scratch to reveal the date ───────────
function ScratchStage({ t, onEnter }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (!revealed) return; const id = setTimeout(onEnter, 3000); return () => clearTimeout(id); }, [revealed, onEnter]);
  return <div className="gate-panel">
    <SectionTitle eyebrow={t.gate.eyebrow}>{t.gate.title}</SectionTitle>
    <p className="lead">{t.gate.lead}</p>
    <ScratchCard t={t} onReveal={() => setRevealed(true)} />
    <div className="gate-actions">{revealed && <button className="gold-button gate-enter" onClick={onEnter}>{t.gate.enter}</button>}</div>
  </div>;
}

function LanguagePopup({ onChoose }) {
  return <div className="gate-panel lang-popup" role="group" aria-labelledby="lang-title">
    <span className="lamp" aria-hidden="true">❈</span>
    <h2 id="lang-title">ഈ ക്ഷണക്കത്ത് ഇംഗ്ലീഷിൽ വായിക്കണോ?</h2>
    <p>Would you like to read this invitation in English?</p>
    <div className="lang-options">
      <button className="gold-button" onClick={() => onChoose('en')}>English</button>
      <button className="gold-button outline" onClick={() => onChoose('ml')}>മലയാളം</button>
    </div>
  </div>;
}

function Gate({ stage, t, onChoose, onEnter }) {
  return <div className={`gate ${stage === 'leaving' ? 'gate-out' : ''}`} role="dialog" aria-modal="true">
    <FlowerRain />
    {stage === 'lang' ? <LanguagePopup onChoose={onChoose} /> : <ScratchStage key={t.langSwitch} t={t} onEnter={onEnter} />}
  </div>;
}

function MusicControl({ t }) {
  const audioRef = useRef(null); const [playing, setPlaying] = useState(false); const [muted, setMuted] = useState(false); const [needsGesture, setNeedsGesture] = useState(false);
  const play = async () => { try { await audioRef.current.play(); setPlaying(true); setNeedsGesture(false); localStorage.setItem('wedding-music', 'on'); } catch { setNeedsGesture(true); } };
  useEffect(() => { const a = audioRef.current; a.volume = .35; if (localStorage.getItem('wedding-music') !== 'off') play(); const first = () => { if (localStorage.getItem('wedding-music') !== 'off') play(); }; window.addEventListener('pointerdown', first, { once: true }); window.addEventListener('keydown', first, { once: true }); return () => { window.removeEventListener('pointerdown', first); window.removeEventListener('keydown', first); }; }, []);
  const toggle = async () => { if (playing) { audioRef.current.pause(); setPlaying(false); localStorage.setItem('wedding-music', 'off'); } else await play(); };
  return <div className="music-wrap"><audio ref={audioRef} src="/assets/background-music.mp3" loop onError={() => { setPlaying(false); setNeedsGesture(false); }} />{needsGesture && <span className="music-hint">{t.music.hint}</span>}<button className="music-control" aria-label={`${playing ? t.music.off : t.music.on}; ${muted ? t.music.mute : t.music.sound}`} onClick={toggle}>{playing ? '♫' : '♪'}</button><button className="mute-control" aria-label={muted ? t.music.unmuteLabel : t.music.muteLabel} onClick={() => { const next = !muted; setMuted(next); audioRef.current.muted = next; }}>{muted ? '×' : '·'}</button></div>;
}

function PageNavigation({ active, goTo, t }) { return <nav className="page-dots" aria-label={t.navLabel}>{t.pages.map((label, i) => <button key={label} className={active === i ? 'active' : ''} aria-label={`${i + 1}. ${label}`} aria-current={active === i ? 'step' : undefined} onClick={() => goTo(i)}><span>{label}</span></button>)}</nav>; }

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'ml');
  // Gate shows on every visit: ask language (first visit only) → scratch → open
  const [stage, setStage] = useState(() => localStorage.getItem(LANG_KEY) ? 'scratch' : 'lang');
  const [active, setActive] = useState(0); const sectionRefs = useRef([]);
  const t = CONTENT[lang]; const d = t.data;
  const gateOpen = stage !== 'done';

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { document.body.style.overflow = gateOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [gateOpen]);
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(Number(e.target.dataset.page)); }), { threshold: .55 }); sectionRefs.current.forEach(s => s && observer.observe(s)); return () => observer.disconnect(); }, []);
  const goTo = (i) => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const chooseLang = (l) => { localStorage.setItem(LANG_KEY, l); setLang(l); setStage(s => s === 'lang' ? 'scratch' : s); };
  const toggleLang = () => chooseLang(lang === 'ml' ? 'en' : 'ml');
  const enter = React.useCallback(() => { setStage(s => s === 'scratch' ? 'leaving' : s); }, []);
  useEffect(() => { if (stage !== 'leaving') return; const id = setTimeout(() => setStage('done'), 700); return () => clearTimeout(id); }, [stage]);

  return <>
    {gateOpen && <Gate stage={stage} t={t} onChoose={chooseLang} onEnter={enter} />}
    {stage !== 'lang' && <button className="lang-toggle" onClick={toggleLang} aria-label={t.langSwitchLabel} lang={lang === 'ml' ? 'en' : 'ml'}>{t.langSwitch}</button>}
    <FlowerRain />
    <PageNavigation active={active} goTo={goTo} t={t} /><MusicControl t={t} />
    {active < t.pages.length - 1 && <button className="next-page" onClick={() => goTo(active + 1)} aria-label={t.scrollNext}>↓</button>}
    <main>
      {/* PAGE 0 — Hero */}
      <section className="page hero" data-page="0" ref={el => sectionRefs.current[0] = el}>
        <PageBg src={BG_IMAGES[0]} />
        <div className="hero-photo" aria-hidden="true"><CouplePhoto src="/assets/couple-main.jpg" alt={t.hero.photoAlt} pending={t.photoPending} /></div>
        <DecorativeBorder className="hero-frame">
          <div className="hero-copy">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1>{t.hero.title}</h1>
            <div className="ornament" aria-hidden="true"><i />❈<i /></div>
            <p className="name">{d.bride.name}</p>
            <span className="ampersand">&</span>
            <p className="name">{d.groom.name}</p>
            <p className="invite-line">{t.hero.lines[0]}<br />{t.hero.lines[1]}</p>
            <button className="scroll-cue" onClick={() => goTo(1)} aria-label={t.hero.next}>↓</button>
          </div>
        </DecorativeBorder>
      </section>

      {/* PAGE 1 — Couple introduction */}
      <section className="page couple-page" data-page="1" ref={el => sectionRefs.current[1] = el}>
        <PageBg src={BG_IMAGES[1]} />
        <SectionTitle eyebrow={t.couple.eyebrow}>{t.couple.title}</SectionTitle>
        <p className="lead">{t.couple.lead}</p>
        <div className="couple-grid">
          <article className="person">
            <CouplePhoto src="/assets/bride.jpg" alt={t.couple.brideAlt} pending={t.photoPending} />
            <h3>{d.bride.name}</h3>
            <p>{t.brideParents(d.bride)}</p>
            <address>{d.bride.house}<br />{d.bride.address.map(a => <React.Fragment key={a}>{a}<br /></React.Fragment>)}</address>
          </article>
          <span className="between-ornament" aria-hidden="true">❈</span>
          <article className="person">
            <CouplePhoto src="/assets/groom.jpg" alt={t.couple.groomAlt} pending={t.photoPending} className="landscape" />
            <h3>{d.groom.name}</h3>
            <p>{t.groomParents(d.groom)}</p>
            <address>{d.groom.house}<br />{d.groom.address.map(a => <React.Fragment key={a}>{a}<br /></React.Fragment>)}</address>
          </article>
        </div>
      </section>

      {/* PAGE 2 — The date (revealed at the entry gate) */}
      <section className="page scratch-page" data-page="2" ref={el => sectionRefs.current[2] = el}>
        <PageBg src={BG_IMAGES[2]} />
        <SectionTitle eyebrow={t.date.eyebrow}>{t.date.title}</SectionTitle>
        <p className="lead">{t.date.lead}</p>
        <DateCard wedding={d.wedding} />
      </section>

      {/* PAGE 3 — Wedding event */}
      <section className="page event-page" data-page="3" ref={el => sectionRefs.current[3] = el}>
        <PageBg src={BG_IMAGES[3]} />
        <SectionTitle eyebrow={t.wedding.eyebrow}>{t.wedding.title}</SectionTitle>
        <LocationCard title={d.wedding.venue} subtitle={d.wedding.location} date={d.wedding.date + ' · ' + d.wedding.day} time={d.wedding.time} mapUrl={d.wedding.mapUrl} directions={t.directions} />
      </section>

      {/* PAGE 4 — Groom's reception */}
      <section className="page event-page groom-event" data-page="4" ref={el => sectionRefs.current[4] = el}>
        <PageBg src={BG_IMAGES[4]} />
        <SectionTitle eyebrow={t.reception.eyebrow}>{t.reception.title}</SectionTitle>
        <LocationCard title={d.groomReception.venue} date={d.groomReception.date} time={d.groomReception.time} mapUrl={d.groomReception.mapUrl} directions={t.directions} />
        <CouplePhoto className="side-photo" src="/assets/couple-3.jpg" alt={t.reception.photoAlt} pending={t.photoPending} />
      </section>

      {/* PAGE 5 — Invitation message */}
      <section className="page message-page" data-page="5" ref={el => sectionRefs.current[5] = el}>
        <PageBg src={BG_IMAGES[5]} />
        <CouplePhoto className="message-photo" src="/assets/couple-4.jpg" alt={t.message.photoAlt} pending={t.photoPending} />
        <DecorativeBorder>
          <div className="message-copy">
            <SectionTitle>{t.message.title}</SectionTitle>
            <p>{t.message.lines[0]}</p>
            <p>{t.message.lines[1]}</p>
          </div>
        </DecorativeBorder>
      </section>

      {/* PAGE 6 — Engagement memories */}
      <section className="page memories-page" data-page="6" ref={el => sectionRefs.current[6] = el}>
        <PageBg src={BG_IMAGES[6]} />
        <CouplePhoto className="memories-photo" src="/assets/couple-5.jpg" alt={t.memories.photoAlt} pending={t.photoPending} />
        <DecorativeBorder>
          <SectionTitle eyebrow={t.memories.eyebrow}>{t.memories.title}</SectionTitle>
          <p className="lead">{t.memories.lead[0]}<br />{t.memories.lead[1]}</p>
          <a className="gold-button" href={d.engagement.url} target="_blank" rel="noopener noreferrer">{t.memories.button} <span aria-hidden="true">↗</span></a>
        </DecorativeBorder>
      </section>

      {/* PAGE 7 — Closing */}
      <section className="page closing-page" data-page="7" ref={el => sectionRefs.current[7] = el}>
        <PageBg src={BG_IMAGES[7]} />
        <CouplePhoto className="closing-photo" src="/assets/couple-6.jpg" alt={t.closing.photoAlt} pending={t.photoPending} />
        <DecorativeBorder>
          <div className="closing-copy">
            <span className="eyebrow">{t.closing.eyebrow}</span>
            <h2>{t.closing.title}</h2>
            <p>{d.closing.family}</p>
            <span className="closing-and">{t.closing.and}</span>
            <h1>{d.closing.signature}</h1>
            <div className="ornament" aria-hidden="true"><i />❈<i /></div>
            <button className="back-top" onClick={() => goTo(0)}>↑</button>
          </div>
        </DecorativeBorder>
      </section>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
