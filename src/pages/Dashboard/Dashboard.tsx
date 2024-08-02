import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw-0rem)] mb-16 text-white bg-black ">
      <Outlet />
    </div>
  );
};
