import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react'
import {
  validateContactInput,
  dispatchContactMessage,
  type ContactPayload,
  type ValidationErrors,
} from '../../lib/contact'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp_field: '',
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const copyTimeoutRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const CONTACT_EMAIL = 'karlcabasagan.202200008@gmail.com'

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current)
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateContactInput(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    abortControllerRef.current = new AbortController()

    try {
      const result = await dispatchContactMessage(
        validation.sanitized,
        CONTACT_EMAIL,
        undefined,
        abortControllerRef.current.signal
      )

      setIsSubmitting(false)
      setIsSubmitted(true)
      if (result.usedFallbackMailto) {
        setFallbackMailto(result.usedFallbackMailto)
      }

      // Lazy load confetti only on successful interaction
      import('canvas-confetti').then((m) => {
        const confetti = m.default
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f5a0', '#00d2ff', '#8b5cf6'],
        })
      }).catch(() => {
        // Safe canvas fallback
      })
    } catch {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '', hp_field: '' })
    setErrors({})
    setIsSubmitted(false)
    setFallbackMailto(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Info Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 rounded-2xl bg-surface/80 border border-white/[0.08] glass-surface space-y-5">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-accent-mint block mb-1">
              Direct Communication
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Let’s connect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              I am open for full-time full-stack roles, freelance technical consulting, 
              or architectural collaboration on web platforms.
            </p>
          </div>

          {/* Copyable Email Pill */}
          <div className="p-3.5 rounded-xl bg-surface-muted border border-white/[0.06] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">Primary Email</span>
              <span className="text-xs font-mono text-slate-200">{CONTACT_EMAIL}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 tap-scale hit-target transition-all"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent-mint" />
                  <span className="text-accent-mint">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Response SLA */}
          <div className="space-y-3 pt-2 border-t border-white/[0.04] text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-mint" />
              <span>Typical response time: <strong className="text-slate-200">&lt; 24 hours</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span>Time zone: <strong className="text-slate-200">Asia/Manila (UTC+8)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="lg:col-span-7">
        <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 border border-white/10 glass-surface">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-mint/15 text-accent-mint border border-accent-mint/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Ready / Dispatched!</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message has been prepared.
              </p>
              {fallbackMailto && (
                <div className="pt-2">
                  <a
                    href={fallbackMailto}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-mint text-slate-950 text-xs font-semibold hover:bg-emerald-300 transition-all tap-scale hit-target"
                  >
                    <span>Send Directly via Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
              <div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-surface-muted hover:bg-surface text-xs font-semibold text-accent-mint border border-accent-mint/30 tap-scale hit-target transition-all"
                >
                  Send Another Message
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Spam Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_field">Do not fill this</label>
                <input
                  id="hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp_field || ''}
                  onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name <span className="text-accent-mint">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Reyes"
                    className={`w-full px-3.5 py-2.5 text-xs bg-surface-muted/90 text-slate-100 placeholder-slate-500 rounded-xl border transition-colors focus:outline-none ${
                      errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-accent-mint'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address <span className="text-accent-mint">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-3.5 py-2.5 text-xs bg-surface-muted/90 text-slate-100 placeholder-slate-500 rounded-xl border transition-colors focus:outline-none ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-accent-mint'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject <span className="text-accent-mint">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Opportunity: Full-Stack Engineer / Collaboration"
                  className={`w-full px-3.5 py-2.5 text-xs bg-surface-muted/90 text-slate-100 placeholder-slate-500 rounded-xl border transition-colors focus:outline-none ${
                    errors.subject ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-accent-mint'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message <span className="text-accent-mint">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, role specifications, or inquiry..."
                  className={`w-full px-3.5 py-2.5 text-xs bg-surface-muted/90 text-slate-100 placeholder-slate-500 rounded-xl border transition-colors focus:outline-none resize-y ${
                    errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-white/10 focus:border-accent-mint'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-mint text-slate-950 font-semibold text-xs hover:bg-emerald-300 disabled:opacity-50 transition-colors tap-scale hit-target min-h-[44px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
