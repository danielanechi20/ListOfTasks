import { z } from "zod";
import { priorities, statuses } from "./data";

const defaultStatus = statuses[0].value;
const statusExceptFirst = statuses.slice(1).map(status => status.value);

const defaultPriority = priorities[0].value;
const prioritiesExceptFirst = priorities.slice(1).map(priority => priority.value);

export const taskSchema = z.object({
  id: z.string(),
  title: z
    .string({ required_error: "A title is required" })
    .min(3, "Must be at least three characters."),
  status: z.enum([defaultStatus, ...statusExceptFirst], {
    required_error: "You need to select one.",
  }),
  priority: z.enum([defaultPriority, ...prioritiesExceptFirst], {
    required_error: "You need to select one.",
  }),
  useruid: z.string(),
  isFavorite: z
    .boolean({
      required_error: "isFavorite is required",
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

