import { rest } from "msw";
import { todoMocks } from "./todoMocks";

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (_, res, ctx) => {
    console.log("first");
    return res(ctx.status(200), ctx.json(todoMocks));
  }),
];
