import React, { useState } from "react";
import Header from "./components/header";
import LocationSidebar from "./components/locationSideBar";
import MapDisplay from "./components/mapDisplay";
import HeroSection from "./components/heroSection";
import SearchBar from "./components/searchBar";
import Footer from "./components/footer";

const Page = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
  };

  return (
    <main className="relative">
      <div className="flex overflow-hidden relative flex-col items-start w-full bg-neutral-100 min-h-[1740px] max-md:max-w-full">
        <Header />

        <div className="flex z-0 max-w-full min-h-10 w-[811px]" />
        <div className="flex z-0 max-w-full min-h-[100px] w-[100px]" />

        <section className="absolute z-0 max-w-full rounded-none h-[633px] right-[27px] top-[154px] w-[1318px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[34%] max-md:ml-0 max-md:w-full">
              <LocationSidebar onLocationSelect={handleLocationSelect} />
            </div>
            <div className="ml-5 w-[66%] max-md:ml-0 max-md:w-full">
              <MapDisplay selectedLocationId={selectedLocationId} />
            </div>
          </div>
        </section>

        <Footer />
        <HeroSection />

        <SearchBar />
      </div>
    </main>
  );
};

export default Page;