const UserProfile = ({ name, image }) => {
    const getCurrentGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return "Bom dia"
      if (hour < 18) return "Boa tarde"
      return "Boa noite"
    }
  
    const getCurrentDate = () => {
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
      return new Date().toLocaleDateString("pt-BR", options)
    }
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border-l-4 border-yellow-400">
        <div className="flex items-center">
          {/* Foto do usuário com design minimalista */}
          <div className="relative">
            <img
              src={image || "/placeholder.svg?height=72&width=72"}
              alt={`Foto de ${name}`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
  
          {/* Informações do usuário com tipografia leve */}
          <div className="ml-5">
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-gray-800">{name}</h2>
              <span className="ml-3 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">Admin</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">{getCurrentGreeting()}, seja bem-vindo(a)</p>
          </div>
  
          {/* Data atual à direita */}
          <div className="ml-auto hidden sm:block text-right">
            <p className="text-gray-400 text-sm">{getCurrentDate()}</p>
            <div className="flex items-center justify-end mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default UserProfile
  