import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Shield, Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="relative bg-stone-900 text-white py-4 px-6 z-10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo e descrição */}
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex items-center">
              <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">Travo</h3>
            </div>
            <p className="text-gray-400 text-sm text-center lg:text-left max-w-md">
              Descubra os melhores lugares e eventos com apenas um clique
            </p>
          </div>

          {/* Informações de contato em linha */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span className="text-gray-400">Fortaleza, CE</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500" />
              <span className="text-gray-400">+55 (85) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500" />
              <span className="text-gray-400">contato@travo.com</span>
            </div>
          </div>

          {/* Redes sociais */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Travo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
