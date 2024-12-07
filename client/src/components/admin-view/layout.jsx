import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen md:w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className="flex flex-1 flex-col mx-4 md:mx-6">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <div className="flex-col flex bg-[#F5F5F5] p-2 md:p-6 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
