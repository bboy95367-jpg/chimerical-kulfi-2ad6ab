import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'

export const Route = createFileRoute('/refunds-support')({
  head: () => ({ meta: [
    { title: 'Refund Request | Independent Support' },
    { name: 'description', content: 'Contact PayPalWallets, an independent service, about a refund request. Not affiliated with PayPal, Inc.' },
  ] }),
  component: RefundsSupportPage,
})

function RefundsSupportPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'complete' | 'error'>('idle')
  const submitting = useRef(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (submitting.current || !form.reportValidity()) return
    submitting.current = true
    setStatus('sending')
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value)
    })
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('complete')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return <div className="refund-page">
    <header className="refund-header">
      <div className="refund-topbar">
        <a className="refund-brand" href="/">PayPal<span>Wallets</span></a>
        <div className="refund-tag">Independent support form</div>
      </div>
    </header>
    <main className="refund-main">
      <section className="refund-card" aria-labelledby="refund-title">
        <div className="refund-card-head">
          <h1 id="refund-title">Refund request</h1>
          <p className="refund-intro">Enter the details below to send a refund inquiry to this independent service.</p>
        </div>
        <form id="refund-form" name="refund-request" method="POST" action="/__forms.html" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="refund-request" />
          <div hidden><label htmlFor="bot-field">Leave this field empty</label><input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" /></div>
          <h2 className="refund-section-title">Your contact details</h2>
          <div className="refund-grid">
            <div className="refund-field">
              <label htmlFor="first-name">First name</label>
              <input id="first-name" name="firstName" autoComplete="given-name" required />
            </div>
            <div className="refund-field">
              <label htmlFor="last-name">Last name</label>
              <input id="last-name" name="lastName" autoComplete="family-name" required />
            </div>
          </div>
          <div className="refund-grid">
            <div className="refund-field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="refund-field">
              <label htmlFor="phone">Phone number <span className="refund-optional">(optional)</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
          <h2 className="refund-section-title">Transaction details</h2>
          <div className="refund-field">
            <label htmlFor="transaction-id">Transaction ID <span className="refund-optional">(optional)</span></label>
            <input id="transaction-id" name="transactionId" placeholder="Enter the reference shown in your account" />
          </div>
          <div className="refund-field">
            <label htmlFor="reason">Reason for refund</label>
            <select id="reason" name="reason" required defaultValue="">
              <option value="">Select a reason</option>
              <option>Duplicate charge</option>
              <option>Item or service not received</option>
              <option>Incorrect amount charged</option>
              <option>Subscription or billing concern</option>
              <option>Other</option>
            </select>
          </div>
          <div className="refund-field">
            <label htmlFor="details">Additional details</label>
            <textarea id="details" name="details" placeholder="Briefly describe the issue. Do not include passwords or security codes." required />
          </div>
          <div className="refund-security">
            <strong>Keep your account secure</strong>
            Never enter your password, card PIN, one-time passcode (OTP), or full payment-card details in this form. To verify a transaction, check your bank or payment account directly.
          </div>
          <div className="refund-check">
            <input type="checkbox" id="acknowledge" name="acknowledge" value="agreed" required />
            <label htmlFor="acknowledge">I agree to send these details to this independent site’s operator for review and understand this does not create an official PayPal refund request.</label>
          </div>
          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Submit request'}</button>
          <p className="refund-hint">Your submitted details are stored securely through Netlify Forms for review by this site’s operator. Submission does not guarantee a refund.</p>
          <div role="status" aria-live="polite" aria-atomic="true">
            {status === 'complete' && <div id="result" className="refund-result"><strong>Request received.</strong> Your inquiry was sent to this independent site’s operator. This is not confirmation of a refund.</div>}
          </div>
          {status === 'error' && <div className="refund-result refund-error" role="alert">Your request could not be sent. Your entries are still here; please try again.</div>}
        </form>
      </section>
    </main>
    <footer className="refund-footer">
      <p>This is an independent service and is not affiliated with or endorsed by PayPal, Inc. For account-specific help, visit the <a href="https://www.paypal.com/us/cshelp" target="_blank" rel="noopener noreferrer">official PayPal Help Center</a>.</p>
    </footer>
  </div>
}
