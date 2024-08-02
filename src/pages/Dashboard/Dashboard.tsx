import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="max-w-[calc(100vw-0rem)]  text-white bg-black ">
      <Outlet />
    </div>
  );
};
