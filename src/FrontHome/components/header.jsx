import React from "react";
import Logo from "./logo";
import NavigationMenu from "./navigationMenu";
import AuthButtons from "./authButtons";

const Header = () => {
  return (
    <header className="flex overflow-hidden relative z-0 flex-wrap gap-6 items-start self-stretch w-full whitespace-nowrap border-b bg-stone-900 border-zinc-300 min-h-[78px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full">
      <Logo />
      <NavigationMenu />
      <AuthButtons />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b023f02fcc43ed7aa3546cdeacfd63b997f60b684baf31acacb0d9b2e5d83d5f?placeholderIfAbsent=true&apiKey=b070fc6abbbe49959790aa080d8f429b"
        alt="Menu icon"
        className="object-contain absolute z-0 shrink-0 w-10 h-9 aspect-[1.11] bottom-[15px] left-[9px]"
      />
    </header>
  );
};

export default Header;