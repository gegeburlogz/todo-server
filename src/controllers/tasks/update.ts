import { FastifyReply, FastifyRequest } from "fastify";
import * as tasksService from "../../services/todoService";
import { ITasks, TaskValidate } from "../../models/tasks";
import formatError from "../../services/errorService";
interface IUpdateTask {
  id: string;
  data: Partial<ITasks>;
}
export const updatedTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const {
    id,
    data: { todo, status, type },
  } = req.body as IUpdateTask;
  const filteredData: Partial<ITasks> = {};
  if (todo !== undefined) filteredData.todo = todo;
  if (status !== undefined) filteredData.status = status;
  if (type !== undefined) filteredData.type = type;

  const validate = TaskValidate.partial().safeParse({ todo, status, type });
  validate.success || reply.status(400).send(formatError(validate));
  const newUser = await tasksService.updateTasks(id,filteredData);
  return reply.send(newUser);
};
