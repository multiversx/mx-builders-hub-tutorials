import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw)]  text-white bg-black ">
      <Outlet />
    </div>
  );
};
