import React from 'react';
import { Task } from './useKanbanBoard';
import { KanbanCard } from './KanbanCard';

export interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onMove: (taskId: string, targetStatus: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export function KanbanColumn({ title, status, tasks, onMove, onDelete }: KanbanColumnProps) {
  return (
    <div className={`kanban-column column-${status}`} data-column-status={status}>
      <header className="column-header">
        <h2>{title}</h2>
        <span className="task-count" aria-label={`${tasks.length} tasks`}>
          {tasks.length}
        </span>
      </header>

      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="empty-state">No tasks here</div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
