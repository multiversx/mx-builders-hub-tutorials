import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw-20rem)] mb-16">
      <Outlet />
    </div>
  );
};
