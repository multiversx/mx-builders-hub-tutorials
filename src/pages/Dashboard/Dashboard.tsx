import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw)] max-h-[calc(100%)] text-white bg-black ">
      <Outlet />
    </div>
  );
};
