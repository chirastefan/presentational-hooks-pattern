import { useState, useEffect, useCallback } from 'react';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
};

const STORAGE_KEY = 'kanban-board-tasks';

const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Architect Domain Models',
    description: 'Define pure TypeScript interfaces for the Hexagonal project.',
    status: 'todo',
  },
  {
    id: 'task-2',
    title: 'Implement Headless Dropdown',
    description: 'Ensure accessibility attributes spread properly on native buttons.',
    status: 'in-progress',
  },
  {
    id: 'task-3',
    title: 'Write Walkthrough Report',
    description: 'Document design choices and verification logs in walkthrough.md.',
    status: 'done',
  },
];

export function useKanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string, description: string, status: Task['status']) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      status,
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const moveTask = useCallback((taskId: string, targetStatus: Task['status']) => {
    let movedTask: Task | undefined;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          movedTask = { ...t, status: targetStatus };
          return movedTask;
        }
        return t;
      })
    );
    return movedTask;
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  return {
    tasks,
    addTask,
    moveTask,
    deleteTask,
  };
}
