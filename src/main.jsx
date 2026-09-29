import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

export const weddingData = {
  bride: { name: 'അനുശ്രീ മോഹൻ', father: 'മോഹനൻ എ പി', mother: 'ബിന്ദു മോഹ', house: 'ആശാരിപറമ്പിൽ ഹൗസ്', address: ['വള്ളിക്കാട്', 'പി ഒ വഴിക്കടവ് ', 'മലപ്പുറം - 679333'] },
  groom: { name: 'ശ്രീരാജ് കെ', father: 'കണ്ണപുരക്കാരൻ സുരേശ', mother: 'വത്സല പി പി', house: 'കണ്ണപുരക്കാരൻ ഹൗസ്', address: ['വൻകുളത്ത് വയൽ', 'പി ഒ അഴീക്കോട്', 'കണ്ണൂർ - 670009'] },
  wedding: { date: '10 ഏപ്രിൽ 2027', day: 'ശനിയാഴ്ച', time: 'ഉച്ചയ്ക്ക് 12 മണി മുതൽ', venue: 'ക്രൈസ്റ്റ് ദി കിംഗ് പാരിഷ് ഹാൾ', location: 'വഴിക്കടവ്', mapUrl: 'https://maps.app.goo.gl/dbYHzCtmvpNHADSv6' },
  groomReception: { date: '11 ഏപ്രിൽ 2027', time: 'വൈകിട്ട് 4 മണി മുതൽ 8 മണി വരെ', venue: 'ചെക്കന്റെ വീട്ടിൽ', mapUrl: 'https://maps.app.goo.gl/VRp4pXDLXrNSUv7e8' },
  engagement: { url: 'https://album-two-opal.vercel.app/' },
  closing: { family: 'വേദമിത്ര · വൈഭവ് · അനുഷ · സുസ്മിത · സുഭീഷ്‌നാഥ്  ', signature: 'അനുശ്രീരാജ്' },
};

const pages = ['സ്വാഗതം', 'വധൂവരന്മാർ', 'വിവാഹദിനം', 'കല്യാണ സൽക്കാരം', 'വരന്റെ സൽക്കാരം', 'ക്ഷണം', 'ഓർമ്മകൾ', 'മംഗളാശംസകൾ'];
const SCRATCH_THRESHOLD = 0.45;

function DecorativeBorder({ children, className = '' }) { return <div className={`frame ${className}`}><div className="frame-inner">{children}</div></div>; }
function SectionTitle({ children, eyebrow }) { return <header className="section-title">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{children}</h2><div className="ornament" aria-hidden="true"><i />❈<i /></div></header>; }
function CouplePhoto({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`photo-shell ${className}`}>{!failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="photo-placeholder" role="img" aria-label={`${alt} — ചിത്രം പിന്നീട് ചേർക്കും`}><span className="placeholder-flower">❀</span><small>ചിത്രം പിന്നീട് ചേർക്കും</small></div>}</div>;
}
function LocationCard({ title, subtitle, date, time, mapUrl }) { return <article className="location-card"><span className="lamp" aria-hidden="true">♧</span>{date && <p className="event-date">{date}</p>}<h3>{title}</h3>{subtitle && <p>{subtitle}</p>}{time && <p>{time}</p>}<a className="gold-button" href={mapUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌖</span> വഴി കാണുക</a></article>; }

function ScratchCard({ onReveal }) {
  const canvasRef = useRef(null); const drawing = useRef(false); const scheduled = useRef(false); const [revealed, setRevealed] = useState(() => localStorage.getItem('wedding-date-revealed') === 'true'); const [progress, setProgress] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true }); const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height); gradient.addColorStop(0, '#d7c08b'); gradient.addColorStop(.5, '#eee0ba'); gradient.addColorStop(1, '#c5a86d');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, rect.width, rect.height); ctx.fillStyle = 'rgba(92,48,51,.74)'; ctx.font = '500 18px "Noto Serif Malayalam", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ഇവിടെ ഒന്ന് ചുരണ്ടി നോക്കൂ...', rect.width / 2, rect.height / 2);
    ctx.globalCompositeOperation = 'destination-out';
  }, []);
  const point = (event) => { const canvas = canvasRef.current; const r = canvas.getBoundingClientRect(); return { x: event.clientX-r.left, y: event.clientY-r.top }; };
  const scratch = (event) => { if (!drawing.current || revealed) return; const ctx = canvasRef.current.getContext('2d'); const p = point(event); ctx.beginPath(); ctx.arc(p.x,p.y,23,0,Math.PI*2); ctx.fill(); if(!scheduled.current){scheduled.current=true;requestAnimationFrame(()=>{scheduled.current=false;measure();});} };
  const measure = () => { const canvas = canvasRef.current; if (!canvas || revealed) return; const ctx = canvas.getContext('2d', {willReadFrequently:true}); const {data}=ctx.getImageData(0,0,canvas.width,canvas.height); let clear=0; for(let i=3;i<data.length;i+=4) if(data[i]<40) clear++; const ratio=clear/(data.length/4); setProgress(ratio); if(ratio>=SCRATCH_THRESHOLD) reveal(); };
  const reveal = () => { setRevealed(true); localStorage.setItem('wedding-date-revealed','true'); onReveal(); };
  return <div className={`scratch-card ${revealed?'is-revealed':''}`}><div className="scratch-message"><span className="date-sparkle">✧</span><strong>{weddingData.wedding.date}</strong><span>{weddingData.wedding.day}</span></div>{!revealed && <canvas ref={canvasRef} aria-label="വിവാഹ തീയതി കാണാൻ ഈ കാർഡ് ചുരണ്ടുക" onPointerDown={(e)=>{drawing.current=true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e);}} onPointerMove={(e)=>{scratch(e); if(drawing.current && progress<.1) requestAnimationFrame(measure);}} onPointerUp={()=>{drawing.current=false; measure();}} onPointerCancel={()=>{drawing.current=false; measure();}} onPointerLeave={()=>{if(drawing.current){drawing.current=false;measure();}}} />}{!revealed && <button className="reveal-button" onClick={reveal}>തീയതി കാണിക്കുക</button>}</div>;
}

function MusicControl() {
  const audioRef = useRef(null); const [playing,setPlaying] = useState(false); const [muted,setMuted] = useState(false); const [needsGesture,setNeedsGesture] = useState(false);
  const play = async () => { try { await audioRef.current.play(); setPlaying(true); setNeedsGesture(false); localStorage.setItem('wedding-music','on'); } catch { setNeedsGesture(true); } };
  useEffect(() => { const a=audioRef.current; a.volume=.35; if(localStorage.getItem('wedding-music')!=='off') play(); const first=()=>{if(localStorage.getItem('wedding-music')!=='off') play();}; window.addEventListener('pointerdown',first,{once:true}); window.addEventListener('keydown',first,{once:true}); return ()=>{window.removeEventListener('pointerdown',first);window.removeEventListener('keydown',first);}; },[]);
  const toggle = async () => { if(playing){audioRef.current.pause();setPlaying(false);localStorage.setItem('wedding-music','off');}else await play(); };
  return <div className="music-wrap"><audio ref={audioRef} src="/assets/background-music.mp3" loop onError={()=>{setPlaying(false);setNeedsGesture(false);}} />{needsGesture&&<span className="music-hint">സംഗീതം കേൾക്കാൻ അമർത്തൂ</span>}<button className="music-control" aria-label={`${playing?'സംഗീതം നിർത്തുക':'സംഗീതം പ്ലേ ചെയ്യുക'}; ${muted?'മ്യൂട്ട്':'ശബ്ദം'}`} onClick={toggle}>{playing?'♫':'♪'}</button><button className="mute-control" aria-label={muted?'ശബ്ദം പുനഃസ്ഥാപിക്കുക':'മ്യൂട്ട് ചെയ്യുക'} onClick={()=>{const next=!muted;setMuted(next);audioRef.current.muted=next;}}>{muted?'×':'·'}</button></div>;
}
function PageNavigation({ active, goTo }) { return <nav className="page-dots" aria-label="ക്ഷണക്കത്തിന്റെ പേജുകൾ">{pages.map((label,i)=><button key={label} className={active===i?'active':''} aria-label={`${i+1}. ${label}`} aria-current={active===i?'step':undefined} onClick={()=>goTo(i)}><span>{label}</span></button>)}</nav>; }

function App() {
  const [active,setActive]=useState(0); const [celebrate,setCelebrate]=useState(false); const sectionRefs=useRef([]);
  useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(Number(e.target.dataset.page));}),{threshold:.55});sectionRefs.current.forEach(s=>s&&observer.observe(s));return()=>observer.disconnect();},[]);
  const goTo=(i)=>sectionRefs.current[i]?.scrollIntoView({behavior:'smooth',block:'start'});
  return <>
    <PageNavigation active={active} goTo={goTo}/><MusicControl/>
    <main>
      <section className="page hero" data-page="0" ref={el=>sectionRefs.current[0]=el}><div className="hero-photo" aria-hidden="true"><CouplePhoto src="/assets/couple-main.jpg" alt="വധൂവരന്മാരുടെ ചിത്രം"/></div><DecorativeBorder className="hero-frame"><div className="hero-copy"><span className="eyebrow">മംഗളകരമായ ക്ഷണം</span><h1>മാംഗല്യം</h1><div className="ornament" aria-hidden="true"><i/>❈<i/></div><p className="name">{weddingData.bride.name}</p><span className="ampersand">&</span><p className="name">{weddingData.groom.name}</p><p className="invite-line">ഞങ്ങളുടെ സന്തോഷത്തിൽ പങ്കുചേരാൻ<br/>എല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.</p><button className="scroll-cue" onClick={()=>goTo(1)} aria-label="അടുത്ത പേജിലേക്ക് പോകുക">↓</button></div></DecorativeBorder></section>
      <section className="page couple-page" data-page="1" ref={el=>sectionRefs.current[1]=el}><SectionTitle eyebrow="ഞങ്ങളുടെ പ്രണയ കഥയുടെ">പുതിയ അദ്ധ്യായം</SectionTitle><p className="lead">രണ്ട് ഹൃദയങ്ങൾ ഒന്നായി പുതിയ ജീവിതത്തിലേക്ക് കടക്കുന്നു </p><div className="couple-grid"><article className="person"><CouplePhoto src="/assets/bride.jpg" alt="വധു അനുശ്രീ മോഹൻ"/><h3>{weddingData.bride.name}</h3><p>{weddingData.bride.father}യുടെയും<br/>{weddingData.bride.mother}ന്റെയും മകൾ</p><address>{weddingData.bride.house}<br/>{weddingData.bride.address.map(a=><React.Fragment key={a}>{a}<br/></React.Fragment>)}</address></article><span className="between-ornament" aria-hidden="true">❈</span><article className="person"><CouplePhoto src="/assets/groom.jpg" alt="വരൻ ശ്രീരാജ് കെ"/><h3>{weddingData.groom.name}</h3><p>{weddingData.groom.father}ന്റെയും<br/>{weddingData.groom.mother}യുടെയും മകൻ</p><address>{weddingData.groom.house}<br/>{weddingData.groom.address.map(a=><React.Fragment key={a}>{a}<br/></React.Fragment>)}</address></article></div></section>
      <section className={`page scratch-page ${celebrate?'celebrate':''}`} data-page="2" ref={el=>sectionRefs.current[2]=el}><SectionTitle eyebrow="ഒരു ചെറിയ രഹസ്യം">എന്നാണു ആ ദിവസം?</SectionTitle><p className="lead">നിങ്ങൾ തന്നെ കണ്ടു പിടിക്കൂ!</p><ScratchCard onReveal={()=>setCelebrate(true)}/>{celebrate&&<div className="petals" aria-hidden="true">❀　✿　❀　✿　❀</div>}</section>
      <section className="page event-page" data-page="3" ref={el=>sectionRefs.current[3]=el}><SectionTitle eyebrow="ഒന്നിച്ചുള്ള ജീവിതത്തിലേക്ക്">കല്യാണ സൽക്കാരം</SectionTitle><LocationCard title={weddingData.wedding.venue} subtitle={weddingData.wedding.location} date={weddingData.wedding.date+' · '+weddingData.wedding.day} time={weddingData.wedding.time} mapUrl={weddingData.wedding.mapUrl}/></section>
      <section className="page event-page groom-event" data-page="4" ref={el=>sectionRefs.current[4]=el}><SectionTitle eyebrow="സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു">വരന്റെ സൽക്കാരം</SectionTitle><LocationCard title={weddingData.groomReception.venue} date={weddingData.groomReception.date} time={weddingData.groomReception.time} mapUrl={weddingData.groomReception.mapUrl}/><CouplePhoto className="side-photo" src="/assets/couple-3.jpg" alt="വധൂവരന്മാരുടെ ഓർമ്മച്ചിത്രം"/></section>
      <section className="page message-page" data-page="5" ref={el=>sectionRefs.current[5]=el}><CouplePhoto className="message-photo" src="/assets/couple-4.jpg" alt="വധൂവരന്മാരുടെ ചിത്രം"/><DecorativeBorder><div className="message-copy"><SectionTitle>നിങ്ങളും നിങ്ങളുടെ കുടുംബസമേതവും</SectionTitle><p>ഞങ്ങളുടെ ഈ സന്തോഷാഘോഷത്തിൽ</p><p>പങ്കുചേരുവാൻ സാദരം ക്ഷണിക്കുന്നു.</p></div></DecorativeBorder></section>
      <section className="page memories-page" data-page="6" ref={el=>sectionRefs.current[6]=el}><CouplePhoto className="memories-photo" src="/assets/couple-5.jpg" alt="നിശ്ചയത്തിന്റെ സന്തോഷ നിമിഷം"/><DecorativeBorder><SectionTitle eyebrow="മനോഹര നിമിഷങ്ങൾ">ഞങ്ങളുടെ Engagement ഓർമ്മകൾ</SectionTitle><p className="lead">ഞങ്ങളുടെ മനോഹരമായ Engagement നിമിഷങ്ങൾ<br/>കാണുവാൻ താഴെയുള്ള ലിങ്കിൽ ക്ലിക്ക് ചെയ്യുക.</p><a className="gold-button" href={weddingData.engagement.url} target="_blank" rel="noopener noreferrer">ഓർമ്മകളിലേക്ക് പോകാം <span aria-hidden="true">↗</span></a></DecorativeBorder></section>
      <section className="page closing-page" data-page="7" ref={el=>sectionRefs.current[7]=el}><CouplePhoto className="closing-photo" src="/assets/couple-6.jpg" alt="അനുശ്രീയും ശ്രീരാജും"/><DecorativeBorder><div className="closing-copy"><span className="eyebrow">സ്നേഹത്തോടെ</span><h2>സൗഹാർദ്ദപൂർവ്വം</h2><p>{weddingData.closing.family}</p><span className="closing-and">എന്ന്</span><h1>{weddingData.closing.signature}</h1><div className="ornament" aria-hidden="true"><i/>❈<i/></div><button className="back-top" onClick={()=>goTo(0)}>↑</button></div></DecorativeBorder></section>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
