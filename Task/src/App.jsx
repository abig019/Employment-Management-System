import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Login from './components/Login'; 
import DailyAccessCalendar from './components/DailyAccessCalendar';
import ContactUs from './components/ContactUs';

const initialData = [
  { id: 1, name: 'Indira', designation: 'Business Analyst', profile_pic: 'https://placehold.co/128x128/60a5fa/ffffff?text=IN', date: '26-08-2023', check_in: '09:00', checkout: '17:30' },
  { id: 2, name: 'John Doe', designation: 'UI/UX Designer', profile_pic: 'https://placehold.co/100x100/F4C7A3/fff?text=JD', date: '26-08-2023', check_in: '09:05', checkout: '17:35' },
  { id: 3, name: 'Dhanu', designation: 'Software Engineer', profile_pic: 'https://placehold.co/128x128/c7d2fe/ffffff?text=DH', date: '26-08-2023', check_in: '09:10', checkout: '17:40' },
  { id: 4, name: 'Guru', designation: 'Project Manager', profile_pic: 'https://placehold.co/128x128/a5b4fc/ffffff?text=GR', date: '26-08-2023', check_in: '09:15', checkout: '17:45' },
  { id: 5, name: 'Rama', designation: 'QA Tester', profile_pic: 'https://placehold.co/128x128/60a5fa/ffffff?text=RM', date: '26-08-2023', check_in: '09:20', checkout: '17:50' },
];

const AdminProfile = ({ adminProfile, setAdminProfile, setCurrentView }) => {
  const [localAdminProfile, setLocalAdminProfile] = useState(adminProfile);

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    setLocalAdminProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLocalFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalAdminProfile(prev => ({ ...prev, profile_pic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalAdminUpdate = (e) => {
    e.preventDefault();
    setAdminProfile(localAdminProfile);
    setCurrentView('dashboard');
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Admin Profile</h3>
      <form onSubmit={handleLocalAdminUpdate} className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group">
            <img src={localAdminProfile.profile_pic} alt="Admin Profile" className="w-full h-full object-cover" />
            <input
              type="file"
              id="profile_pic_upload"
              accept="image/*"
              onChange={handleLocalFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <label htmlFor="profile_pic_upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.867-1.444A2 2 0 0110.457 5H14.5c.356 0 .695.14.945.39l.867 1.444A2 2 0 0017.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Click the image to change your profile picture.</p>
            <h4 className="text-2xl font-semibold text-gray-800">{localAdminProfile.name}</h4>
            <p className="text-sm text-gray-500">{localAdminProfile.designation}</p>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={localAdminProfile.name}
            onChange={handleLocalInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            id="designation"
            value={localAdminProfile.designation}
            onChange={handleLocalInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const Progress = ({ adminProfile }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl min-h-[70vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Employee Progress Dashboard</h2>
      <p className="text-gray-600 mb-8 text-center">
        This is where you'd display charts, metrics, and detailed progress information for employees.
      </p>

      <div className="flex justify-center items-center space-x-8 w-full max-w-4xl">
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md flex-1 text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Completion Rate</h3>
          <div className="text-4xl font-bold text-blue-600">75%</div>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl shadow-md flex-1 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Pending Tasks</h3>
          <div className="text-4xl font-bold text-green-600">12</div>
        </div>
        <div className="bg-purple-100 p-6 rounded-2xl shadow-md flex-1 text-center">
          <h3 className="text-xl font-semibold text-purple-800 mb-2">Total Reviews</h3>
          <div className="text-4xl font-bold text-purple-600">85</div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Milestones</h3>
        <ul className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4">
          <li className="flex items-center space-x-3">
            <span className="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-gray-700">John Doe completed "Project Alpha" ahead of schedule.</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-gray-700">Dhanu completed the "Advanced React" training module.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

// --- Helper Functions to get data from Local Storage ---

// Check Local Storage for a login flag
const getInitialLoginState = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Retrieve employee data from Local Storage or use default data
const getInitialEmployees = () => {
  const storedEmployees = localStorage.getItem('employees');
  return storedEmployees ? JSON.parse(storedEmployees) : initialData;
};


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoginState); // Load initial login state
  const [employees, setEmployees] = useState(getInitialEmployees); // Load initial employee data
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [adminProfile, setAdminProfile] = useState({
    name: 'Abinaya G',
    designation: 'Available for work',
    profile_pic: 'https://placehold.co/128x128/a5b4fc/ffffff?text=AG'
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // 🔑 This is the key part: save employees to Local Storage whenever the state changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]); // The dependency array ensures this runs only when `employees` changes

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const formattedMinutes = minutes.padStart(2, '0');
    return `${h}:${formattedMinutes} ${ampm}`;
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEmployee({ id: null, name: '', designation: '', profile_pic: '', date: '', check_in: '', checkout: '' });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let updatedEmployees;
    if (isEditMode) {
      updatedEmployees = employees.map(emp =>
        emp.id === editingEmployee.id ? editingEmployee : emp
      );
    } else {
      const newEmployee = {
        ...editingEmployee,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-GB')
      };
      updatedEmployees = [...employees, newEmployee];
    }
    setEmployees(updatedEmployees);
    closeModal();
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeToDelete.id);
    setEmployees(updatedEmployees);
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const Modal = ({ children }) => {
    return createPortal(
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          {children}
        </div>
      </div>,
      document.body
    );
  };

  const renderDashboard = () => (
    <>
      <div className="bg-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-full max-w-sm mr-4">
            <input
              type="text"
              placeholder="Search employee"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Year</option>
              <option>2023</option>
              <option>2024</option>
            </select>
            <select className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Month</option>
              <option>August</option>
              <option>September</option>
            </select>
            <button onClick={() => setCurrentView('adminProfile')} className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500">
              <img src={adminProfile.profile_pic} alt="Admin" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendance Month - August</h3>

        <div className="flex overflow-x-auto space-x-6 p-2 pb-4 mb-8">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="min-w-[150px] flex-shrink-0 bg-blue-100 p-4 rounded-xl text-center shadow-md">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2">
                <img src={employee.profile_pic} alt={employee.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-sm font-semibold text-gray-800 truncate">{employee.name}</h4>
              <p className="text-xs text-gray-600 truncate">{employee.designation}</p>
              <button
                onClick={() => openEditModal(employee)}
                className="mt-2 text-xs font-medium text-blue-600 bg-white border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              >
                Profile Details
              </button>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 text-gray-500">
                <th className="p-4 font-normal text-sm">Employee</th>
                <th className="p-4 font-normal text-sm">Designation</th>
                <th className="p-4 font-normal text-sm">Date</th>
                <th className="p-4 font-normal text-sm">Check-in Time</th>
                <th className="p-4 font-normal text-sm">Checkout Time</th>
                <th className="p-4 font-normal text-sm">Details</th>
                <th className="p-4 font-normal text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 last:border-b-0 text-gray-700 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img src={employee.profile_pic} alt={employee.name} className="w-full h-full object-cover" />
                    </div>
                    {employee.name}
                  </td>
                  <td className="p-4">{employee.designation}</td>
                  <td className="p-4">{employee.date}</td>
                  <td className="p-4">{formatTime(employee.check_in)}</td>
                  <td className="p-4">{formatTime(employee.checkout)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openEditModal(employee)}
                      className="bg-blue-100 text-blue-600 font-medium py-1 px-4 rounded-full text-xs hover:bg-blue-200 transition-colors"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(employee)}
                        className="text-gray-500 hover:text-blue-500 transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openDeleteModal(employee)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <button
              onClick={openAddModal}
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            Add Employee
          </button>
        </div>
      </div>
    </>
  );

  const renderProgress = () => (
    <Progress adminProfile={adminProfile} />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8 font-sans antialiased flex">
      <div className="w-64 bg-white rounded-3xl shadow-xl p-6 mr-8 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">TeamPulse</h1>
        <nav className="space-y-4">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full text-left py-2 px-4 rounded-lg font-medium transition-colors flex items-center ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Dashboard
          </button>
          <button onClick={() => setCurrentView('progress')} className={`w-full text-left py-2 px-4 rounded-lg font-medium transition-colors flex items-center ${currentView === 'progress' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Progress
          </button>
          <button onClick={() => setCurrentView('calendar')} className={`w-full text-left py-2 px-4 rounded-lg font-medium transition-colors flex items-center ${currentView === 'calendar' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </button>
          <button onClick={() => setCurrentView('adminProfile')} className={`w-full text-left py-2 px-4 rounded-lg font-medium transition-colors flex items-center ${currentView === 'adminProfile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Settings
          </button>
        </nav>
      </div>

      <div className="flex-1">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img src={adminProfile.profile_pic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{adminProfile.name}</h2>
              <p className="text-sm text-gray-500">{adminProfile.designation}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button onClick={() => setCurrentView('contact')} className="bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">Get in touch</button>
            <button onClick={handleLogout} className="bg-red-500 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition-colors">Logout</button>
          </div>
        </header>

        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'adminProfile' && <AdminProfile adminProfile={adminProfile} setAdminProfile={setAdminProfile} setCurrentView={setCurrentView} />}
        {currentView === 'progress' && renderProgress()}
        {currentView === 'calendar' && <DailyAccessCalendar />}
        {currentView === 'contact' && <ContactUs setCurrentView={setCurrentView} />}
      </div>

      {isModalOpen && (
        <Modal>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {isEditMode ? 'Edit Employee' : 'Add Employee'}
          </h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={editingEmployee?.name || ''}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                id="designation"
                value={editingEmployee?.designation || ''}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <input
                type="text"
                name="profile_pic"
                id="profile_pic"
                value={editingEmployee?.profile_pic || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={editingEmployee?.date || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="check_in" className="block text-sm font-medium text-gray-700">Check-in Time</label>
              <input
                type="time"
                name="check_in"
                id="check_in"
                value={editingEmployee?.check_in || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">Checkout Time</label>
              <input
                type="time"
                name="checkout"
                id="checkout"
                value={editingEmployee?.checkout || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditMode ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-medium text-gray-900">{employeeToDelete?.name}</span>'s profile?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">Cancel </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;