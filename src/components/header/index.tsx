import UserAvatarComponent from "../userAvatar";
import "./style.css";

export default function HeaderComponent() {
  return (
    <div className="header-content">
      <span>Olá, Seja bem vindo(a) de volta!</span>
      <UserAvatarComponent />
    </div>
  );
}
