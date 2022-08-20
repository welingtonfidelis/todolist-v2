import { I18nextProvider } from "react-i18next";

import i18n from "./18n";
import TodoListPage from "./pages/todoList";
import HeaderComponent from "./components/header";

import "./app.css";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="app-content">
        <HeaderComponent />
        <TodoListPage />
      </div>
    </I18nextProvider>
  );
}

export default App;
