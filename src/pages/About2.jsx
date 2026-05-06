import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { PublicFooter, PublicHeader } from './Home';

const profileStats = [
  { value: '248+', label: 'Students learning on campus' },
  { value: '18', label: 'Teachers and mentors' },
  { value: '12', label: 'Organized class sections' },
  { value: '91%', label: 'Average attendance' },
];

const principles = [
  {
    icon: Target,
    title: 'Clear academic direction',
    text: 'Every class follows small learning goals, steady practice, and regular checks so students know exactly where they stand.',
  },
  {
    icon: HeartHandshake,
    title: 'Human care first',
    text: 'Teachers keep the environment disciplined, approachable, and respectful so children feel safe enough to ask and improve.',
  },
  {
    icon: Lightbulb,
    title: 'Practical curiosity',
    text: 'Lessons connect with activities, labs, reading, projects, and discussion instead of staying limited to textbook answers.',
  },
];

const timeline = [
  { step: '01', title: 'Foundation years', text: 'Reading, numeracy, classroom habits, creativity, and confidence are built with patient guidance.' },
  { step: '02', title: 'Middle growth', text: 'Students explore science, language, technology, sports, arts, clubs, and collaborative projects.' },
  { step: '03', title: 'Senior focus', text: 'Exam readiness, career conversations, leadership, discipline, and independent study become the priority.' },
];

const campusBlocks = [
  { icon: BookOpen, title: 'Library and labs', text: 'Spaces for reading, experiments, research, and hands-on concept clarity.' },
  { icon: Users, title: 'Parent connection', text: 'Attendance, notices, fees, progress updates, and school communication stay easy to follow.' },
  { icon: ShieldCheck, title: 'Safe routines', text: 'Daily supervision, attendance discipline, and caring staff create a secure school rhythm.' },
  { icon: Award, title: 'Activity culture', text: 'Sports, events, clubs, competitions, and creative programs support all-round growth.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <PublicHeader />
      <main className="pt-16">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <GraduationCap size={23} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">About EduDash School</p>
                  <p className="text-sm font-medium text-slate-500">A modern learning institution</p>
                </div>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Built like a caring school, managed like a modern institution.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                EduDash School combines strong academics, transparent communication, and a balanced campus life so students can learn with confidence and families stay informed.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Academic discipline', 'Digital school portal', 'Teacher-led mentoring', 'Activity-based growth'].map(item => (
                  <div key={item} className="flex items-center gap-3 border-l-4 border-emerald-500 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"
                  alt="EduDash School building"
                  className="h-[520px] w-full object-cover"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 bg-white/94 p-4 shadow-2xl backdrop-blur sm:grid-cols-4">
                {profileStats.map(item => (
                  <div key={item.label} className="border-l border-slate-200 pl-3 first:border-l-0 first:pl-0">
                    <p className="text-2xl font-bold text-slate-950">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Institution profile</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">The school is designed around three simple promises.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Learning should be structured, care should be visible, and progress should be easy for teachers and parents to understand.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {principles.map(item => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-emerald-300">
                    <item.icon size={23} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">How students grow</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">A clear path from classroom confidence to future readiness.</h2>
              <div className="mt-8 space-y-5">
                {timeline.map(item => (
                  <div key={item.title} className="grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-[72px_1fr]">
                    <span className="text-3xl font-bold text-emerald-300">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 text-slate-900">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
                alt="Students learning together"
                className="h-80 w-full rounded-lg object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Daily learning rhythm</p>
                <p className="mt-3 text-2xl font-bold leading-tight text-slate-950">
                  Classwork, practice, feedback, activities, and parent updates work as one system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Campus ecosystem</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">Every part of campus supports learning beyond the timetable.</h2>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
                <CalendarDays size={18} className="text-emerald-600" />
                Academic year 2026-27
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {campusBlocks.map(item => (
                <div key={item.title} className="rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200">
                  <item.icon size={25} className="text-emerald-700" />
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 lg:grid-cols-[0.82fr_1.18fr]">
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80"
              alt="Students sitting together on campus"
              className="h-80 w-full object-cover lg:h-full"
            />
            <div className="p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Principal's note</p>
              <blockquote className="mt-4 text-2xl font-bold leading-10 text-slate-950">
                "A good school gives children structure, but a great school also gives them the courage to participate, question, and lead."
              </blockquote>
              <p className="mt-5 leading-7 text-slate-600">
                That belief shapes how EduDash School plans classes, notices progress, handles communication, and creates opportunities outside the classroom.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Respectful discipline', 'Visible progress', 'Balanced growth'].map(item => (
                  <span key={item} className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
