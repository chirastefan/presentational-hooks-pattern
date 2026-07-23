import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useKanbanBoard } from './useKanbanBoard';

describe('useKanbanBoard custom hook', () => {
  beforeEach(() => {
    // Mock local storage
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        for (const key in store) {
          delete store[key];
        }
      },
    });
  });

  it('should initialize with default tasks', () => {
    const { result } = renderHook(() => useKanbanBoard());
    expect(result.current.tasks.length).toBe(3);
    expect(result.current.tasks[0].id).toBe('task-1');
  });

  it('should add a task', () => {
    const { result } = renderHook(() => useKanbanBoard());
    let added;
    act(() => {
      added = result.current.addTask('Test Task', 'Description text', 'todo');
    });
    expect(result.current.tasks.length).toBe(4);
    expect(result.current.tasks[3].title).toBe('Test Task');
    expect(result.current.tasks[3].status).toBe('todo');
  });

  it('should move a task', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      result.current.moveTask('task-1', 'in-progress');
    });
    const task = result.current.tasks.find((t) => t.id === 'task-1');
    expect(task?.status).toBe('in-progress');
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      result.current.deleteTask('task-1');
    });
    const task = result.current.tasks.find((t) => t.id === 'task-1');
    expect(task).toBeUndefined();
    expect(result.current.tasks.length).toBe(2);
  });
});
