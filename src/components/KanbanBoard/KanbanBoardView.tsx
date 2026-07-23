import React, { useState } from 'react';
import { Task } from './useKanbanBoard';
import { KanbanColumn } from './KanbanColumn';

export interface KanbanBoardViewProps {
  tasks: Task[];
  onMoveTask: (taskId: string, targetStatus: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: (title: string, description: string, status: Task['status']) => void;
}

export function KanbanBoardView({
  tasks,
  onMoveTask,
  onDeleteTask,
  onAddTask,
}: KanbanBoardViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title.trim(), description.trim(), status);
    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

  const columns: { title: string; status: Task['status'] }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Done', status: 'done' },
  ];

  return (
    <div className="kanban-board-view">
      <header className="kanban-header">
        <button
          className="add-task-trigger-btn"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? 'Close Form' : '+ New Task'}
        </button>
      </header>

      {showAddForm && (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <h3>Create New Task</h3>
          <div className="form-group">
            <label htmlFor="task-title">Title</label>
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Configure ESLint rules"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task objective..."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button type="submit" className="submit-task-btn">
            Create Task
          </button>
        </form>
      )}

      <div className="kanban-grid">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasks.filter((t) => t.status === col.status)}
            onMove={onMoveTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
