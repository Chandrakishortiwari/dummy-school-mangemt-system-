import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  GraduationCap,
  Image,
  MapPin,
  Menu,
  MessageCircle,
  MonitorCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const courses = [
  {
    id: 'primary-school',
    title: 'Primary School',
    level: 'Classes 1-5',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    text: 'Strong foundations in reading, numbers, creativity, and confidence.',
  },
  {
    id: 'middle-school',
    title: 'Middle School',
    level: 'Classes 6-8',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    text: 'Concept-based learning with projects, labs, clubs, and guided growth.',
  },
  {
    id: 'senior-school',
    title: 'Senior School',
    level: 'Classes 9-12',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
    text: 'Academic focus, career guidance, exam readiness, and leadership skills.',
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
];

const heroSlides = [
  {
    title: 'EduDash School',
    kicker: 'Modern CBSE-style campus for curious learners',
    subtitle: 'A modern school where strong academics, activities, and parent communication work together.',
    badge: 'Admissions open for 2026-27',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=80',
    focus: 'Primary to senior classes',
  },
  {
    title: 'Smart Classrooms',
    kicker: 'Digital lessons with personal attention',
    subtitle: 'Bright classrooms, guided learning, and regular progress tracking for every student.',
    badge: 'Modern campus facilities',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1800&q=80',
    focus: 'Concept-first learning',
  },
  {
    title: 'Beyond Books',
    kicker: 'Sports, arts, clubs, labs, and leadership',
    subtitle: 'Sports, arts, clubs, labs, and activities that help students grow with confidence.',
    badge: 'Balanced school life',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80',
    focus: 'Activities with academics',
  },
];

const schoolFeatures = [
  {
    icon: MonitorCheck,
    title: 'Smart classrooms',
    text: 'Digital boards, visual lessons, and guided practice make concepts easier to understand.',
  },
  {
    icon: UserCheck,
    title: 'Attendance tracking',
    text: 'Daily attendance records help teachers and parents spot patterns early.',
  },
  {
    icon: MessageCircle,
    title: 'Parent updates',
    text: 'Important notices, performance updates, and fee reminders stay easy to access.',
  },
  {
    icon: ClipboardList,
    title: 'Assignments and leaves',
    text: 'Students can follow tasks, notices, leave requests, and school updates in one place.',
  },
  {
    icon: CreditCard,
    title: 'Fee management',
    text: 'Simple fee status, paid history, and pending information for parents.',
  },
  {
    icon: Bell,
    title: 'Notice center',
    text: 'Events, exams, meetings, holidays, and announcements are visible quickly.',
  },
];

const learningPillars = [
  'Concept-first teaching',
  'Regular tests and feedback',
  'Sports and activity clubs',
  'Safe campus environment',
  'Library and lab access',
  'Career and parent counselling',
];

function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/20 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <GraduationCap size={20} />
          </span>
          <span className="text-lg font-bold text-slate-900">EduDash School</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(link => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-slate-600 hover:text-emerald-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={currentUser ? '/dashboard' : '/login'}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {currentUser ? 'Dashboard' : 'Login'}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(value => !value)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={currentUser ? '/dashboard' : '/login'}
              onClick={() => setOpen(false)}
              className="rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              {currentUser ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
              <GraduationCap size={20} />
            </span>
            <span className="text-lg font-bold">EduDash School</span>
          </div>
          <p className="text-sm leading-6 text-slate-400">A modern school experience for students, parents, and teachers.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Explore</p>
          <div className="space-y-2 text-sm text-slate-400">
            <Link to="/courses" className="block hover:text-white">Courses</Link>
            <Link to="/about" className="block hover:text-white">About</Link>
            <Link to="/gallery" className="block hover:text-white">Gallery</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Admissions</p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Primary, middle, and senior classes</p>
            <p>Merit support and parent counselling</p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Contact</p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>+91 98765 43210</p>
            <p>admissions@edudashschool.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { PublicHeader, PublicFooter, courses, gallery };

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction) => {
    setActiveSlide(current => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />

      <main>
        <section className="relative min-h-[760px] overflow-hidden pt-16">
          {heroSlides.map((item, index) => (
            <img
              key={item.title}
              src={item.image}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/62 to-slate-950/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent" />
          <div className="relative mx-auto grid min-h-[700px] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950">
                  <Sparkles size={16} />
                  {slide.badge}
                </span>
                <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25">
                  {slide.focus}
                </span>
              </div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-200">{slide.kicker}</p>
              <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
                >
                  Explore Courses <ArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100"
                >
                  Login Portal <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {[
                  'Smart classes',
                  'Parent updates',
                  'Safe campus',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-lg bg-white/95 p-4 shadow-2xl shadow-slate-950/30">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Campus preview</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">Learn. Grow. Lead.</h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">2026-27</span>
                </div>
                <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=900&q=80"
                  alt="EduDash School campus"
                  className="h-64 w-full object-cover"
                />
              </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Students', value: '248+' },
                  { label: 'Teachers', value: '18' },
                  { label: 'Classes', value: '12' },
                  { label: 'Attendance', value: '91%' },
                ].map(item => (
                  <div key={item.label} className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-950 p-4 text-white">
                  <Trophy size={22} className="text-emerald-300" />
                  <p className="text-sm font-semibold leading-6">
                    Academic discipline, practical exposure, and school ERP tools in one experience.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`overflow-hidden rounded-lg border-2 bg-white text-left shadow-lg transition ${
                      index === activeSlide ? 'border-emerald-400' : 'border-white/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={item.image} alt={item.title} className="h-20 w-full object-cover" />
                    <span className="block px-3 py-2 text-xs font-bold text-slate-800">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 lg:left-8 lg:translate-x-0">
            <button
              type="button"
              onClick={() => moveSlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg hover:bg-emerald-50"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/70'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => moveSlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg hover:bg-emerald-50"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        <section className="-mt-10 px-4 pb-14 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: '248+', label: 'Active students' },
              { icon: Award, value: '18', label: 'Qualified teachers' },
              { icon: BookOpen, value: '12', label: 'Smart classes' },
              { icon: ShieldCheck, value: '91%', label: 'Attendance rate' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
                <item.icon className="mb-4 text-emerald-600" size={24} />
                <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Why families choose us</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-950">Schooling that stays organized, caring, and future-ready.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                EduDash School is designed for students who need strong basics, confident communication, practical learning, and a clear connection between home and school.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Star, title: 'Clear progress', text: 'Regular feedback keeps learning visible.' },
                { icon: ShieldCheck, title: 'Safe campus', text: 'Disciplined routines and caring supervision.' },
                { icon: MapPin, title: 'Active life', text: 'Labs, library, sports, arts, and events.' },
              ].map(item => (
                <div key={item.title} className="rounded-lg bg-slate-50 p-5">
                  <item.icon size={22} className="text-emerald-700" />
                  <h3 className="mt-3 font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Courses</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">Programs for every stage</h2>
              </div>
              <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                View all courses <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {courses.map(course => (
                <Link key={course.id} to={`/courses/${course.id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={course.image} alt={course.title} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-5">
                    <p className="text-sm font-semibold text-emerald-700">{course.level}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{course.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{course.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Features and functionality</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">A smarter school experience for everyone.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The public website introduces the school, while the login portal supports daily management for admins, teachers, students, and parents.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {schoolFeatures.map(item => (
                <div key={item.title} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1100&q=80"
              alt="Students celebrating graduation"
              className="h-[430px] w-full rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">About us</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-950">A calm, capable campus for ambitious young learners.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                EduDash School combines structured academics with labs, sports, arts, clubs, counselling, and digital school management.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Experienced faculty', 'Modern classrooms', 'Parent communication', 'Activity-based learning'].map(point => (
                  <div key={point} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    {point}
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
                Know more <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Learning life</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-950">Academics, activities, and habits that build confident students.</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Students learn through classroom teaching, lab practice, reading, competitions, celebrations, and guided self-study routines.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {learningPillars.map(point => (
                  <div key={point} className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=80"
                alt="Students working together"
                className="h-56 w-full rounded-lg object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=700&q=80"
                alt="Student learning in class"
                className="mt-10 h-56 w-full rounded-lg object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80"
                alt="Technology classroom"
                className="col-span-2 h-56 w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Gallery</p>
                <h2 className="mt-2 text-3xl font-bold">Moments from campus life</h2>
              </div>
              <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
                Open gallery <Image size={16} />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {gallery.map((src, index) => (
                <div key={src} className="group overflow-hidden rounded-lg bg-white/10 p-2">
                  <img src={src} alt={`School gallery ${index + 1}`} className="h-72 w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-lg bg-emerald-600 p-8 text-white md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-100">Admissions desk</p>
              <h2 className="mt-2 text-3xl font-bold">Ready to visit the campus?</h2>
              <p className="mt-2 text-emerald-50">Book a counselling call or login to access the school ERP portal.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-emerald-700">
                <Phone size={18} /> Call now
              </a>
              <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white">
                <CalendarDays size={18} /> Login portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
