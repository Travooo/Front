import { Link } from "react-router-dom";
import Logo from "./logo";
import HeaderButtons from "./headerButtons";

const Header = () => {
  return (
    <header className="flex items-center w-full px-6 md:px-12 min-h-[78px] bg-stone-900 border-b border-zinc-300 shadow-md">
      <div className="flex items-center flex-1">
        <Logo />
      </div>

      <nav className="hidden md:flex flex-1 justify-center items-center gap-10 text-white text-xl">
        <Link to="/painel" className="px-3 py-2 hover:text-amber-500 transition">
          Painel
        </Link>
        <Link to="/locais" className="px-3 py-2 hover:text-amber-500 transition">
          Locais
        </Link>
        <Link to="/meus-cupons" className="px-3 py-2 hover:text-amber-500 transition">
          Cupons
        </Link>
        <Link to="/club-travo" className="px-3 py-2 hover:text-amber-500 transition">
          Club Travo
        </Link>
      </nav>

      {/* Espaço reservado para futuros elementos do lado direito */}
      <div className="hidden md:flex">
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
