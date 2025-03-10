import { FastifyReply, FastifyRequest } from "fastify";
import * as tasksService from "../../services/todoService";
import { ITasks, TaskValidate } from "../../models/tasks";
import formatError from "../../services/errorService";

export const createTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { todo,status, type } = req.body as ITasks;
  const validate = TaskValidate.safeParse({ todo,status, type });
  validate.success || reply.status(400).send(formatError(validate));
  const newUser = await tasksService.createTasks({ todo,status, type });
  return reply.send(newUser);
};