import { setupServer } from "msw/node";
import { rest } from "msw";
import { PATH } from "../constants/constAPI";

const handlers = [
  rest.post(`${PATH.BASE}auth/logout`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${PATH.BASE}auth/signin`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${PATH.BASE}chats`, (_req, res, ctx) => {
    return res(ctx.json([]));
  }),
];

export const server = setupServer(...handlers);
