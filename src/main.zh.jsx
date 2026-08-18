import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const MAIL = 'hujunzhe06@gmail.com'
const MAILTO = `mailto:${MAIL}?subject=${encodeURIComponent('项目合作咨询 — HUJUNZHE')}&body=${encodeURIComponent('您好 HUJUNZHE，\n\n我想和您讨论一个面向未来的项目。\n\n谢谢！\n')}`
const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4'

function Arrow(){ return <span className="arrow">↗</span> }

function Starfield(){
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current, ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0, h = 0, dpr = 1, raf
    const mouse = { x: 0, y: 0 }
    let stars = []
    const resize = () => {
      w = innerWidth; h = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: Math.min(240, Math.floor(w * h / 7000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: .4 + Math.random() * 1.4, a: .25 + Math.random() * .7, s: .04 + Math.random() * .16, p: Math.random() * 6.28 }))
    }
    const move = e => { mouse.x = (e.clientX / w - .5) * 18; mouse.y = (e.clientY / h - .5) * 18 }
    const draw = t => { ctx.clearRect(0, 0, w, h); stars.forEach((s, i) => { s.y -= s.s; if (s.y < -4) s.y = h + 4; ctx.globalAlpha = s.a + .2 * Math.sin(t * .0015 + s.p); ctx.fillStyle = i % 17 === 0 ? '#c8a8ff' : '#fff'; ctx.beginPath(); ctx.arc(s.x + mouse.x * s.r, s.y + mouse.y * s.r, s.r, 0, Math.PI * 2); ctx.fill() }); ctx.globalAlpha = 1; raf = requestAnimationFrame(draw) }
    resize(); addEventListener('resize', resize); addEventListener('pointermove', move); raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}

function App(){
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } }).fromTo('.cn .hero-video-overlay', { clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 1.8, ease: 'power4.inOut' }).fromTo('.cn .nav', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=1.2').fromTo('.cn .hero h1,.cn .hero-subtitle', { y: 90, opacity: 0, filter: 'blur(14px)' }, { y: 0, opacity: 1, filter: 'blur(0)', duration: 1.25 }, '-=.7').fromTo('.cn .hero-intro,.cn .hero .primary-button', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .1 }, '-=.6').fromTo('.cn .stats div', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1 }, '-=.5')
      gsap.utils.toArray('.cn .section-bar,.cn .section-title,.cn .profile-card,.cn .about-copy,.cn .project-card,.cn .strength-grid article,.cn .contact-content').forEach((el, i) => gsap.fromTo(el, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: (i % 4) * .08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' } }))
    })
    return () => ctx.revert()
  }, [])

  const projects = [
    ['01', 'AI 智能设计系统', '基于生成式 AI 工作流重构跨平台视觉组件库，提升全端渲染效率。', 'cyan'],
    ['02', '百万级 DAU 交互平台', '面向高并发日活用户打造稳定、快速且有温度的数字体验。', 'blue'],
    ['03', '跨国医疗合规引擎', '融合医学与法律视角，将复杂数据转译为清晰可信的品牌语言。', 'violet'],
  ]
  return <main className="cn"><Starfield/><video className="site-video-backdrop" autoPlay muted loop playsInline><source src={VIDEO} type="video/mp4" /></video><div className="motion-aurora" />
    <section className="hero page" id="top"><div className="hero-video-overlay"/><nav className="nav container"><a className="brand" href="#top">HUJUNZHE<span> / 2026</span></a><div className="nav-links"><a href="#about">关于我</a><a href="#work">精选项目</a><a href="#strength">核心优势</a><a href="#contact">联系</a></div><a className="nav-cta" href={MAILTO}>联系我 <Arrow/></a></nav><div className="hero-content container"><p className="eyebrow">视觉 / AI / 品牌设计师</p><div className="depth-text cn-name">HUJUNZHE</div><h1 className="hero-subtitle"><i>让复杂的技术</i><br/><span>拥有可感知的视觉体验。</span></h1><p className="hero-intro">以法学与医学的底层逻辑，融合系统思维与视觉叙事，为面向未来的科技品牌建立清晰、克制而有力量的体验。</p><a className="primary-button" href="#work">探索作品集 <Arrow/></a></div><div className="stats container"><div><strong>100万+</strong><span>日活用户架构经验</span></div><div><strong>4 门</strong><span>中文 / 英文 / 日文 / 法文</span></div><div><strong>毫秒级</strong><span>高并发交互与数据检索</span></div><div><strong>100%</strong><span>全栈自动化 CI / CD</span></div></div></section>
    <section className="about page" id="about"><div className="container"><div className="section-bar"><span>关于我 / PROFILE</span><small>01 / 个人经历</small></div><h2 className="section-title">跨学科背景，构成我的设计方法</h2><div className="about-grid"><div className="profile-card"><div className="avatar"><img src="/hujunzhe.jpg" alt="HUJUNZHE"/></div><h3>HUJUNZHE</h3><p>东京大学 / 法学与医学双学位</p><small>B.A. Law &amp; B.S. Medicine</small><div className="profile-line"/><small>语言能力</small><div className="language-list"><b>中文（母语）</b><b>English（流利）</b><b>日本語（N1）</b><b>Français（高级）</b></div></div><div className="about-copy"><p>我毕业于东京大学，拥有法学与医学双学位，擅长从复杂问题中提炼结构，并将底层逻辑转化为可感知的视觉语言。</p><p>我曾主导高并发分布式系统、跨平台智能数据引擎，以及全栈 Web / 移动端应用从零构建，稳定承载百万级日活用户与毫秒级数据检索。</p><p>作为视觉、AI 与品牌设计师，我把技术系统、品牌策略与生成式 AI 融合，创造高级、克制且值得信赖的科技体验。</p><a className="text-link" href={MAILTO}>与 HUJUNZHE 合作 <Arrow/></a></div></div></div></section>
    <section className="work page" id="work"><div className="container"><div className="section-bar"><span>精选项目 / SELECTED WORK</span><small>02 / 项目展示</small></div><h2 className="section-title">把复杂系统，重新设计成体验</h2><div className="project-grid">{projects.map(([no,title,desc,tone]) => <article className="project-card" key={no}><div className={`project-art ${tone}`}><span className="art-index">{no}</span><span className="art-orbit"/><span className="art-grid"/></div><div className="project-body"><h3>{title}</h3><p>{desc}</p><div className="tags"><span>视觉设计</span><span>系统重构</span></div></div></article>)}</div></div></section>
    <section className="strength page" id="strength"><div className="container"><div className="section-bar"><span>核心优势 / CAPABILITIES</span><small>03 / 能力模型</small></div><h2 className="section-title">我的优势，来自不同领域的交叉</h2><div className="strength-grid"><article><b>01.</b><h3>极致逻辑与跨学科视角</h3><p>法学与医学训练让我能快速拆解复杂业务，把结构转化为准确、克制的视觉表达。</p></article><article><b>02.</b><h3>全栈技术与 AI 工作流融合</h3><p>熟悉 React、Vite、数据引擎与 CI / CD，将生成式 AI 自然接入设计管线。</p></article><article><b>03.</b><h3>国际化视野与多语言沟通</h3><p>精通中、英、日、法四门语言，具备跨国团队协作与全球品牌落地经验。</p></article><article><b>04.</b><h3>克制而有辨识度的科技美学</h3><p>拒绝模板化表达，以深色、留白和高对比建立高级、可靠的品牌感受。</p></article></div></div></section>
    <section className="contact page" id="contact"><div className="container"><div className="section-bar"><span>联系我 / GET IN TOUCH</span><small>04 / 联系方式</small></div><div className="contact-content"><p className="eyebrow">期待与你一起创造</p><h2>开启下一个<br/><span>面向未来的项目</span></h2><p>无论是 AI 品牌视觉、复杂系统设计，还是一次深入的交流，都欢迎联系我。</p><a className="email" href={MAILTO}>{MAIL} <Arrow/></a><a className="primary-button" href={MAILTO}>发送邮件</a></div><footer><span>© 2026 HUJUNZHE</span><span>Tokyo · Shanghai · Everywhere</span><a href="#top">返回顶部 ↑</a></footer></div></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
