
import { useTranslation } from "react-i18next";

import UserAvatarComponent from "../userAvatar";
import { HeaderContent } from "./style";

export default function HeaderComponent() {
  const {t} = useTranslation();

  return (
    <HeaderContent>
      <span>{t('components.header.welcome_title')}</span>
      <UserAvatarComponent />
    </HeaderContent>
  );
}
