import type { Task } from "./task-list";


import styles from "./task-item.module.css";

type TaskItemProp = {
  task: Task;
  handleDelete: (id: string) => void;
  handleToggleCompleted: (id: string) => void;
}

export function TaskItem({ task, handleDelete, handleToggleCompleted}:TaskItemProp){

  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            data-testid={`task-${task.id}`}
            checked={task.state === "COMPLETED"}
            onChange={() => handleToggleCompleted(task.id)}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
      </div>
      <span style={task.state === "COMPLETED" ? { textDecoration: 'line-through', flex: 1 } : { flex: 1 }}>{task.title}</span>
      <div className={styles.actions}>
        <button
          data-testid={`delete-${task.id}`}
          className={styles.deleteButton}
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};