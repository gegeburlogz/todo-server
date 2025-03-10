import { FastifyReply, FastifyRequest } from "fastify";
import * as tasksService from "../../services/todoService";
import { DeleteTaskValidate } from "../../models/tasks";
import { ObjectId } from "mongodb";
import { SafeParseError } from "zod";

export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id, completed, type } = req.body as {
    id: string;
    completed: boolean;
    type: "personal" | "professional";
  };
  const validate = DeleteTaskValidate.safeParse({ id, completed, type });
  validate.success || reply.status(400).send(formatError(validate));

  const task = await tasksService.deleteTask(id, completed, type);
  if (!task) {
    reply.status(404).send({ message: "Task not found" });
  }
  return reply.send({ message: "Task deleted successfully" });
};
function formatError(
  validate: SafeParseError<{
    id: string | ObjectId;
    completed: boolean;
    type: "personal" | "professional";
  }>
): unknown {
  throw new Error("Function not implemented.");
}
