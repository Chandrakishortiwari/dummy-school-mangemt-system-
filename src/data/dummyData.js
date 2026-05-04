export const users = [
  { id: 1, name: 'Admin User', email: 'admin@school.com', password: 'admin123', role: 'admin', avatar: 'AU' },
  { id: 2, name: 'Sarah Johnson', email: 'teacher@school.com', password: 'teacher123', role: 'teacher', subject: 'Mathematics', classAssigned: 'Class 10-A', avatar: 'SJ' },
  { id: 3, name: 'Mike Chen', email: 'teacher2@school.com', password: 'teacher123', role: 'teacher', subject: 'Science', classAssigned: 'Class 9-B', avatar: 'MC' },
  { id: 4, name: 'Emma Wilson', email: 'student@school.com', password: 'student123', role: 'student', class: 'Class 10-A', rollNo: 'S001', avatar: 'EW', parentName: 'John Wilson' },
  { id: 5, name: 'Parent User', email: 'parent@school.com', password: 'parent123', role: 'parent', childId: 4, avatar: 'PU' },
];

export const students = [
  { id: 1, name: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', section: 'A', gender: 'Female', dob: '2008-05-12', phone: '9876543210', email: 'emma@school.com', address: '12 Oak Street', status: 'active', admissionDate: '2020-06-01', parentName: 'John Wilson', parentPhone: '9876543211' },
  { id: 2, name: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', section: 'A', gender: 'Male', dob: '2008-03-22', phone: '9876543212', email: 'liam@school.com', address: '45 Maple Ave', status: 'active', admissionDate: '2020-06-01', parentName: 'Chris Brown', parentPhone: '9876543213' },
  { id: 3, name: 'Olivia Davis', rollNo: 'S003', class: 'Class 10-A', section: 'A', gender: 'Female', dob: '2008-07-15', phone: '9876543214', email: 'olivia@school.com', address: '78 Pine Road', status: 'active', admissionDate: '2020-06-01', parentName: 'Jane Davis', parentPhone: '9876543215' },
  { id: 4, name: 'Noah Martinez', rollNo: 'S004', class: 'Class 10-A', section: 'A', gender: 'Male', dob: '2008-11-08', phone: '9876543216', email: 'noah@school.com', address: '23 Elm Lane', status: 'active', admissionDate: '2020-06-01', parentName: 'Carlos Martinez', parentPhone: '9876543217' },
  { id: 5, name: 'Ava Thompson', rollNo: 'S005', class: 'Class 9-B', section: 'B', gender: 'Female', dob: '2009-02-19', phone: '9876543218', email: 'ava@school.com', address: '56 Cedar Blvd', status: 'active', admissionDate: '2021-06-01', parentName: 'Lisa Thompson', parentPhone: '9876543219' },
  { id: 6, name: 'Ethan Garcia', rollNo: 'S006', class: 'Class 9-B', section: 'B', gender: 'Male', dob: '2009-06-30', phone: '9876543220', email: 'ethan@school.com', address: '89 Birch Way', status: 'active', admissionDate: '2021-06-01', parentName: 'Miguel Garcia', parentPhone: '9876543221' },
  { id: 7, name: 'Sofia Lee', rollNo: 'S007', class: 'Class 9-B', section: 'B', gender: 'Female', dob: '2009-09-14', phone: '9876543222', email: 'sofia@school.com', address: '34 Walnut St', status: 'inactive', admissionDate: '2021-06-01', parentName: 'Kevin Lee', parentPhone: '9876543223' },
  { id: 8, name: 'James Anderson', rollNo: 'S008', class: 'Class 8-C', section: 'C', gender: 'Male', dob: '2010-01-25', phone: '9876543224', email: 'james@school.com', address: '67 Spruce Dr', status: 'active', admissionDate: '2022-06-01', parentName: 'Robert Anderson', parentPhone: '9876543225' },
  { id: 9, name: 'Isabella Taylor', rollNo: 'S009', class: 'Class 8-C', section: 'C', gender: 'Female', dob: '2010-04-18', phone: '9876543226', email: 'isabella@school.com', address: '90 Ash Court', status: 'active', admissionDate: '2022-06-01', parentName: 'Susan Taylor', parentPhone: '9876543227' },
  { id: 10, name: 'Lucas White', rollNo: 'S010', class: 'Class 7-D', section: 'D', gender: 'Male', dob: '2011-08-07', phone: '9876543228', email: 'lucas@school.com', address: '11 Poplar Pl', status: 'active', admissionDate: '2023-06-01', parentName: 'Tom White', parentPhone: '9876543229' },
];

export const teachers = [
  { id: 1, name: 'Sarah Johnson', empId: 'T001', subject: 'Mathematics', classAssigned: 'Class 10-A', gender: 'Female', dob: '1985-04-10', phone: '9111111111', email: 'sarah@school.com', address: '5 Teacher Lane', qualification: 'M.Sc Mathematics', experience: '8 years', status: 'active', joinDate: '2016-07-01', salary: 55000 },
  { id: 2, name: 'Mike Chen', empId: 'T002', subject: 'Science', classAssigned: 'Class 9-B', gender: 'Male', dob: '1982-09-22', phone: '9222222222', email: 'mike@school.com', address: '10 Faculty Ave', qualification: 'M.Sc Physics', experience: '11 years', status: 'active', joinDate: '2013-07-01', salary: 60000 },
  { id: 3, name: 'Priya Sharma', empId: 'T003', subject: 'English', classAssigned: 'Class 8-C', gender: 'Female', dob: '1988-12-05', phone: '9333333333', email: 'priya@school.com', address: '22 Staff Road', qualification: 'M.A English', experience: '6 years', status: 'active', joinDate: '2018-07-01', salary: 48000 },
  { id: 4, name: 'David Kim', empId: 'T004', subject: 'History', classAssigned: 'Class 7-D', gender: 'Male', dob: '1979-06-18', phone: '9444444444', email: 'david@school.com', address: '33 Scholar St', qualification: 'M.A History', experience: '15 years', status: 'active', joinDate: '2009-07-01', salary: 65000 },
  { id: 5, name: 'Rachel Green', empId: 'T005', subject: 'Art', classAssigned: 'Class 6-E', gender: 'Female', dob: '1990-02-28', phone: '9555555555', email: 'rachel@school.com', address: '44 Creative Blvd', qualification: 'BFA', experience: '4 years', status: 'active', joinDate: '2020-07-01', salary: 42000 },
];

export const attendanceData = {
  '2026-04': [
    { studentId: 1, name: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', records: { '2026-04-01': 'P', '2026-04-02': 'P', '2026-04-03': 'A', '2026-04-04': 'P', '2026-04-07': 'P', '2026-04-08': 'P', '2026-04-09': 'P', '2026-04-10': 'L', '2026-04-11': 'P', '2026-04-14': 'P', '2026-04-15': 'P', '2026-04-16': 'P', '2026-04-17': 'P', '2026-04-21': 'P', '2026-04-22': 'P' } },
    { studentId: 2, name: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', records: { '2026-04-01': 'P', '2026-04-02': 'A', '2026-04-03': 'P', '2026-04-04': 'P', '2026-04-07': 'A', '2026-04-08': 'P', '2026-04-09': 'P', '2026-04-10': 'P', '2026-04-11': 'P', '2026-04-14': 'P', '2026-04-15': 'A', '2026-04-16': 'P', '2026-04-17': 'P', '2026-04-21': 'P', '2026-04-22': 'P' } },
    { studentId: 3, name: 'Olivia Davis', rollNo: 'S003', class: 'Class 10-A', records: { '2026-04-01': 'P', '2026-04-02': 'P', '2026-04-03': 'P', '2026-04-04': 'P', '2026-04-07': 'P', '2026-04-08': 'P', '2026-04-09': 'P', '2026-04-10': 'P', '2026-04-11': 'P', '2026-04-14': 'P', '2026-04-15': 'P', '2026-04-16': 'P', '2026-04-17': 'P', '2026-04-21': 'P', '2026-04-22': 'P' } },
    { studentId: 4, name: 'Noah Martinez', rollNo: 'S004', class: 'Class 10-A', records: { '2026-04-01': 'A', '2026-04-02': 'P', '2026-04-03': 'P', '2026-04-04': 'A', '2026-04-07': 'P', '2026-04-08': 'P', '2026-04-09': 'A', '2026-04-10': 'P', '2026-04-11': 'P', '2026-04-14': 'P', '2026-04-15': 'P', '2026-04-16': 'P', '2026-04-17': 'A', '2026-04-21': 'P', '2026-04-22': 'P' } },
  ]
};

export const feesData = [
  { id: 1, studentId: 1, studentName: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', month: 'January 2026', amount: 5000, paid: 5000, dueDate: '2026-01-10', paidDate: '2026-01-08', status: 'paid', transactionId: 'TXN001' },
  { id: 2, studentId: 1, studentName: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', month: 'February 2026', amount: 5000, paid: 5000, dueDate: '2026-02-10', paidDate: '2026-02-07', status: 'paid', transactionId: 'TXN002' },
  { id: 3, studentId: 1, studentName: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', month: 'March 2026', amount: 5000, paid: 5000, dueDate: '2026-03-10', paidDate: '2026-03-09', status: 'paid', transactionId: 'TXN003' },
  { id: 4, studentId: 1, studentName: 'Emma Wilson', rollNo: 'S001', class: 'Class 10-A', month: 'April 2026', amount: 5000, paid: 0, dueDate: '2026-04-10', paidDate: null, status: 'overdue', transactionId: null },
  { id: 5, studentId: 2, studentName: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', month: 'January 2026', amount: 5000, paid: 5000, dueDate: '2026-01-10', paidDate: '2026-01-09', status: 'paid', transactionId: 'TXN005' },
  { id: 6, studentId: 2, studentName: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', month: 'February 2026', amount: 5000, paid: 5000, dueDate: '2026-02-10', paidDate: '2026-02-10', status: 'paid', transactionId: 'TXN006' },
  { id: 7, studentId: 2, studentName: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', month: 'March 2026', amount: 5000, paid: 2500, dueDate: '2026-03-10', paidDate: '2026-03-15', status: 'partial', transactionId: 'TXN007' },
  { id: 8, studentId: 2, studentName: 'Liam Brown', rollNo: 'S002', class: 'Class 10-A', month: 'April 2026', amount: 5000, paid: 0, dueDate: '2026-04-10', paidDate: null, status: 'pending', transactionId: null },
  { id: 9, studentId: 5, studentName: 'Ava Thompson', rollNo: 'S005', class: 'Class 9-B', month: 'January 2026', amount: 4500, paid: 4500, dueDate: '2026-01-10', paidDate: '2026-01-07', status: 'paid', transactionId: 'TXN009' },
  { id: 10, studentId: 5, studentName: 'Ava Thompson', rollNo: 'S005', class: 'Class 9-B', month: 'April 2026', amount: 4500, paid: 0, dueDate: '2026-04-10', paidDate: null, status: 'pending', transactionId: null },
];

export const noticesData = [
  { id: 1, title: 'Annual Sports Day', content: 'The annual sports day will be held on May 15, 2026. All students are required to participate. Parents are cordially invited to witness the event.', date: '2026-04-18', author: 'Admin', category: 'Event', priority: 'high', audience: 'all' },
  { id: 2, title: 'Parent-Teacher Meeting', content: 'Parent-teacher meetings are scheduled for April 28, 2026. Please ensure attendance as academic progress will be discussed.', date: '2026-04-16', author: 'Admin', category: 'Meeting', priority: 'high', audience: 'all' },
  { id: 3, title: 'Exam Schedule Released', content: 'The final examination schedule for all classes has been published. Students can access their timetable from the school portal.', date: '2026-04-14', author: 'Admin', category: 'Academic', priority: 'medium', audience: 'students' },
  { id: 4, title: 'Holiday Notice - Labour Day', content: 'The school will remain closed on May 1, 2026 on account of Labour Day. Regular classes will resume on May 2, 2026.', date: '2026-04-12', author: 'Admin', category: 'Holiday', priority: 'low', audience: 'all' },
  { id: 5, title: 'Science Fair Registration', content: 'Registrations for the inter-school science fair are open. Interested students must register through their class teacher by April 30, 2026.', date: '2026-04-10', author: 'Sarah Johnson', category: 'Academic', priority: 'medium', audience: 'students' },
  { id: 6, title: 'Staff Training Workshop', content: 'Mandatory training workshop for all teaching staff on modern pedagogy techniques. Attendance is compulsory.', date: '2026-04-08', author: 'Admin', category: 'Training', priority: 'medium', audience: 'teachers' },
];

export const leaveRequests = [
  { id: 1, applicantId: 4, applicantName: 'Emma Wilson', applicantRole: 'student', class: 'Class 10-A', type: 'Medical', from: '2026-04-10', to: '2026-04-11', days: 2, reason: 'Doctor appointment and recovery', status: 'approved', appliedOn: '2026-04-09', reviewedBy: 'Admin', reviewNote: 'Approved with medical certificate' },
  { id: 2, applicantId: 2, applicantName: 'Liam Brown', applicantRole: 'student', class: 'Class 10-A', type: 'Personal', from: '2026-04-07', to: '2026-04-07', days: 1, reason: 'Family function', status: 'approved', appliedOn: '2026-04-05', reviewedBy: 'Admin', reviewNote: '' },
  { id: 3, applicantId: 5, applicantName: 'Ava Thompson', applicantRole: 'student', class: 'Class 9-B', type: 'Medical', from: '2026-04-15', to: '2026-04-16', days: 2, reason: 'Fever and flu', status: 'pending', appliedOn: '2026-04-14', reviewedBy: null, reviewNote: '' },
  { id: 4, applicantId: 2, applicantName: 'Sarah Johnson', applicantRole: 'teacher', class: 'Class 10-A', type: 'Personal', from: '2026-04-25', to: '2026-04-25', days: 1, reason: 'Personal work', status: 'pending', appliedOn: '2026-04-20', reviewedBy: null, reviewNote: '' },
  { id: 5, applicantId: 3, applicantName: 'Mike Chen', applicantRole: 'teacher', class: 'Class 9-B', type: 'Medical', from: '2026-04-17', to: '2026-04-18', days: 2, reason: 'Medical procedure', status: 'approved', appliedOn: '2026-04-15', reviewedBy: 'Admin', reviewNote: 'Approved' },
  { id: 6, applicantId: 6, applicantName: 'Ethan Garcia', applicantRole: 'student', class: 'Class 9-B', type: 'Vacation', from: '2026-05-01', to: '2026-05-03', days: 3, reason: 'Family vacation', status: 'rejected', appliedOn: '2026-04-20', reviewedBy: 'Admin', reviewNote: 'Exams nearby, cannot approve' },
];

export const classes = ['Class 10-A', 'Class 9-B', 'Class 8-C', 'Class 7-D', 'Class 6-E'];

export const dashboardStats = {
  totalStudents: 248,
  totalTeachers: 18,
  totalClasses: 12,
  attendanceToday: 91,
  feesCollected: 1240000,
  pendingLeaves: 5,
  monthlyAttendance: [
    { month: 'Nov', percentage: 87 },
    { month: 'Dec', percentage: 78 },
    { month: 'Jan', percentage: 92 },
    { month: 'Feb', percentage: 89 },
    { month: 'Mar', percentage: 94 },
    { month: 'Apr', percentage: 88 },
  ],
  feeCollection: [
    { month: 'Nov', collected: 980000, pending: 240000 },
    { month: 'Dec', collected: 870000, pending: 350000 },
    { month: 'Jan', collected: 1150000, pending: 90000 },
    { month: 'Feb', collected: 1200000, pending: 40000 },
    { month: 'Mar', collected: 1180000, pending: 60000 },
    { month: 'Apr', collected: 740000, pending: 500000 },
  ],
  classStrength: [
    { class: '10-A', students: 42 },
    { class: '9-B', students: 45 },
    { class: '8-C', students: 40 },
    { class: '7-D', students: 38 },
    { class: '6-E', students: 44 },
  ],
};
