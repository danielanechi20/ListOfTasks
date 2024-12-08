import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const features = [
  {
    id: 1,
    title: " Intuitive Task Organization",
    description:
      "Easily create, prioritize, and manage tasks with our intuitive drag-and-drop interface",
  },
  {
    id: 2,
    title: "Collaborative Workspaces",
    description:
      "Collaborate seamlessly with your team by sharing tasks, assigning deadlines, and tracking progress in real-time",
  },
  {
    id: 3,
    title: "Customizable Reminders",
    description:
      "Stay on top of your deadlines and commitments with customizable reminders and notifications.",
  },
  {
    id: 4,
    title: "Cross-Platform Accessibility",
    description:
      "Access your tasks and workspaces from any device, anywhere, anytime.",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
