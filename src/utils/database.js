const DB_NAME = 'coveDB';
    const DB_VERSION = 1;
    const TASK_STORE_NAME = 'tasks';

    let db;

    export const openDB = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
          console.error('Database error:', event.target.errorCode);
          reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
          db = event.target.result;
          resolve(db);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
            db.createObjectStore(TASK_STORE_NAME, { keyPath: 'id', autoIncrement: true });
          }
        };
      });
    };

    export const addTask = async (task) => {
      const newTask = { ...task, id: Date.now() };
      const transaction = db.transaction([TASK_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(TASK_STORE_NAME);
      return store.add(newTask);
    };

    export const getAllTasks = () => {
      return new Promise((resolve) => {
        const transaction = db.transaction([TASK_STORE_NAME], 'readonly');
        const store = transaction.objectStore(TASK_STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
      });
    };

    export const updateTask = (task) => {
      const transaction = db.transaction([TASK_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(TASK_STORE_NAME);
      return store.put(task);
    };

    export const deleteTask = (taskId) => {
      const transaction = db.transaction([TASK_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(TASK_STORE_NAME);
      return store.delete(taskId);
    };
