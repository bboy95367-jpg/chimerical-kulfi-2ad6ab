import { useEffect, useRef, useState } from 'react'

function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? 'compact' : ''}`} aria-label="PayPal"><span className="brand-icon"><i>P</i><b>P</b></span>{!compact && <span><strong>Pay</strong><em>Pal</em></span>}</span>
}
const menus: Record<string, { title: string; text: string; href: string }[]> = {
  Personal: [{title:'Shop and pay',text:'Your everyday, with more possibilities.',href:'#shop'},{title:'Send money',text:'Bring your people a little closer.',href:'#send'},{title:'Get the app',text:'Your money. Ready when you are.',href:'#app'}],
  Business: [{title:'Accept payments',text:'Give your customers more ways to pay.',href:'#business'},{title:'Grow your business',text:'Tools for your next big idea.',href:'#business'}],
  'Enterprise': [{title:'Payments at scale',text:'Connect your business with the world.',href:'#business'}],
}

export function MarketingPage() {
  const [menu, setMenu] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [preview, setPreview] = useState(false)
  const [sent, setSent] = useState(false)
  const [amount, setAmount] = useState('25.00')
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => { if(preview) dialogRef.current?.showModal(); else dialogRef.current?.close() },[preview])
  const openPreview = () => {setSent(false);setPreview(true)}
  return <>
    <header className="header">
      <div className="nav-wrap">
        <a className="home-link" href="#" aria-label="PayPal home"><Brand /></a>
        <button className="mobile-toggle" onClick={()=>setMobile(!mobile)} aria-expanded={mobile} aria-label="Toggle menu">{mobile ? '✕' : '☰'}</button>
        <nav className={mobile ? 'navigation open' : 'navigation'} aria-label="Main navigation">
          {Object.keys(menus).map(label=><button key={label} className={menu===label?'nav-item selected':'nav-item'} aria-expanded={menu===label} onClick={()=>setMenu(menu===label?null:label)}>{label}<span className="chevron" /></button>)}
          <a className="nav-item" href="https://www.paypal.com/us/cshelp/personal" target="_blank" rel="noreferrer">Help</a>
          <a className="nav-item" href="/refunds-support">Refunds/Support</a>
        </nav>
        <div className="account-actions"><a className="button outline small" href="https://www.paypal.com/signin">Log In</a><a className="button navy small" href="https://www.paypal.com/us/webapps/mpp/account-selection">Sign Up</a></div>
      </div>
      {menu && <div className="mega-menu"><div className="menu-inner">{menus[menu].map(item=><a key={item.title} href={item.href} onClick={()=>{setMenu(null);setMobile(false)}}><strong>{item.title} <span>↗</span></strong><p>{item.text}</p></a>)}<button className="menu-close" onClick={()=>setMenu(null)} aria-label="Close menu">✕</button></div></div>}
    </header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span/> YOUR MONEY. YOUR POSSIBILITIES.</div><h1>Life moves.<br/>Your money<br/><span>should too.</span></h1><p>Pay, send, and manage your money.<br/>All in one place. All with PayPal.</p><a className="button navy hero-cta" href="https://www.paypal.com/us/webapps/mpp/account-selection">Sign Up for Free <span>↗</span></a><div className="app-link"><span className="qr" aria-hidden="true"><i/><i/><i/><b/></span><span>Get the app.<br/><a href="#app">Make more possible. <span>↗</span></a></span></div></div>
        <div className="hero-art" aria-label="Illustration of a PayPal wallet with a payment card and a completed transfer" role="img">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="spark spark-one">✦</div><div className="spark spark-two">✦</div><div className="art-dot"/>
          <div className="credit-card"><span className="card-name">PayPal</span><span className="contactless">)))</span><span className="chip"><i/></span><span className="card-digits">•••• &nbsp; •••• &nbsp; •••• &nbsp; 2048</span><span className="card-bottom">DEBIT <b>●<i>●</i></b></span></div>
          <div className="phone"><div className="phone-top"><Brand compact/><span>•••</span></div><p className="greeting">Good morning, Alex</p><h3>A little more<br/>possibility.</h3><div className="balance"><span>PayPal balance</span><strong>$1,284.50</strong><small>Available</small></div><div className="phone-actions"><span>↗<small>Send</small></span><span>↙<small>Request</small></span><span>▦<small>More</small></span></div><div className="activity"><b>Recent activity</b><span className="activity-row"><i>J</i><span>Jordan Lee<small>Money received</small></span><strong>+$85.00</strong></span></div><div className="phone-bottom"><span>⌂</span><span>▤</span><span>◉</span></div></div>
          <div className="paid-toast"><span className="check">✓</span><div><strong>You're all set!</strong><p>$85.00 received from Jordan</p></div><span className="tiny-star">✦</span></div>
          <div className="floating-badge"><Brand compact/></div><div className="art-caption"><span>✓</span> A little confidence. Everywhere you go.</div>
        </div>
      </section>
      <section className="trust-bar"><span className="shield">♧</span><p>A little peace of mind goes a long way.</p><a href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security" target="_blank" rel="noreferrer">Explore PayPal security <span>↗</span></a></section>
      <section className="possibilities" id="shop"><div className="section-heading"><div><span className="eyebrow">MADE FOR YOUR EVERYDAY</span><h2>So many ways to make<br/>the most of your money.</h2></div><p>Big plans. Small moments. Whatever’s next,<br/>there’s a way to PayPal it.</p></div>
        <div className="feature-grid"><article className="feature shop-card"><div className="feature-art shopping-art"><div className="shopping-bag"><Brand compact/><span className="bag-handle"/></div><div className="mini-payment"><span className="check">✓</span> Looking good. Paid.</div><span className="shop-spark">✦</span></div><div className="feature-copy"><span className="category">SHOP WITH CONFIDENCE</span><h3>Find it. Love it. PayPal it.</h3><p>Your favorite brands. Your next great find.<br/>Check out with a name you know.</p><a href="https://www.paypal.com/us/digital-wallet/ways-to-pay">Explore ways to pay <span>↗</span></a></div></article>
        <article className="feature send-card" id="send"><div className="feature-art sending-art"><div className="avatar avatar-a">M</div><div className="send-line"/><div className="avatar avatar-b">A</div><div className="send-label"><span>For the little things.</span><strong>$25.00 <span>↗</span></strong></div><span className="send-heart">♡</span></div><div className="feature-copy"><span className="category">SEND A LITTLE SOMETHING</span><h3>Good things are better shared.</h3><p>Split dinner. Celebrate a birthday.<br/>Send a little love, near or far.</p><button className="text-link" onClick={openPreview}>See how sending works <span>↗</span></button></div></article></div>
      </section>
      <section className="business-banner" id="business"><div><span className="eyebrow">FOR YOUR NEXT BIG THING</span><h2>Small business.<br/>Big possibilities.</h2><p>From your first sale to what comes next, get payment tools<br/>that work as hard as you do.</p><a className="button white" href="https://www.paypal.com/us/business">Explore PayPal for Business <span>↗</span></a></div><div className="business-visual"><span className="business-star">✳</span><div className="sale-card"><span className="check">✓</span><span>Another happy customer.<strong>Payment received</strong></span><b>↗</b></div><span className="business-caption">Keep your business moving.</span></div></section>
      <section className="app-section" id="app"><Brand compact/><h2>A world of possibilities.<br/>Right in your pocket.</h2><p>Make your everyday a little easier with the PayPal app.</p><a className="button navy" href="https://www.paypal.com/us/digital-wallet/mobile-app">Get the App <span>↗</span></a></section>
    </main>
    <footer><div className="footer-brand"><Brand/><span>More ways to make it happen.</span></div><div className="footer-links"><a href="https://www.paypal.com/us/cshelp/personal">Help</a><a href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security">Security</a><a href="https://www.paypal.com/us/webapps/mpp/about">About</a><a href="https://www.paypal.com/us/business">Business</a><span className="region">United States · English</span></div><div className="footer-legal"><p>Independent design demo. Not affiliated with or endorsed by PayPal. No payments are processed on this site.</p><div><a href="https://www.paypal.com/us/legalhub/privacy-full">Privacy</a><a href="https://www.paypal.com/us/legalhub/useragreement-full">Legal</a></div></div></footer>
    <dialog ref={dialogRef} onCancel={()=>setPreview(false)} onClick={e=>{if(e.target===e.currentTarget)setPreview(false)}}><button className="dialog-close" aria-label="Close preview" onClick={()=>setPreview(false)}>✕</button><Brand compact/>{sent ? <div className="demo-success"><span className="check">✓</span><h2>That’s how easy it feels.</h2><p>Your ${Number(amount).toFixed(2)} sample transfer to Maya is complete.</p><p className="demo-note">This is a preview. No money has moved.</p><button className="button navy" onClick={()=>setSent(false)}>Try again</button></div> : <form onSubmit={e=>{e.preventDefault();setSent(true)}}><h2>Send a little something.</h2><p>Try a transfer with sample details.</p><div className="demo-recipient"><span className="avatar">M</span><span> Maya Chen<small>Sample recipient</small></span></div><label htmlFor="amount">Amount in USD</label><div className="amount-input"><span>$</span><input id="amount" type="number" min="0.01" max="10000" step="0.01" required value={amount} onChange={e=>setAmount(e.target.value)}/></div><p className="demo-note">Interactive demo · No real payment</p><button className="button navy" type="submit">Preview sending <span>↗</span></button></form>}</dialog>
  </>
}
