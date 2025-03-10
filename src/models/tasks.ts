import { dateSchema, IDate, objectIdSchema } from "./utils";
import { z } from "zod";
export const TaskValidate= z.object({
    _id: objectIdSchema.optional(),
    todo: z.string(),
    status: z.boolean(),
    type: z.enum(["personal","professional"])
}).extend(dateSchema.shape);

export const DeleteTaskValidate= z.object({
    id: objectIdSchema.or(z.literal("all")),
    completed: z.boolean(),
    type: z.enum(["personal","professional"])
})

export type ITasks = z.infer<typeof TaskValidate>;