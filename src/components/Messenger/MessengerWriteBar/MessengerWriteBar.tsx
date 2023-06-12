import React, { memo } from "react";

import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

import classes from "./MessengerWriteBar.module.css";
import { WriteBarMessage } from "./WriteBarMessage";
import { SelectedMessagesBar } from "./SelectedMessagesBar";

interface IProps {
  chatGpt: ChatGptTemplate;
  handleSend: (message: string) => void;
  isTyping: boolean;
  writeBarBefore: React.ReactNode;
  scrollToBottom: () => void;
  additionalRequest: (
    handleSend: (value: string) => void,
    scrollToBottom: () => void
  ) => React.ReactNode;
}

function MessengerWriteBar({
  chatGpt,
  handleSend,
  writeBarBefore,
  additionalRequest,
  scrollToBottom,
}: IProps) {
  const hasSelectedMessages = chatGpt.hasSelectedMessages$.get();

  return (
    <div className={classes.container}>
      <div style={{ width: "100%" }}>
        <div style={{ display: hasSelectedMessages ? "block" : "none" }}>
          <SelectedMessagesBar chatGpt={chatGpt} />
        </div>
        <div style={{ display: !hasSelectedMessages ? "block" : "none" }}>
          {additionalRequest(handleSend, scrollToBottom)}
        </div>
        <WriteBarMessage
          writeBarBefore={writeBarBefore}
          chatGpt={chatGpt}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}

export default memo(MessengerWriteBar);
