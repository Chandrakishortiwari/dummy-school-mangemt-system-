import { Link } from 'react-router-dom';
import { CalendarDays, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PublicFooter, PublicHeader } from './Home';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80"
            alt="Students walking near school campus"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Contact us</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Talk to our admissions team.</h1>
            <p className="mt-5 max-w-2xl leading-7 text-slate-200">
              Visit the campus, ask about courses, or connect with the school office for admission support.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              {[
                { icon: Phone, title: 'Phone', text: '+91 98765 43210' },
                { icon: Mail, title: 'Email', text: 'admissions@edudashschool.com' },
                { icon: MapPin, title: 'Campus', text: 'EduDash School, Main Road, New Delhi' },
                { icon: CalendarDays, title: 'Office hours', text: 'Mon to Sat, 9:00 AM - 4:00 PM' },
              ].map(item => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <item.icon size={22} className="text-emerald-700" />
                  <h2 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Name</label>
                  <input className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="Parent name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</label>
                  <input className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="+91" />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
                <input className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="you@example.com" />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Message</label>
                <textarea rows="6" className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="Tell us what you want to know" />
              </div>
              <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                <Send size={18} /> Send enquiry
              </button>
              <p className="mt-3 text-xs text-slate-500">This is a front-end enquiry form. Backend connection can be added later.</p>
            </form>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 rounded-lg bg-slate-900 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">Already part of EduDash School?</h2>
              <p className="mt-1 text-sm text-slate-300">Login to access dashboard, notices, attendance, fees, and more.</p>
            </div>
            <Link to="/login" className="inline-flex justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900">
              Login portal
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
