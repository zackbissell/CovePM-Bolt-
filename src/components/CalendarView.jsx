    import React, { useState, useEffect } from 'react';
    import { getAllTasks } from '../utils/database';

    function CalendarView() {
      const [currentDate, setCurrentDate] = useState(new Date());
      const [daysInMonth, setDaysInMonth] = useState([]);
      const [tasks, setTasks] = useState([]);

      useEffect(() => {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const newDaysInMonth = [];

        while (date.getMonth() === currentDate.getMonth()) {
          newDaysInMonth.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }

        setDaysInMonth(newDaysInMonth);
      }, [currentDate]);

      useEffect(() => {
        const fetchTasks = async () => {
          const fetchedTasks = await getAllTasks();
          setTasks(fetchedTasks);
        };

        fetchTasks();
      }, []);

      const handlePrevMonth = () => {
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
      };

      const handleNextMonth = () => {
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
      };

      const getTasksForDate = (date) => {
        return tasks.filter((task) => {
          if (!task.dueDate) return false;
          const taskDueDate = new Date(task.dueDate);
          return (
            taskDueDate.getDate() === date.getDate() &&
            taskDueDate.getMonth() === date.getMonth() &&
            taskDueDate.getFullYear() === date.getFullYear()
          );
        });
      };

      return (
        <div>
          <h2>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </h2>
          <button onClick={handlePrevMonth}>&lt; Prev</button>
          <button onClick={handleNextMonth}>Next &gt;</button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} style={{ fontWeight: 'bold' }}>
                {day}
              </div>
            ))}
            {daysInMonth.map((day) => (
              <div
                key={day.toString()}
                style={{ border: '1px solid #ccc', textAlign: 'center' }}
              >
                {day.getDate()}
                <ul>
                  {getTasksForDate(day).map((task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default CalendarView;
