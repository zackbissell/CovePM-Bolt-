    import React, { useState } from 'react';
    import { addTask } from '../utils/database';
    import { parseNaturalLanguage } from '../utils/nlp';

    function AddTask({ onTaskAdded }) {
      const [title, setTitle] = useState('');
      const [dueDate, setDueDate] = useState('');
      const [priority, setPriority] = useState('Medium');
      const [isRecurring, setIsRecurring] = useState(false);
      const [recurrence, setRecurrence] = useState('daily');

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim()) return;

        let taskDetails = {
          title,
          dueDate,
          priority,
          isCompleted: false,
          isRecurring,
          recurrence,
        };

        if (title.startsWith('!')) {
          taskDetails = parseNaturalLanguage(title.substring(1));
        }

        await addTask(taskDetails);
        setTitle('');
        setDueDate('');
        setPriority('Medium');
        setIsRecurring(false);
        setRecurrence('daily');
        onTaskAdded();
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task (use ! for NLP)"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
            <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          )}
          <button type="submit">Add Task</button>
        </form>
      );
    }

    export default AddTask;
