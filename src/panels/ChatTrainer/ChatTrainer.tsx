import React from "react";
import { Panel } from "@vkontakte/vkui";

import { Messenger } from "$/components/Messenger";
import { useNavigationContext } from "$/NavigationContext";
import { chatGpt } from "$/entity/GPT";

import { ChatTrainerWriteBarBefore } from "./ChatTrainerWriteBarBefore";

interface IProps {
  id: string;
}

function ChatTrainer({ id }: IProps) {
  const { goBack, goToEditor } = useNavigationContext();

  const onOpenEditor = () => {
    goToEditor();
  };

  return (
    <Panel id={id}>
      <Messenger
        goBack={goBack}
        chatGpt={chatGpt.chatGptTrainer}
        additionalRequest={() => null}
        writeBarBefore={
          <ChatTrainerWriteBarBefore onOpenEditor={onOpenEditor} />
        }
        onStartChat={() => {}}
      />
    </Panel>
  );
}

export default ChatTrainer;
