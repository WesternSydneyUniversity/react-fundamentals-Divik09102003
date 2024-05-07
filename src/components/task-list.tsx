"use client";

import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";
import { useState } from "react";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [newTaskValue, setTaskValue] = useState("");

  const handleAddTask =() => {
    if (newTaskValue==""){
      return;
    }
  

    const newTask: Task = {
      id: Math.random().toString(),
      title: newTaskValue,
      state: "ACTIVE"
    };
    setTaskList([...taskList, newTask]);
    setTaskValue("");
  };

    const handleDelete = (id: string) => {
      const newTaskList = taskList.filter((task) => task.id !== id);
      setTaskList(newTaskList);
    }

    const handleToggleCompleted = (id: string) => {
      const newTaskList = taskList.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            state: (task.state === "ACTIVE" ? "COMPLETED" : "ACTIVE") as | 
            "COMPLETED" | "ACTIVE" | "PINNED",
          };
        }
        return task;
      });
      setTaskList(newTaskList);
    }

    const countActiveTask = (tasks: Task[]):number => {
      return tasks.filter((task) => task.state === "ACTIVE").length;
    };



  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>{countActiveTask(taskList) === 1 ? '1 task' : `${countActiveTask(taskList)} tasks`} </div>
        </section>
        <section className={styles.section}>
          {taskList.map((task) => (
            <TaskItem 
            key={task.id} 
            task={task}
            handleDelete={handleDelete}
            handleToggleCompleted={handleToggleCompleted} />
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value = {newTaskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
        <button className={styles.taskButton} onClick={handleAddTask}>Add Task</button>
      </section>
    </>
  );
}

