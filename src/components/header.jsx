import { Link, useLocation } from "react-router-dom";
import Logo from "./logo";
import HeaderButtons from "./headerButtons";

const Header = () => {
  const location = useLocation();
  const navLinks = [
    { to: "/painel", label: "Painel" },
    { to: "/meus-servicos", label: "Serviços" },
    { to: "/meus-cupons", label: "Cupons" },
    { to: "/home", label: "Sair" },
  ];

  return (
    <header className="flex items-center w-full px-6 md:px-12 min-h-[78px] bg-stone-900 border-b border-zinc-300 shadow-md">
      <div className="flex items-center flex-1">
        <Logo />
      </div>

      <nav className="hidden md:flex flex-1 justify-center items-center gap-10 text-white text-xl">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-3 py-2 transition hover:text-amber-500 ${
              location.pathname === to ? "text-amber-500 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex">
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
