import TodoListComponent from "./components/todoList";
import HeaderComponent from "./components/header";

import "./app.css";

function App() {
  return (
    <div className="app-content">
      <HeaderComponent />
      <TodoListComponent />
    </div>
  );
}

export default App;
