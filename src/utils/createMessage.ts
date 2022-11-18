import { Sockets } from "api/types";
import { displayDate } from "./displayDate";

export enum MessageType {
  Outgoing = "outgoing",
  Incoming = "incoming",
}
export const createMessageElement = (
  message: { displayTime: string; content: string },
  type: MessageType
): HTMLDivElement => {
  const elementClassType =
    type === MessageType.Outgoing
      ? ["message", "message__outgoing"]
      : ["message", "message__incoming"];

  const messageElement = document.createElement("div");
  messageElement.classList.add(...elementClassType);

  const messageElementText = document.createElement("div");
  messageElementText.classList.add("message__text");
  messageElementText.textContent = message.content;

  const messageInfo = document.createElement("div");
  messageInfo.classList.add("message__info");

  const messageDelivered = document.createElement("span");
  const messageReaded = document.createElement("span");
  if (type === MessageType.Outgoing) {
    messageDelivered.classList.add("message__delivered");
    messageReaded.classList.add("message__readed");
  }

  const timeMessage = document.createElement("time");
  timeMessage.classList.add("message__time");

  timeMessage.textContent = message.displayTime;

  messageInfo.append(messageDelivered, messageReaded);
  messageElement.append(messageElementText, messageInfo, timeMessage);

  return messageElement;
};

export const addDOMMessageElement = (webSocketMessage: Sockets, userId: number) => {
  const { content, type, time, user_id } = webSocketMessage;

  const messageStatus = String(userId) === user_id ? MessageType.Incoming : MessageType.Outgoing;

  if (type !== "user connected") {
    const displayTime = displayDate(time);
    const messageData = { content, displayTime };
    const messageElement = createMessageElement(messageData, messageStatus);

    document.querySelector(".chat__talk")?.append(messageElement);
  }
};
