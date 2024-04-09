// import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 px-5 flex flex-col gap-5">
      <Header />
      <Outlet/>
    </div>
  );
}
