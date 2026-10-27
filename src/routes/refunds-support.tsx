import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/refunds-support')({
  head: () => ({ meta: [
    { title: 'Refunds/Support · Independent demo' },
    { name: 'description', content: 'An independent support form demonstration using fictional details. No refund requests are submitted.' },
  ] }),
  component: RefundsSupportPage,
})

function RefundsSupportPage() {
  const [topic, setTopic] = useState('Refund status')
  const [preview, setPreview] = useState(false)

  return <>
    <header className="header">
      <div className="nav-wrap support-nav">
        <a className="support-wordmark" href="/">Design demo</a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/refunds-support" aria-current="page">Refunds/Support</a>
        </nav>
      </div>
    </header>
    <main className="support-page">
      <section className="support-intro" aria-labelledby="support-title">
        <span className="eyebrow">INDEPENDENT DESIGN DEMO</span>
        <h1 id="support-title">A little clarity.<br/><span>A little peace of mind.</span></h1>
        <p>Explore a sample support form. This page is not PayPal support and cannot verify or process a refund.</p>
        <aside className="support-official">
          <span className="eyebrow">NEED HELP WITH A REAL PAYMENT?</span>
          <h2>Go straight to the source.</h2>
          <p>Manage an actual refund through the official PayPal Help Center.</p>
          <a className="text-link" href="https://www.paypal.com/us/cshelp/personal">Visit PayPal support <span aria-hidden="true">↗</span></a>
        </aside>
      </section>
      <section className="support-card" aria-labelledby="form-title">
        <span className="support-demo-tag">Sample only · Nothing is sent</span>
        <h2 id="form-title">Refunds / Support</h2>
        <p className="support-description">Try the form with the fictional details below. Contact fields are fixed; no personal information is collected.</p>
        <form onSubmit={event => { event.preventDefault(); setPreview(true) }}>
          <fieldset>
            <legend>Sample contact details</legend>
            <div className="support-name-row">
              <label>First name<input value="Maya" readOnly autoComplete="off" /></label>
              <label>Last name<input value="Chen" readOnly autoComplete="off" /></label>
            </div>
            <label>Email<input type="email" value="maya@example.com" readOnly autoComplete="off" /></label>
          </fieldset>
          <label>Support topic <span aria-hidden="true">*</span>
            <select required value={topic} onChange={event => { setTopic(event.target.value); setPreview(false) }}>
              <option>Refund status</option>
              <option>Understanding a refund</option>
              <option>Finding official support</option>
            </select>
          </label>
          <label className="support-consent"><input type="checkbox" required onChange={() => setPreview(false)} /><span>I understand this is an independent demo and does not submit a refund request. *</span></label>
          <p className="support-required">* Required for the preview</p>
          <button className="button navy" type="submit">Preview sample request <span aria-hidden="true">↗</span></button>
          <div role="status" aria-live="polite">{preview && <div className="support-result"><h3>Sample preview ready</h3><p>Maya Chen · {topic}</p><p>No request was submitted. For a real refund, use official PayPal support.</p></div>}</div>
        </form>
      </section>
    </main>
    <footer className="support-footer"><p>Independent design demo. Not affiliated with or endorsed by PayPal. No payments are processed and no information is submitted on this page.</p><a href="/">Back to home <span aria-hidden="true">↗</span></a></footer>
  </>
}
