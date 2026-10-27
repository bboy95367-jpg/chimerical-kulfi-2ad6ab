import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

export const Route = createFileRoute('/refunds-support')({
  head: () => ({ meta: [
    { title: 'Refund Request' },
    { name: 'description', content: 'Preview a refund request form. Independent design demo; no requests are submitted.' },
  ] }),
  component: RefundsSupportPage,
})

function RefundsSupportPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'complete'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    timer.current = setTimeout(() => {
      setStatus('complete')
      timer.current = null
    }, 1500)
  }

  return <div className="refund-page">
    <header className="refund-header">
      <div className="refund-topbar">
        <a className="refund-brand" href="/">YourBrand</a>
        <div className="refund-tag">Support Center</div>
      </div>
    </header>
    <main className="refund-main">
      <section className="refund-card" aria-labelledby="refund-title">
        <div className="refund-card-head">
          <h1 id="refund-title">Refund Request</h1>
          <p className="refund-intro">Please provide the details of your order below.</p>
        </div>
        <form id="refundForm" onSubmit={handleSubmit}>
          <div className="refund-grid">
            <div className="refund-field">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required placeholder="Jane Doe" />
            </div>
            <div className="refund-field">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="jane@example.com" />
            </div>
          </div>
          <div className="refund-grid">
            <div className="refund-field">
              <label htmlFor="order_id">Order ID</label>
              <input type="text" id="order_id" name="order_id" required placeholder="#12345" />
            </div>
            <div className="refund-field">
              <label htmlFor="reason">Reason for Refund</label>
              <select id="reason" name="reason" defaultValue="">
                <option value="">Select an option...</option>
                <option value="defective">Defective Product</option>
                <option value="wrong_item">Wrong Item Received</option>
                <option value="not_as_described">Not as Described</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="refund-field">
            <label htmlFor="details">Additional Details <span className="refund-optional">(Optional)</span></label>
            <textarea id="details" name="details" placeholder="Please describe the issue in detail..." />
          </div>
          <div className="refund-security">
            <strong>Data Security</strong>
            This preview keeps entries on this page only. Nothing is sent or saved. Please use fictional details.
          </div>
          <div className="refund-check">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">I understand this is a demonstration and does not submit a refund request.</label>
          </div>
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Preparing preview...' : 'Submit Request'}</button>
          <p className="refund-hint">For a real refund, visit <a href="https://www.paypal.com/us/cshelp/personal">official PayPal support</a>.</p>
          <div role="status" aria-live="polite" aria-atomic="true">
            {status === 'complete' && <div id="result" className="refund-result"><strong>Preview complete!</strong> No refund request was sent. This demonstration does not process refunds.</div>}
          </div>
        </form>
      </section>
    </main>
    <footer className="refund-footer">
      <p>© 2026 YourCompany Inc. All rights reserved.</p>
      <p>Independent design demo. Not affiliated with or endorsed by PayPal. No payments are processed and no information is submitted.</p>
    </footer>
  </div>
}
