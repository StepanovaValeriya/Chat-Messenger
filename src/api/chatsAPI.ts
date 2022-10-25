import HTTPTransport from "core/HttpTransport";
import {
  CreateChatRequestData,
  DeleteChatRequestData,
  ResponseData,
} from "./types";

export default class ChatsAPI extends HTTPTransport {
  constructor() {
    super();
  }
  createChat = async (data: CreateChatRequestData): Promise<ResponseData> =>
    this.post("chats", { data }) as Promise<ResponseData>;

  deleteChat = async (data: DeleteChatRequestData): Promise<ResponseData> =>
    this.delete("chats", { data }) as Promise<ResponseData>;

  getChats = async () => this.get("chats");
}
