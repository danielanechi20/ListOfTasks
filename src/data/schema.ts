import { z } from "zod";
import { labels, priorities, statuses } from "./data";

const defaultStatus = statuses[0].value;
const statusExceptFirst: string[] = [];
for (let i = 1; i < statuses.length; i++) {
  statusExceptFirst.push(statuses[i].value);
}

const defaultLabel = labels[0].value;
const labelsExceptFirst: string[] = [];
for (let i = 1; i < labels.length; i++) {
  labelsExceptFirst.push(labels[i].value);
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
  label: z.enum([defaultLabel, ...labelsExceptFirst], {
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
});

export type Task = z.infer<typeof taskSchema>;
