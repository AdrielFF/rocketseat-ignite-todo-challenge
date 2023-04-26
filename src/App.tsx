import { useState, ChangeEvent, FormEvent, InvalidEvent } from "react";
import { PlusCircle } from "phosphor-react";

import { v4 as uuidv4 } from "uuid";

import { Header } from "./Header";
import { ToDoItem } from "./ToDoItem";

import ClipboardIcon from "./assets/clipboard-icon.svg";

import styles from "./App.module.css";
import "./Global.css";

export interface ToDoItemType {
  id: string;
  text: string;
  isChecked: boolean;
}

function App() {
  const [toDoList, setToDoList] = useState<ToDoItemType[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");

  function updateCheckboxCheck(id: string) {
    const updatedCheckedToDoList = toDoList.map((item) => {
      if (item.id === id) {
        item.isChecked = item.isChecked ? false : true;
      }
      return item;
    });

    setToDoList(updatedCheckedToDoList);
  }

  function deleteToDoItem(id: string) {
    const newToDoList = toDoList.filter((item) => item.id !== id);

    setToDoList(newToDoList);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTaskInput(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setToDoList((state) => {
      return [...state, { id: uuidv4(), text: taskInput, isChecked: false }];
    });

    setTaskInput("");
  }

  function handleInvalidTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const tasksDone = toDoList.filter((item) => item.isChecked === true).length;

  const allTasks = toDoList.length;

  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            onChange={handleNewTaskChange}
            value={taskInput}
            placeholder="Adicione uma nova tarefa"
            required
            onInvalid={handleInvalidTask}
          />
          <button type="submit" title="Criar Tarefa">
            Criar <PlusCircle size={20} />
          </button>
        </form>
        <div className={styles.toDoWrapper}>
          <header>
            <strong className={styles.createdTasks}>
              Tarefas criadas <span>{allTasks}</span>
            </strong>
            <strong className={styles.completedTasks}>
              Concluídas{" "}
              <span>{allTasks > 0 ? `${tasksDone} de ${allTasks}` : "0"}</span>
            </strong>
          </header>
          <ul className={styles.toDoList}>
            {toDoList.length > 0 ? (
              toDoList.map((item) => {
                return (
                  <ToDoItem
                    key={item.id}
                    item={item}
                    handleCheckboxChange={updateCheckboxCheck}
                    handleDeleteToDoItem={deleteToDoItem}
                  />
                );
              })
            ) : (
              <div className={styles.toDoWithNoItem}>
                <img src={ClipboardIcon} alt="icone de prancheta" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
