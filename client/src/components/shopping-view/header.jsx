import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import Cartlogo from '/cartnav.png';

function MenuItems({onClose}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
    } else {
      navigate(getCurrentMenuItem.path);
    }

    onClose(); 
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent({onClose}) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/auth/login");
    onClose();
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button
        variant="outline"
        size="icon"
        className="hidden lg:flex items-center"
        onClick={() => navigate("/shop/search")} 
      >
        <AiOutlineSearch className="w-6 h-6" />
        <span className="sr-only">Search</span>
      </Button>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => {
            setOpenCartSheet(true);
            onClose(); 
          }}
          variant="outline"
          size="icon"
          className="relative"
        >
          
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>


      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { navigate("/shop/account"); onClose(); }}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => { navigate("/auth/login"); onClose(); }}>
          <b>Login</b>
        </Button>
      )}
    </div>
  );
}

function ShoppingHeader() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <header className="fixed z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center">
          <img src={Cartlogo} alt='Cartlogo' className="h-8 w-8 md:h-[100px] md:w-[100px]" />
          <span className="font-bold md:-translate-x-4 md:translate-y-1" style={{fontFamily:'Inter'}}>Suparcart</span>
        </Link>
        <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems onClose={() => setOpenSidebar(false)} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
