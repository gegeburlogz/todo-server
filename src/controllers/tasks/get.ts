import { FastifyReply, FastifyRequest } from "fastify";
import * as tasksService from "../../services/todoService";

type getQuery = {
  type: "personal" | "professional";
  page: string;
  limit: string;
};

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { type, page, limit } = req.query as getQuery;
  const tasks = await tasksService.getTasks(type, page, limit);
  return reply.send(tasks);
};
