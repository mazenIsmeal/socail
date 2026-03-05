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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContextProvider.jsx";

export default function AppNva() {
  const { token, setToken, userData } = useContext(AuthContext);
  const { name, email, photo } = userData || {};

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-1">
        <NavbarBrand href="https://flowbite-react.com">
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
              <NavbarLink as={Link} to="" active>
                Posts
              </NavbarLink>
              <NavbarLink as={Link} to="/profile">
                Profile
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
