import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContextProvider.jsx";

export default function AppNva() {
  const { token, setToken, userData, unreadCount } = useContext(AuthContext);
  const { name, email, photo } = userData || {};

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-50">
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Social App
          </span>
        </NavbarBrand>
        {/* user info */}
        {token && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={photo} rounded />}
            >
              <DropdownHeader>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </DropdownHeader>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownItem as={Link} to="/settings">
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logout}>Sign out</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
        )}

        <NavbarCollapse>
          {token ? (
            <>
              <NavbarLink
  as={NavLink}
  to="/"
  className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : ""
  }
>
  Posts
</NavbarLink>

<NavbarLink
  as={NavLink}
  to="/profile"
  className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : ""
  }
>
  Profile
</NavbarLink>

<NavbarLink
  as={NavLink}
  to="/notifications"
  className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : ""
  }
>
  Notifications
  {unreadCount?.data?.unreadCount > 0 && (
    <span className="rounded-full px-2 py-0.5 text-xs bg-white text-[#1877f2]">
      {unreadCount?.data?.unreadCount}
    </span>
  )}
</NavbarLink>
            </>
          ) : (
            <>
              <NavbarLink as={Link} to="/login">
                Login
              </NavbarLink>
              <NavbarLink as={Link} to="/singUp">
                SingUp
              </NavbarLink>
            </>
          )}
        </NavbarCollapse>
      </Navbar>
    </>
  );
}
