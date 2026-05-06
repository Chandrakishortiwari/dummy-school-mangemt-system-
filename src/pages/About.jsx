import {
  Heart,
  Target,
  Eye,
  CheckCircle,
  Users,
  BookOpen,
  Trophy,
  Lightbulb,
} from "lucide-react";
import { PublicFooter, PublicHeader } from "./Home";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We treat every student, parent, and staff member with genuine care and respect.",
  },
  {
    icon: Target,
    title: "Excellence",
    desc: "We hold high standards in academics, character, and all that we do.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace creative thinking and modern teaching methods to prepare for the future.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We foster a welcoming environment where every voice is heard and valued.",
  },
];

const team = [
  {
    name: "Dr. Patricia Williams",
    role: "Principal",
    bio: "With over 20 years in education, Dr. Williams leads with vision and warmth.",
    img: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
  },
  {
    name: "Mr. James Okafor",
    role: "Vice Principal – Academics",
    bio: "James ensures curriculum excellence and supports teachers in delivering the best outcomes.",
    img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
  },
  {
    name: "Ms. Linda Park",
    role: "Head of Student Affairs",
    bio: "Linda champions student wellbeing, extracurriculars, and a positive school culture.",
    img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
  },
  {
    name: "Mr. David Torres",
    role: "Director of Admissions",
    bio: "David guides families through every step of joining the school.",
    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
  },
];

const facilities = [
  { icon: BookOpen, label: "Library", desc: "Books and digital resources" },
  { icon: Trophy, label: "Sports", desc: "Indoor & outdoor facilities" },
  { icon: Lightbulb, label: "Labs", desc: "Modern science labs" },
  { icon: Users, label: "Arts", desc: "Creative studios" },
];

export default function About() {
  return (
    <div className="bg-[#f8fafc] text-slate-900">
      <PublicHeader />

      <main className="pt-16">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-950 to-slate-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="inline-block bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm px-4 py-1.5 rounded-full">
              About Us
            </span>

            <h1 className="text-5xl font-bold text-white">
              Our Story & Mission
            </h1>

            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We provide exceptional education that prepares students for life.
            </p>
          </div>
        </section>

        {/* MISSION */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
              className="rounded-2xl shadow-xl h-96 w-full object-cover"
            />

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Our Mission</h3>
                  <p className="text-slate-600">
                    Safe, inclusive, and strong learning environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Eye className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Our Vision</h3>
                  <p className="text-slate-600">
                    Creating future leaders and thinkers.
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {[
                  "Student-centered teaching approach",
                  "Safe and inclusive campus",
                  "Regular parent-teacher engagement",
                  "Character development focus",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-slate-600 text-sm"
                  >
                    <CheckCircle size={16} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <div className="bg-emerald-50">
          <div className="text-center pt-16">
            <h2 className="text-4xl font-bold tracking-widest text-emerald-900">
              Our Core Values
            </h2>
          </div>

          <div className="flex py-20 gap-8 mt-10 flex-wrap justify-center">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white w-72 rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-emerald-900 text-lg mb-2">
                  {title}
                </h3>
                <p className="text-emerald-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FACILITIES */}
        <div className="bg-emerald-50">
          <div className="text-center pt-16">
            <span className="text-emerald-900 text-4xl font-bold uppercase tracking-widest">
              Campus Facilities
            </span>
          </div>

          <div className="flex py-20 gap-8 mt-10 flex-wrap justify-center">
            {facilities.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-white w-64 rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-bold text-emerald-900 mb-1">{label}</h3>
                <p className="text-emerald-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 space-y-14">
            <div className="text-center space-y-3">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">
                Leadership Team
              </span>

              <h2 className="text-4xl font-bold text-emerald-900">
                Meet Our Leaders
              </h2>

              <p className="text-emerald-600 max-w-xl mx-auto">
                Experienced educators and administrators united by a passion for
                student success.
              </p>
            </div>

            <div className="flex py-10 gap-5 flex-wrap justify-center">
              {team.map((member) => (
                <div key={member.name} className="text-center w-64 space-y-3">
                  <div className="w-32 h-32 mx-auto overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-emerald-900">{member.name}</h3>
                  <p className="text-emerald-600 text-xs font-semibold uppercase">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
