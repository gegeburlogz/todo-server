import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { connectdb } from "./config/db";
import { registerRoutes } from "./routes";

dotenv.config();

const fastify = Fastify({ logger: true });
fastify.register(cors,{
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
});
connectdb().then(() => {
  console.log("Connected to database");
});
registerRoutes(fastify);

const start = async () => {
  try {
    await fastify.listen({ port: 3212 });
    const address = fastify.server.address();
    if (typeof address === 'object' && address !== null) {
      console.log(`Server listening on ${address.port}`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
