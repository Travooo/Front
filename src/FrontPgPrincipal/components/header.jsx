import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="\FrontLoginUsuario\imagens\icone_travo.png" alt="Logo TRAVO" className="w-10 h-10" />
        <span className="text-2xl font-bold">TRAVO</span>
      </div>

      {/* Menu de navegação */}
      <nav className="flex space-x-4">
        <Link to="/" className="hover:text-yellow-400">Mapas</Link>
        <Link to="/" className="hover:text-yellow-400">Locais</Link>
        <Link to="/" className="hover:text-yellow-400">Assianturas</Link>
        <Link to="/" className="hover:text-yellow-400">Descontos</Link>
      </nav>
    </header>
  );
}

