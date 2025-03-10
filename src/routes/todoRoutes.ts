import { FastifyInstance } from "fastify";
import { createTasks } from "../controllers/tasks/post";
import { getTasks } from "../controllers/tasks/get";
import { updatedTask } from "../controllers/tasks/update";
import { deleteTask } from "../controllers/tasks/delete";
export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", getTasks);
  fastify.post("/tasks", createTasks);
  fastify.patch("/tasks",updatedTask);
  fastify.delete("/tasks",deleteTask);
}