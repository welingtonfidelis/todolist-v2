import UserAvatarComponent from "./components/userAvatar";

import "./app.css";
import TodoListComponent from "./components/todoList";

function App() {
  return (
    <div className="app-content">
      <div className="header-content">
        <span>Olá, Seja bem vindo(a) de volta!</span>
        <UserAvatarComponent />
      </div>

      <TodoListComponent />
    </div>
  );
}

export default App;
