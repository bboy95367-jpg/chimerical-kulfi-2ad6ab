import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/refunds-support')({
  head: () => ({
    meta: [
      { title: 'Refund Request · PayPalWallets Independent Support' },
      {
        name: 'description',
        content:
          'Draft refund-request form for PayPalWallets, an independent third-party service. This preview does not send or process requests.',
      },
    ],
  }),
  component: RefundsSupportPage,
})

function RefundsSupportPage() {
  const [reason, setReason] = useState('Duplicate transaction')
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <header className="header">
        <div className="nav-wrap support-nav">
          <a className="support-wordmark" href="/" aria-label="PayPalWallets home">
            PayPalWallets
          </a>
          <nav aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/refunds-support" aria-current="page">
              Refund request
            </a>
          </nav>
        </div>
      </header>

      <main className="support-page">
        <section className="support-intro" aria-labelledby="support-title">
          <span className="eyebrow">INDEPENDENT THIRD-PARTY SERVICE</span>
          <h1 id="support-title">
            Refund request.
            <br />
            <span>Clear next steps.</span>
          </h1>
          <p>
            Use this form layout to prepare the details of a payment issue for
            review. PayPalWallets is an independent third-party service and is
            not PayPal, Inc. or an official PayPal support channel.
          </p>

          <aside className="support-official">
            <span className="eyebrow">VERIFY A REAL PAYMENT</span>
            <h2>Check with the official provider.</h2>
            <p>
              Confirm transaction details in your own PayPal account or your
              bank’s official app or website. Never share your password, PIN,
              one-time code, or full card details with a support contact.
            </p>
            <a
              className="text-link"
              href="https://www.paypal.com/us/cshelp/personal"
              target="_blank"
              rel="noreferrer"
            >
              Visit PayPal Help Center <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </section>

        <section className="support-card" aria-labelledby="form-title">
          <span className="support-demo-tag">Draft preview · Not connected to a submission service</span>
          <h2 id="form-title">Refund / billing support</h2>
          <p className="support-description">
            Enter the details you would want a support team to review. This
            draft is not connected to email, Netlify Forms, or any backend;
            information entered here will not be sent or saved.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <fieldset>
              <legend>Your contact details</legend>
              <div className="support-name-row">
                <label>
                  First name <span aria-hidden="true">*</span>
                  <input name="firstName" autoComplete="given-name" required />
                </label>
                <label>
                  Last name <span aria-hidden="true">*</span>
                  <input name="lastName" autoComplete="family-name" required />
                </label>
              </div>
              <label>
                Email address <span aria-hidden="true">*</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone number (optional)
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Include country code if outside your country"
                />
              </label>
            </fieldset>

            <fieldset>
              <legend>Transaction details</legend>
              <label>
                Order / transaction ID <span aria-hidden="true">*</span>
                <input
                  name="transactionId"
                  autoComplete="off"
                  required
                  maxLength={120}
                  placeholder="Enter the reference shown in your account"
                />
              </label>
              <label>
                Reason for refund request <span aria-hidden="true">*</span>
                <select
                  name="reason"
                  required
                  value={reason}
                  onChange={(event) => {
                    setReason(event.target.value)
                    setSubmitted(false)
                  }}
                >
                  <option>Duplicate transaction</option>
                  <option>Charged the wrong amount</option>
                  <option>Payment not recognized</option>
                  <option>Order or service not received</option>
                  <option>Cancelled order or subscription</option>
                  <option>Refund status inquiry</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Describe the issue <span aria-hidden="true">*</span>
                <textarea
                  name="description"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Describe what happened. Do not include passwords, PINs, one-time codes, or full payment-card details."
                />
              </label>
            </fieldset>

            <div className="support-security-note">
              <h3>Bank transaction verification</h3>
              <p>
                For bank-funded payments, check the transaction directly in
                your bank’s official app, website, or by calling the number on
                your bank card. This form cannot access or verify your bank
                account. Do not enter bank login credentials, PINs, security
                codes, or one-time passwords here.
              </p>
            </div>

            <label className="support-consent">
              <input type="checkbox" name="acknowledgement" required />
              <span>
                I understand PayPalWallets is an independent third party, this
                draft does not contact PayPal, and no refund is guaranteed. *
              </span>
            </label>
            <p className="support-required">* Required fields</p>
            <button className="button navy" type="submit">
              Submit request <span aria-hidden="true">↗</span>
            </button>

            <div role="status" aria-live="polite">
              {submitted && (
                <div className="support-result">
                  <h3>Preview completed — nothing was sent</h3>
                  <p>
                    Your form passed the browser’s required-field checks, but
                    this draft is not connected to a submission service. No
                    request was delivered or stored.
                  </p>
                  <p>
                    In a properly configured support workflow, a representative
                    may follow up to review the transaction and explain the
                    available next steps. A follow-up, transfer, or refund is
                    not guaranteed.
                  </p>
                </div>
              )}
            </div>
          </form>
        </section>
      </main>

      <footer className="support-footer">
        <p>
          PayPalWallets is an independent third-party service, not affiliated
          with or endorsed by PayPal, Inc. This draft is for development
          preview only. No payment is processed and no form data is transmitted
          or saved.
        </p>
        <a href="/">Back to home <span aria-hidden="true">↗</span></a>
      </footer>
    </>
  )
}
