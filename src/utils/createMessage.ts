import { Sockets } from "api/types";

export enum MessageType {
  Outgoing = "outgoing",
  Incoming = "incoming",
}
export const createMessageElement = (
  message: { time: string; content: string },
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

  // const timeMessage = document.createElement("time");
  // timeMessage.classList.add("message__time");
  // timeMessage.textContent = message.time;

  messageInfo.append(messageDelivered, messageReaded);
  messageElement.append(messageElementText, messageInfo);

  return messageElement;
};

export const addDOMMessageElement = (
  webSocketMessage: Sockets,
  userId: number
) => {
  const { content, type, time, user_id } = webSocketMessage;
  const messageStatus =
    String(userId) === user_id ? MessageType.Outgoing : MessageType.Incoming;

  if (type !== "user connected") {
    const messageData = { content, time };
    const messageElement = createMessageElement(messageData, messageStatus);

    document.querySelector(".chat__talk")?.append(messageElement);
  }
};
