import styles from "./ToDoItem.module.css";

import { Trash, Check } from "phosphor-react";

import { ToDoItemType } from "./App";

interface TodoItemProps {
  item: ToDoItemType;
  handleCheckboxChange: (id: string) => void;
  handleDeleteToDoItem: (id: string) => void;
}

export function ToDoItem({
  item: { id, isChecked, text },
  handleCheckboxChange,
  handleDeleteToDoItem,
}: TodoItemProps) {
  return (
    <div className={styles.toDoItem}>
      <div className={styles.checkboxWrapper}>
        {isChecked && <Check size={12} />}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleCheckboxChange(id)}
        />
      </div>
      <span className={isChecked ? styles.disabledText : ""}>{text}</span>
      <button title="Deletar Tarefa">
        <Trash size={20} onClick={() => handleDeleteToDoItem(id)} />
      </button>
    </div>
  );
}
