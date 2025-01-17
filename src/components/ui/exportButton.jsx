import React from "react";
import { CSVLink } from "react-csv";

const ExportButton = ({ tasks }) => {
  console.log("Exporting tasks:", tasks); // Debug selected tasks

  const csvData = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    creationDate: task.creationDate.toISOString(),
    deadline: task.deadline.toISOString(),
    isFavorite: task.isFavorite ? "Yes" : "No",
  }));

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Title", key: "title" },
    { label: "Status", key: "status" },
    { label: "Priority", key: "priority" },
    { label: "Creation Date", key: "creationDate" },
    { label: "Deadline", key: "deadline" },
    { label: "Favorite", key: "isFavorite" },
  ];

  return (
    <CSVLink
      data={csvData}
      headers={csvHeaders}
      filename="tasks.csv"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Export Tasks
    </CSVLink>
  );
};

export default ExportButton;
