    import React, { useState } from 'react';
    import { updateTask, deleteTask } from '../utils/database';

    function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
      const [isEditing, setIsEditing] = useState(false);
      const [title, setTitle] = useState(task.title);
      const [dueDate, setDueDate] = useState(task.dueDate || '');
      const [priority, setPriority] = useState(task.priority || 'Medium');
      const [isRecurring, setIsRecurring] = useState(task.isRecurring || false);
      const [recurrence, setRecurrence] = useState(task.recurrence || 'daily');

      const handleUpdate = async () => {
        const updatedTask = {
          ...task,
          title,
          dueDate,
          priority,
          isRecurring,
          recurrence,
        };
        await updateTask(updatedTask);
        setIsEditing(false);
        onTaskUpdated();
      };

      const handleDelete = async () => {
        await deleteTask(task.id);
        onTaskDeleted();
      };

      const handleComplete = async () => {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        await updateTask(updatedTask);
        onTaskUpdated();
      };

      if (isEditing) {
        return (
          <li>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              Recurring
            </label>
            {isRecurring && (
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            )}
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </li>
        );
      }

      return (
        <li>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleComplete}
          />
          <span
            style={{
              textDecoration: task.isCompleted ? 'line-through' : 'none',
            }}
          >
            {task.title}
            {task.dueDate && ` - Due: ${task.dueDate}`}
            {task.priority && ` (${task.priority})`}
            {task.isRecurring && ` [Recurring ${task.recurrence}]`}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </li>
      );
    }

    export default TaskItem;
