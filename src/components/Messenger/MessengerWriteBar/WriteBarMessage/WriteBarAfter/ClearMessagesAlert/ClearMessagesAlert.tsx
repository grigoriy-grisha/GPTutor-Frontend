import React from "react";
import { Alert } from "@vkontakte/vkui";

import { InPortal } from "$/components/InPortal";

interface IProps {
  applySettings: () => void;
  closeAlert: () => void;
}

function ClearMessagesAlert({ applySettings, closeAlert }: IProps) {
  return (
    <InPortal id="root">
      <Alert
        actions={[
          {
            title: "Удалить диалог",
            mode: "destructive",
            action: applySettings,
          },
          { title: "Отмена", mode: "cancel", action: closeAlert },
        ]}
        actionsLayout="vertical"
        onClose={closeAlert}
        header="Подтвердите действие"
        text="Вы уверены? Диалог нельзя будет вернуть!"
      />
    </InPortal>
  );
}

export default ClearMessagesAlert;
