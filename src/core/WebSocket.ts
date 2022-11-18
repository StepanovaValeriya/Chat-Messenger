import { Sockets } from "api/types";
import { addDOMMessageElement, updateMessages } from "utils/createMessage";
import { sortMessagesByTime } from "utils/sortMessageByTime";

const BASE_URL = "wss://ya-praktikum.tech/ws";

export type SocketData = {
  socket: WebSocket;
  messagesArray: Array<Sockets>;
};
export interface WebSocketProps {
  socketsMap: Map<number, SocketData>;
  createConnection: (userId: number, chat: ChatType) => void;
  setHandlers: (socket: WebSocket, userId: number, chat: ChatType) => void;
}

export class Socket implements WebSocketProps {
  socketsMap: Map<number, SocketData> = new Map();

  createConnection(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    const socket = new WebSocket(`${BASE_URL}/chats/${userId}/${id}/${chatToken}`);

    this.setHandlers(socket, userId, chat);
    this.socketsMap.set(id, { socket, messagesArray: [] });
  }

  setHandlers(socket: WebSocket, userId: number, chat: ChatType) {
    socket.addEventListener("open", () => {
      console.log("Соединение установлено");

      socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${(event as CloseEvent).reason}`);
      this.socketsMap.delete(chat.id);
    });

    socket.addEventListener("message", (event) => {
      console.log("Получены данные");

      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        const socketData = this.socketsMap.get(chat.id) as SocketData;
        const messages = [...socketData.messagesArray, ...data];

        const updatedSocketData = {
          ...socketData,
          messagesArray: sortMessagesByTime(messages),
        };

        this.socketsMap.set(chat.id, {
          socket: updatedSocketData.socket,
          messagesArray: updatedSocketData.messagesArray,
        });
        updateMessages(updatedSocketData.messagesArray, userId);

        return;
      }

      addDOMMessageElement(data, userId);
    });

    socket.addEventListener("error", (event) => {
      console.log("Ошибка", (event as ErrorEvent).message);
    });
  }
}
