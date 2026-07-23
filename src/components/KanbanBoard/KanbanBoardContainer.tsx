import React, { useState } from 'react';
import { useKanbanBoard, Task } from './useKanbanBoard';
import { KanbanBoardView } from './KanbanBoardView';

export function KanbanBoardContainer() {
  const { tasks, addTask, moveTask, deleteTask } = useKanbanBoard();
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'info' | 'success' | 'danger' }[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'danger' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleAddTask = (title: string, description: string, status: Task['status']) => {
    const task = addTask(title, description, status);
    addToast(`Task "${task.title}" created successfully!`, 'success');
  };

  const handleMoveTask = (taskId: string, targetStatus: Task['status']) => {
    const updatedTask = moveTask(taskId, targetStatus);
    if (updatedTask) {
      const statusNames = {
        todo: 'To Do',
        'in-progress': 'In Progress',
        done: 'Done',
      };
      addToast(
        `Moved "${updatedTask.title}" to ${statusNames[targetStatus]}`,
        targetStatus === 'done' ? 'success' : 'info'
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    deleteTask(taskId);
    if (taskToDelete) {
      addToast(`Deleted task "${taskToDelete.title}"`, 'danger');
    }
  };

  return (
    <div className="kanban-container-root">
      {/* Toast Notification area managed by the Container (Orchestrator) */}
      <div className="toast-area">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="alert">
            {toast.message}
          </div>
        ))}
      </div>

      {/* Spreading/feeding data to the presentational view */}
      <KanbanBoardView
        tasks={tasks}
        onAddTask={handleAddTask}
        onMoveTask={handleMoveTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
