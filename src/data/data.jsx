import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon,
  MinusIcon,
  LoopIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "todo",
    label: "To do",
    icon: CircleIcon,
    bgColor: "bg-gray-500", 
    textColor: "text-gray-700", 
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
    bgColor: "bg-blue-500", 
    textColor: "text-blue-700", 
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
    bgColor: "bg-green-200", 
    textColor: "text-green-700", 
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
    bgColor: "bg-red-500", 
    textColor: "text-red-700", 
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

export const recurences = [
  {
    label: "None",
    value: "none",
    icon: MinusIcon, // Represents no priority
  },
  {
    label: "Daily",
    value: "daily",
    icon: LoopIcon, // Represents a repeating task
  },
  {
    label: "Weekly",
    value: "weekly",
    icon: CalendarIcon, // Represents weekly scheduling
  },
];
