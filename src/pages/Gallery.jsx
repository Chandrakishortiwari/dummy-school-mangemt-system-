import { PublicFooter, PublicHeader, gallery } from './Home';

const moreImages = [
  {
    src: gallery[0],
    title: 'Interactive Classrooms',
    category: 'Academics',
    size: 'lg:col-span-2',
  },
  {
    src: gallery[1],
    title: 'Library Hour',
    category: 'Reading',
    size: '',
  },
  {
    src: gallery[2],
    title: 'Morning Assembly',
    category: 'Campus',
    size: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    title: 'Digital Learning Lab',
    category: 'Technology',
    size: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80',
    title: 'Student Clubs',
    category: 'Activities',
    size: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80',
    title: 'Science Practice',
    category: 'Labs',
    size: 'lg:col-span-2',
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PublicHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
            alt="Graduation celebration"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="mx-auto max-w-7xl">
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">Gallery</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Campus life in pictures.</h1>
              <p className="mt-5 max-w-2xl leading-7 text-slate-200">
              Classrooms, activities, celebrations, and everyday learning moments from EduDash School.
              </p>
            </div>
          </div>
        </section>

        <section className="-mt-8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative z-10 mx-auto grid max-w-7xl gap-4 rounded-lg bg-white p-4 shadow-xl shadow-slate-200/70 sm:grid-cols-3">
            {['Academics', 'Activities', 'Campus'].map(item => (
              <div key={item} className="rounded-lg bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700">
                {item}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-7xl auto-rows-[280px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreImages.map((item, index) => (
              <figure key={item.src} className={`group relative overflow-hidden rounded-lg bg-slate-900 shadow-sm ${item.size}`}>
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">{item.category}</p>
                  <h2 className="mt-1 text-lg font-bold">{item.title}</h2>
                  <p className="mt-1 text-xs text-slate-300">Photo {index + 1}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
