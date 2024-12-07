import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-4">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path; // Check if the item is active

        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 ${
              isActive ? "bg-[#FFD6D6]" : "hover:bg-muted"
            }`}
            style={{ fontFamily: "Inter" }}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="md:ml-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              {/* <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle> */}
            </SheetHeader>
            <div className="md:hidden flex-col border-r bg-[#F5F5F5] p-4 mt-2 w-auto h-auto rounded-md -ml-4">
              <div className="flex items-center -ml-3">
                <div className="bg-white text-xl font-bold rounded-md flex w-12 justify-center items-center p-2">
                  <div>{user?.userName[0].toUpperCase()}</div>
                </div>
                <div className="ml-4 -mt-4 font-medium text-lg">
                  {user?.userName}
                </div>
              </div>
              <div className="ml-10 -mt-4">{user?.email}</div>
            </div>
            <hr className="mt-4 border-[1px] text-[#C1C1C1]" />
            <MenuItems setOpen={setOpen} />
            
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden w-64 flex-col border-r bg-[#F5F5F5] p-6 lg:flex md:h-auto md:mt-[64px] rounded-md shadow-md">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          {/* <ChartNoAxesCombined size={30} /> */}
          {/* <h1 className="text-2xl font-extrabold">Admin Panel</h1> */}
        </div>
        <div className="mt-6 flex flex-col -ml-6">
          <div className="flex items-center">
            <div className="bg-white text-xl font-bold rounded-md flex w-12 justify-center items-center p-2">
              <div>{user?.userName[0].toUpperCase()}</div>
            </div>
            <div className="ml-4 -mt-4 font-medium text-lg">
              {user?.userName}
            </div>
          </div>
          <div className="ml-16 -mt-4">{user?.email}</div>
        </div>
        <hr className="mt-4 border-[1px] text-[#C1C1C1]"/>
        <MenuItems />
      </div>
    </div>
  );
}

export default AdminSideBar;
