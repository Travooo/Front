import { Link } from "react-router-dom";
import Logo from "../../components/logo";
import AuthButtons from "./authButtons";

const Header = () => {
  return (
    <header className="flex items-center w-full px-6 md:px-12 min-h-[78px] bg-stone-900 border-b border-zinc-300 shadow-md">
      <div className="flex items-center flex-1">
        <Logo />
      </div>

      {/* Espaço reservado para futuros elementos do lado direito */}
      <div className="flex justify-end w-[150px]">
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
