import { Collection, ObjectId } from "mongodb";
import { connectdb } from "../config/db";
import { ITasks } from "../models/tasks";
import { skip } from "node:test";

const DBSetup = async () => {
  const db = await connectdb();
  const tasksCollection: Collection<ITasks> = db.collection<ITasks>("tasks");
  return tasksCollection;
};
type pagination = {
  total: number;
  currentPage: number;
  totalPages: number;
};

export const getTasks = async (
  type: "personal" | "professional" | undefined,
  page: string,
  limit: string
): Promise<{ data: ITasks[]; pagination: pagination }> => {
  const tasks = await DBSetup();
  const pageNumber = Math.max(1, parseInt(page, 10));
  const limitNumber = Math.max(1, parseInt(limit, 10));
  const skip = (pageNumber - 1) * limitNumber;
  const filter = type ? { type } : {};
  const total = await tasks.countDocuments(filter);
  return {
    data: await tasks.find(filter).skip(skip).limit(limitNumber).sort({createdAt:-1}).toArray(),
    pagination: {
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

export const createTasks = async ({
  status,
  todo,
  type,
}: ITasks): Promise<ITasks> => {
  const tasks = await DBSetup();
  const newTasks: ITasks = {
    todo,
    status,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await tasks.insertOne(newTasks);
  return newTasks;
};

export const updateTasks = async (
  id: string,
  data: Partial<ITasks>
): Promise<ITasks> => {
  const tasks = await DBSetup();
  const updatedTask = { ...data, updatedAt: new Date() };
  await tasks.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
  const task = await tasks.findOne({ _id: new ObjectId(id) });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

export const deleteTask = async (
  id: string,
  completed: boolean,
  type: "personal" | "professional"
): Promise<any> => {
  const tasks = await DBSetup();
  if (id === "all") {
    if (completed && type) {
      return await tasks.deleteMany({ status: true, type });
    } else {
      throw new Error("Must have a type");
    }
  }

  const task = await tasks.findOne({ _id: new ObjectId(id) });
  if (!task) {
    throw new Error("Task not found");
  }

  return await tasks.deleteOne({ _id: new ObjectId(id) });
};
