import { KanbanBoard } from './components/KanbanBoard';
import './components/KanbanBoard/KanbanBoard.css';
import './App.css';

function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Container & Presentational Pattern</h1>
        <p className="subtitle">
          Using custom hooks for domain data fetching, container components for orchestration side effects, and presentational views for layout.
        </p>
      </header>

      <main className="dashboard-main">
        <KanbanBoard />
      </main>

      <footer className="dashboard-footer">
        <p>Built with React + TypeScript + Headless Hook + Container/Presentational Pattern</p>
      </footer>
    </div>
  );
}

export default App;
