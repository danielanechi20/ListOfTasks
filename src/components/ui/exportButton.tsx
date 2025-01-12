import React from 'react';
import { CSVLink } from 'react-csv';  // CSV export library

interface ExportButtonProps {
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    useruid: string;
    creationDate: Date;
    deadline: Date;
    isFavorite?: boolean;
  }>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ tasks }) => {
  // Prepare data for CSV export
  const csvData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    creationDate: task.creationDate.toISOString(),  // Convert date to string for CSV
    deadline: task.deadline.toISOString(),
    isFavorite: task.isFavorite ? "Yes" : "No"  // Convert boolean to string for better readability
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
    <div className="absolute bottom-4 right-4">
      <CSVLink
        data={csvData}
        headers={csvHeaders}
        filename="tasks.csv"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        Export Selected Tasks
      </CSVLink>
    </div>
  );
};

export default ExportButton;
