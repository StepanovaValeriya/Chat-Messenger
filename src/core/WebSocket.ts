import { Sockets } from "api/types";
import { addDOMMessageElement } from "utils/createMessage";

const BASE_URL = "wss://ya-praktikum.tech/ws";

export interface WebSocketProps {
  socketsMap: Map<string, SocketData>;
  createConnection: (userId: number, chat: ChatType) => void;
  setHandlers: (socket: WebSocket, userId: number, chat: ChatType) => void;
}
export type SocketData = {
  socket: WebSocket;
  oldMessagesArray: Array<Sockets>;
};
export class Socket implements WebSocketProps {
  socketsMap: Map<string, SocketData> = new Map();

  createConnection(userId: number, chat: ChatType) {
    const { id, chatToken } = chat;
    console.log(id, chatToken);
    const socket = new WebSocket(
      `${BASE_URL}/chats/${userId}/${id}/${chatToken}`
    );

    this.setHandlers(socket, userId, chat);
    this.socketsMap.set(String(id), { socket: socket, oldMessagesArray: [] });
  }

  setHandlers(socket: WebSocket, userId: number, chat: ChatType) {
    socket.addEventListener("open", () => {
      console.log("Соединение установлено");

      let currentMessageNumber = 0;

      while (currentMessageNumber < chat.unreadCount) {
        const messageObject = {
          content: String(currentMessageNumber),
          type: "get old",
        };

        socket.send(JSON.stringify(messageObject));
        currentMessageNumber += 20;
      }
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(
        `Код: ${event.code} | Причина: ${(event as CloseEvent).reason}`
      );
      this.socketsMap.delete(String(userId));
    });

    socket.addEventListener("message", (event) => {
      console.log("Получены данные", event.data);

      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        const socketData = this.socketsMap.get(String(chat.id)) as SocketData;
        socketData.oldMessagesArray = [...socketData.oldMessagesArray, ...data];

        this.socketsMap.set(String(chat.id), {
          socket: socketData.socket,
          oldMessagesArray: socketData.oldMessagesArray,
        });

        data.forEach((message: Sockets) => {
          addDOMMessageElement(message, userId);
        });

        return;
      }

      addDOMMessageElement(data, userId);
    });

    socket.addEventListener("error", (event) => {
      console.log("Ошибка", (event as ErrorEvent).message);
    });
  }
}
