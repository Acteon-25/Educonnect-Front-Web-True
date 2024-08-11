import { NavLink, useNavigate, Link } from "react-router-dom";
import Logo from "../icons/Logo.png";
import LineDrop from "../icons/LineDrop.svg";
import Equis from "../icons/Equis.svg";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row justify-between items-center py-4 w-full mx-auto bg-gradient-to-r from-green-700 to-blue-500 bg-opacity-75 px-5 text-white">
      <div className={`flex justify-between items-center w-full md:w-auto ${menuOpen ? 'px-5 fixed md:relative' : ''}`}>
        <Link to="/">
          <img src={Logo} alt="Logo" className="rounded-full size-14 transition-transform transform hover:scale-110 duration-300" />
        </Link>
        {menuOpen ? <img
          src={Equis}
          alt="Close Menu"
          className="size-12 cursor-pointer mx-2 md:hidden block transition-transform transform hover:rotate-90"
          onClick={handleClick}
        /> : <img
          src={LineDrop}
          alt="Open Menu"
          className="size-12 cursor-pointer mx-2 md:hidden block transition-transform transform hover:rotate-180"
          onClick={handleClick}
        />}

      </div>
      <nav
        className={`
          flex-col items-center pt-4 
          gap-4 transition-all ease-in-out duration-500 
          md:flex-row md:flex md:items-center md:pt-0 md:gap-x-10
          ${menuOpen ? "flex" : "hidden"
          } md:flex`}
      >
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-2 px-6 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-2 px-6 mx-auto rounded-xl transition-transform transform hover:scale-110"
          }
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-2 px-6 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-2 px-6 mx-auto rounded-xl transition-transform transform hover:scale-110"
          }
          to="/nosotros"
        >
          Nosotros
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-2 px-6 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-2 px-6 mx-auto rounded-xl transition-transform transform hover:scale-110"
          }
          to="/pricing"
        >
          Precios
        </NavLink>
        <button
          className="text-white bg-transparent border border-white hover:bg-gray-800
          hover:border-yellow-500 hover:text-yellow-400 hover:font-bold py-2 px-6 mx-auto rounded-xl transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/login");
          }}
        >
          Iniciar sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
