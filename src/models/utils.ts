import { ObjectId } from "mongodb";
import { z } from "zod";

export const dateSchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type IDate = z.infer<typeof dateSchema>;

export const objectIdSchema = z.custom<ObjectId>(
  (val) =>
    val instanceof ObjectId ||
    (typeof val === "string" && ObjectId.isValid(val)),
  { message: "Invalid ObjectId" }
);
