"use client"
import { useNavigate } from "react-router-dom"

const Logo = () => {

  //comentei o seguinte código pq tava deslogando o usuário quando clickava na logo
  /*
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/home")
  }
  */ 
  return (
    <div
      //onClick={handleLogoClick}
      className="flex absolute z-10 items-center top-[15px] left-[60px] text-4xl font-bold tracking-tighter text-orange-200 h-[50px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <h1 className="mr-1">
        <span style={{ color: "rgba(255,149,0,1)" }}>Travo</span>
      </h1>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3384ccaec54416d03fd82221f3296e9c4e582fcc3a71099e5dd062cf3f196f2?placeholderIfAbsent=true&apiKey=b070fc6abbbe49959790aa080d8f429b"
        alt="Travo logo icon"
        className="object-contain w-[35px] h-[35px]"
      />
    </div>
  )
}

export default Logo
