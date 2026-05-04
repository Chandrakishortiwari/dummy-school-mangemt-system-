import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';

export default function Dashboard() {
  const { currentUser } = useAuth();

  if (currentUser?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (currentUser?.role === 'teacher') {
    return <TeacherDashboard user={currentUser} />;
  }

  if (currentUser?.role === 'student') {
    return <StudentDashboard user={currentUser} />;
  }

  if (currentUser?.role === 'parent') {
    const child = {
      ...currentUser,
      id: currentUser.childId,
      class: 'Class 10-A',
      rollNo: 'S001',
      name: 'Emma Wilson',
    };

    return <StudentDashboard user={child} />;
  }

  return null;
}
