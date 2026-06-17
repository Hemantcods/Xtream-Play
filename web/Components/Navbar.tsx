import {
  BellSimpleIcon,
  CaretDownIcon,
  ChatCenteredDotsIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="text-white bg-[#19233A] w-full h-15 flex">
      <div className="w-full mr-100"></div>
      <div className="w-full flex justify-between items-center mt-1 px-10">
        <div className="Search relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none pb-1 ">
            <MagnifyingGlassIcon size={20} type="dualtone" opacity={"60%"} />
          </div>
          <textarea
            placeholder="Search"
            name="search"
            id="search"
            className="bg-[#1E2639] outline-none resize-none h-10 rounded-2xl pl-9 pt-2 "
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
        </div>
        <div className="Meassage">
          <ChatCenteredDotsIcon size={25} />
        </div>
        <div className="Notification">
          <BellSimpleIcon size={25} />
        </div>
        <div className="profile flex gap-2">
          <div className="img w-10 h-10 rounded-full overflow-hidden">
            {user ? (
              <img
                src="https://imgs.search.brave.com/QvfYzRJJSmVaxtXDSV0yFbbf8OKJ4XZfHcf5dG9nq3s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzczLzc3LzAw/LzM2MF9GXzE3Mzc3/MDA2OF9MUlF5TlVa/UW45V3RReUpvSnNP/RXdLOHF3Qnp5cEJt/MC5qcGc"
                alt="profile"
                className="w-full h-full"
              />
            ) : (
              <img
                src="https://imgs.search.brave.com/QvfYzRJJSmVaxtXDSV0yFbbf8OKJ4XZfHcf5dG9nq3s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzczLzc3LzAw/LzM2MF9GXzE3Mzc3/MDA2OF9MUlF5TlVa/UW45V3RReUpvSnNP/RXdLOHF3Qnp5cEJt/MC5qcGc"
                alt="profile"
                className="w-full h-full"
              />
            )}
          </div>
          <div className="detail flex flex-col">
            {user ? (
              <>
                <span className="name text-sm font-semibold">{user.name}</span>
                <span className="email text-xs text-gray-400">
                  {user.role === "admin" ? "Admin" : user.role === "moderator" ? "Moderator" : "User"}
                </span>
              </>
            ) : (
              <>
                <span className="name text-sm font-semibold">Guest</span>
                <span className="email text-xs text-gray-400">Not logged in</span>
              </>
            )}
          </div>
          <div className="arrowDown relative">
            <CaretDownIcon 
              size={25} 
              onClick={()=>(handleProfileMenu)}
              className="cursor-pointer"
            />
            {anchorEl && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <div className="py-2">
                  {!user ? (
                    <>
                      <button 
                        onClick={() => {
                          handleClose();
                          router.push("/login");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </button>
                      <button 
                        onClick={() => {
                          handleClose();
                          router.push("/register");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          handleClose();
                          router.push("/profile");
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
