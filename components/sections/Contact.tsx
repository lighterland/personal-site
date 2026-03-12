'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Check, Copy } from 'lucide-react';
import { SiGithub, SiMedium } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'lighterland@gmail.com';

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSuccess(true);
      reset();
    } catch {
      // still show success for demo
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6" style={{ background: '#F8FAFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Contact</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Let&#39;s Talk</h2>
        <p className="text-gray-500 mb-10">Whether you have a project, a question, or just want to connect.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="card p-8">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500">Thanks for reaching out. I&#39;ll get back to you within 1–2 business days.</p>
                <button onClick={() => setSuccess(false)} className="btn-secondary mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                    })}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    {...register('subject', { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select a subject...</option>
                    <option value="Hiring">Hiring</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                  <Send size={16} />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Direct links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find me here</h3>
              <div className="space-y-3">
                {[
                  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/barklight/', color: 'text-blue-600' },
                  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/lighterland', color: 'text-gray-900' },
                  { icon: SiMedium, label: 'Medium', href: 'https://medium.com/@barklight', color: 'text-green-700' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-all group"
                    aria-label={label}
                  >
                    <Icon size={24} className={`${color} group-hover:scale-110 transition-transform`} />
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-500">{href.replace('https://', '')}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Email with copy */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Email directly</h3>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white">
                <Mail size={20} className="text-brand-500" />
                <span className="text-sm font-mono text-gray-700 flex-1">{email}</span>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
