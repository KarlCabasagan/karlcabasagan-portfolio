import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const CONTACT_EMAIL = 'cabasagan.karl@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject.'
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f5a0', '#00d2ff', '#8b5cf6'],
        })
      } catch {
        // Fallback if canvas is unavailable
      }
    }, 700)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setIsSubmitted(false)
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
              <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message has been received. I will review and reply promptly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 rounded-xl bg-surface-muted hover:bg-surface text-xs font-semibold text-accent-mint border border-accent-mint/30 tap-scale hit-target transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
