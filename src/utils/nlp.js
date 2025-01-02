    export const parseNaturalLanguage = (input) => {
      const taskDetails = {
        title: input,
        dueDate: null,
        priority: 'Medium',
        isCompleted: false,
        isRecurring: false,
        recurrence: 'daily',
      };

      // Simple NLP parsing (very basic)
      if (input.includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        taskDetails.dueDate = tomorrow.toISOString().split('T')[0];
        taskDetails.title = input.replace('tomorrow', '').trim();
      }

      if (input.includes('high priority')) {
        taskDetails.priority = 'High';
        taskDetails.title = input.replace('high priority', '').trim();
      }

      if (input.includes('every day')) {
        taskDetails.isRecurring = true;
        taskDetails.recurrence = 'daily';
        taskDetails.title = input.replace('every day', '').trim();
      } else if (input.includes('every week')) {
        taskDetails.isRecurring = true;
        taskDetails.recurrence = 'weekly';
        taskDetails.title = input.replace('every week', '').trim();
      } else if (input.includes('every month')) {
        taskDetails.isRecurring = true;
        taskDetails.recurrence = 'monthly';
        taskDetails.title = input.replace('every month', '').trim();
      }

      return taskDetails;
    };
