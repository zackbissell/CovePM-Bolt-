    import React, { useState, useEffect } from 'react';
    import TaskList from './components/TaskList';
    import AddTask from './components/AddTask';
    import CalendarView from './components/CalendarView';
    import { openDB, getAllTasks } from './utils/database';

    function App() {
      const [tasks, setTasks] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          await openDB();
          const fetchedTasks = await getAllTasks();
          setTasks(fetchedTasks);
        };
        fetchData();
      }, []);

      const handleTaskAdded = async () => {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      };

      const handleTaskUpdated = async () => {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      };

      const handleTaskDeleted = async () => {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      };

      return (
        <div>
          <h1>Welcome to Cove</h1>
          <AddTask onTaskAdded={handleTaskAdded} />
          <h2>Tasks</h2>
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
          <h2>Calendar</h2>
          <CalendarView />
        </div>
      );
    }

    export default App;
