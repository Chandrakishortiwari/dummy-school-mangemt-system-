import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { PublicFooter, PublicHeader, courses } from './Home';

const benefits = ['Weekly assessments', 'Project learning', 'Lab and library access', 'Parent progress updates'];

export default function Courses() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicHeader />
      <main className="pt-16">
        <section className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Courses</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Choose the right academic path.</h1>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">
              Our programs support every learner with clear concepts, activity-based practice, personal mentoring, and modern campus facilities.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {courses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <img src={course.image} alt={course.title} className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="p-5">
                  <p className="text-sm font-semibold text-emerald-700">{course.level}</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-950">{course.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{course.text}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                    View details <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <BookOpen size={28} className="text-emerald-700" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">What every course includes</h2>
              <p className="mt-3 leading-7 text-slate-600">Balanced academics with activities, discipline, regular feedback, and preparation for future study.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map(benefit => (
                <div key={benefit} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
