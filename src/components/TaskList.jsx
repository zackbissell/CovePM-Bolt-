    import React, { useState } from 'react';
    import TaskItem from './TaskItem';

    function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
      const [sortBy, setSortBy] = useState('dueDate');
      const [filterBy, setFilterBy] = useState('all');

      const sortTasks = (tasks) => {
        return [...tasks].sort((a, b) => {
          if (sortBy === 'dueDate') {
            return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
          } else if (sortBy === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return (
              (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
            );
          }
          return 0;
        });
      };

      const filterTasks = (tasks) => {
        if (filterBy === 'completed') {
          return tasks.filter((task) => task.isCompleted);
        } else if (filterBy === 'incomplete') {
          return tasks.filter((task) => !task.isCompleted);
        }
        return tasks;
      };

      const sortedAndFilteredTasks = filterTasks(sortTasks(tasks));

      return (
        <div>
          <div>
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter">Filter: </label>
            <select id="filter" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <ul>
            {sortedAndFilteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            ))}
          </ul>
        </div>
      );
    }

    export default TaskList;
