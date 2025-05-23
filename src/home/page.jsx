import React, { useState } from "react";
import Header from "../home/components/header";
import LocationSidebar from "../home/components/locationSideBar";
import MapDisplay from "../home/components/mapDisplay";
import HeroSection from "../home/components/heroSection";
import SearchBar from "../home/components/searchBar";
import Footer from "../components/footer";

const Page = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
  };




  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full bg-neutral-100 px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center">
        <SearchBar />
      </div>
    </div>
      <div className="w-full bg-neutral-100 py-4 flex-grow mt-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[34%] max-md:w-full">
              <LocationSidebar onLocationSelect={handleLocationSelect} />
            </div>
            <div className="w-[66%] max-md:w-full">
              <MapDisplay selectedLocationId={selectedLocationId} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-neutral-100 py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <HeroSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;