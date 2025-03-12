import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex absolute z-0 gap-3 items-center text-base leading-none bottom-[21px] right-[57px] w-[178px]">
      <button className="overflow-hidden flex-1 shrink gap-2 self-stretch p-2 my-auto bg-amber-500 rounded-lg border border-solid basis-0 border-neutral-500 text-stone-900 hover:bg-amber-600 transition-colors">
        Logar
      </button>
      <button className="overflow-hidden gap-2 self-stretch p-2 my-auto rounded-lg border border-solid bg-zinc-800 border-zinc-800 text-neutral-100 w-[91px] hover:bg-zinc-700 transition-colors">
        Cadastrar
      </button>
    </div>
  );
};

export default AuthButtons;
