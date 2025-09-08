import React, { useState } from 'react';

const DailyAccessCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getDayDetails = (day) => {
    const today = new Date();
    const isToday = day === today.getDate() && 
                    currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear();
    const isSelected = day === selectedDate.getDate() && 
                       currentDate.getMonth() === selectedDate.getMonth() && 
                       currentDate.getFullYear() === selectedDate.getFullYear();
    
    return {
      isToday,
      isSelected
    };
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const { isToday, isSelected } = getDayDetails(i);
      calendarDays.push(
        <button
          key={i}
          onClick={() => setSelectedDate(new Date(year, month, i))}
          className={`
            w-12 h-12 flex items-center justify-center rounded-xl font-medium transition-colors
            ${isSelected ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-700 hover:bg-blue-100'}
            ${isToday && !isSelected ? 'bg-blue-200 text-blue-800' : ''}
          `}
        >
          {i}
        </button>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(currentDate);

  const formattedSelectedDate = selectedDate ? new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(selectedDate) : '';

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {formattedDate}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-4">
          <div className="py-2">Sun</div>
          <div className="py-2">Mon</div>
          <div className="py-2">Tue</div>
          <div className="py-2">Wed</div>
          <div className="py-2">Thu</div>
          <div className="py-2">Fri</div>
          <div className="py-2">Sat</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Selected date
          </h3>
          <p className="text-gray-600 text-xl font-bold">
            {formattedSelectedDate}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            (You can add or view entries for this day here)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyAccessCalendar;