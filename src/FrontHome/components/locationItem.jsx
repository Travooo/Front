import React from "react";

const LocationItem = ({ name, address, icon, highlighted }) => {
  const bgColor = highlighted ? "bg-amber-200" : "bg-white";

  return (
    <article
      className={`flex overflow-hidden gap-3 items-start px-4 py-4 mt-4 w-full ${bgColor} rounded-lg shadow-[0px_3px_4px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-amber-100 ${highlighted ? "" : "first:mt-4"}`}
    >
      <div className="flex items-center justify-center bg-amber-500 rounded-full p-1.5 w-8 h-8">
        <img
          src={icon || "/placeholder.svg"}
          alt={`${name} icon`}
          className="object-contain w-5 h-5"
        />
      </div>
      <div className="flex-1 shrink basis-0 min-w-60">
        <h3 className="flex-1 shrink self-stretch w-full text-base font-medium basis-0 text-stone-900">
          {name}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">{address}</p>
      </div>
    </article>
  );
};

export default LocationItem;