import { FastifyInstance } from "fastify";
import { taskRoutes } from "./todoRoutes";

export function registerRoutes(fastify: FastifyInstance) {
  fastify.register(taskRoutes, { prefix: "/api" });
}