import { BookOpen, Pencil, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

// const classesData = [
//   { id: 1, class: "10-A", students: 32, teacher: "Mr. Sharma" },
//   { id: 2, class: "10-B", students: 28, teacher: "Ms. Verma" },
//   { id: 3, class: "9-A", students: 35, teacher: "Mr. Singh" },
//   { id: 4, class: "8-A", students: 30, teacher: "Ms. Gupta" },
// ];

export default function Classes() {
  const { currentUser } = useAuth();
  const [classesData, setclassesData] = useState([])
  const getapi= async()=>{
    const response = await fetch("http://localhost:8000/api/class/getallclasses");
    const data = await response.json();
    console.log(data.data);
    setclassesData(data.data)
  }
  useEffect(() => {
   getapi();
  }, [])
  
  

  console.log(classesData);
  

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Classes Dashboard
        </h1>
        <p className="text-sm text-slate-500">Overview of all school classes</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesData.map((cls) => (
          <div
            key={cls.id}
            className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 hover:scale-[1.02] transition duration-300"
          >
            {/* Inner Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 h-full shadow-md hover:shadow-xl transition">
              {/* Top Row */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-800">
                  Class: {cls.className}
                </h2>

                <div className="bg-gradient-to-tr from-blue-500 to-indigo-500 p-2 rounded-xl shadow-sm">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Teacher */}
              <div className="flex items-center justify-between mb-5">
                {/* Left: Teacher Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {/* {cls.teacher.charAt(3)} */}
                  </div>

                  <div>
                    <p className="text-md text-slate-400">Class Teacher</p>
                    <p className="text-lg font-medium text-slate-700">
                      {cls.user}
                    </p>
                  </div>
                </div>

                {/* Right: Edit Button (Only Admin) */}
                {currentUser.role === "admin" && (
                  <button className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 transition group">
                    <Pencil className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                  </button>
                )}
              </div>

              {/* Students Stat */}
              <div className="flex items-center justify-between  rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Users className="w-4 h-4" />
                  Students
                </div>

                <div className="text-lg font-bold text-blue-600">
                  {cls.count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
