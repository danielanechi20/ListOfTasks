import { z } from "zod";
import { priorities, statuses } from "./data";

const defaultStatus = statuses[0].value;
const statusExceptFirst: string[] = [];
for (let i = 1; i < statuses.length; i++) {
  statusExceptFirst.push(statuses[i].value);
}
const defaultPriority = priorities[0].value;
const priritiesExceptFirst: string[] = [];
for (let i = 1; i < priorities.length; i++) {
  priritiesExceptFirst.push(priorities[i].value);
}

export const taskSchema = z.object({
  id: z.string(),
  title: z
    .string({ required_error: "A title is required" })
    .min(3, "Must be of atleast three charecters."),
  status: z.enum([defaultStatus, ...statusExceptFirst], {
    required_error: "You need to select one.",
  }),
  priority: z.enum([defaultPriority, ...priritiesExceptFirst], {
    required_error: "You need to select one.",
  }),
  useruid: z.string(),
  isFavorite: z
    .boolean({
      required_error: "isActive is required",
      invalid_type_error: "isFavorite must be a boolean",
    })
    .default(false)
    .optional(),
    creationDate: z.preprocess(
      (value) => (typeof value === "string" || value instanceof Date ? new Date(value) : value),
      z.date()
    ),
    deadline: z.preprocess(
      (value) => (typeof value === "string" || value instanceof Date ? new Date(value) : value),
      z.date()
    ),
});

export type Task = z.infer<typeof taskSchema>;
