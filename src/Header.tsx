import styles from "./Header.module.css";

import todoLogo from "./assets/logo-todo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={todoLogo} alt="logotipo do todo" />
      </div>
    </header>
  );
}
