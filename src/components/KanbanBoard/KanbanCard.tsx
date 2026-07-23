import React from 'react';
import { Task } from './useKanbanBoard';

export interface KanbanCardProps {
  task: Task;
  onMove: (taskId: string, targetStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export function KanbanCard({ task, onMove, onDelete }: KanbanCardProps) {
  return (
    <div className="kanban-card" data-task-id={task.id}>
      <header className="card-header">
        <h3>{task.title}</h3>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task ${task.title}`}
        >
          &times;
        </button>
      </header>
      <p className="card-desc">{task.description}</p>
      
      <footer className="card-actions">
        {task.status !== 'todo' && (
          <button
            onClick={() => onMove(task.id, 'todo')}
            className="action-btn move-left"
            title="Move to To Do"
          >
            ← To Do
          </button>
        )}
        {task.status === 'todo' && (
          <button
            onClick={() => onMove(task.id, 'in-progress')}
            className="action-btn move-right"
            title="Move to In Progress"
          >
            Start →
          </button>
        )}
        {task.status === 'in-progress' && (
          <>
            <button
              onClick={() => onMove(task.id, 'done')}
              className="action-btn move-right success"
              title="Move to Done"
            >
              Complete →
            </button>
          </>
        )}
        {task.status === 'done' && (
          <button
            onClick={() => onMove(task.id, 'in-progress')}
            className="action-btn move-left"
            title="Move back to In Progress"
          >
            ← Reopen
          </button>
        )}
      </footer>
    </div>
  );
}
