import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, GraduationCap, Users } from 'lucide-react';
import { PublicFooter, PublicHeader, courses } from './Home';

const details = {
  'primary-school': {
    duration: '5 years',
    classSize: '28 students',
    focus: ['Phonics and reading', 'Number sense', 'Art and music', 'Healthy routines'],
    overview: 'Primary learners build confidence through stories, games, guided writing, hands-on math, nature activities, and value education.',
  },
  'middle-school': {
    duration: '3 years',
    classSize: '32 students',
    focus: ['Science labs', 'Mathematics practice', 'Communication skills', 'Clubs and sports'],
    overview: 'Middle school develops independent study habits with projects, experiments, reading circles, digital literacy, and regular mentoring.',
  },
  'senior-school': {
    duration: '4 years',
    classSize: '35 students',
    focus: ['Board exam preparation', 'Career guidance', 'Leadership activities', 'Advanced labs'],
    overview: 'Senior students receive structured academics, assessments, counselling, practical exposure, and support for competitive readiness.',
  },
};

export default function CourseDetails() {
  const { id } = useParams();
  const course = courses.find(item => item.id === id);
  const detail = details[id];

  if (!course || !detail) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
          <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="relative mx-auto max-w-7xl">
            <Link to="/courses" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-200 hover:text-white">
              <ArrowLeft size={16} /> Back to courses
            </Link>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">{course.level}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-5 max-w-2xl leading-7 text-slate-100">{detail.overview}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: Clock, label: 'Duration', value: detail.duration },
                { icon: Users, label: 'Class size', value: detail.classSize },
                { icon: GraduationCap, label: 'Level', value: course.level },
              ].map(item => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <item.icon size={22} className="text-emerald-700" />
                  <p className="mt-3 text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-950">Course highlights</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Every program is designed to support academic strength, discipline, creativity, and steady progress.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.focus.map(point => (
                  <div key={point} className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <span className="text-sm font-semibold text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/login" className="mt-8 inline-flex rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                Login for admission support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
