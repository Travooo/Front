import { Link } from "react-router-dom"
import { Search, Heart, User } from "lucide-react"
import React from "react"

const headerButtons = () => {
  return (
    <div className="flex items-center space-x-4">

      {/* BOTÃO DE PESQUISA COMENTADO
      <button className="hover:text-amber-500 transition-colors text-white">
        <Search className="h-6 w-6" />
      </button>
      */}
      
      <Link to="/editar-perfil" className="hover:text-am     ber-500 transition-colors text-white">
        <User className="h-6 w-6" />
      </Link>
    </div>
  )
}

export default headerButtons;

