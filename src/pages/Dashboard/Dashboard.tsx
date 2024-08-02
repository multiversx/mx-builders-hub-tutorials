import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw-0rem)] mb-16 dark dark:text-white dark:bg-blue-gray-900">
      <Outlet />
    </div>
  );
};
