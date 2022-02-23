import React, { useRef, useState } from "react";
import useOnOutsideClick from "../hooks/useOnOutsideClick";
import LetterAvatar from "./LetterAvatar";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function Header() {
  const [selectedPage, setSelectedPage] = useState();
  const [selectedTitle, setSelectedTitle] = useState("Home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const homePageRef = useRef(null);
  const tvPageRef = useRef(null);
  const moviesPageRef = useRef(null);
  const myStuffPageRef = useRef(null);
  const hubsPageRef = useRef(null);
  const { ref, excludeRef } = useOnOutsideClick(() => toggleMobileMenu(false));
  const { ref: profileRef, excludeRef: profileTriggerRef } = useOnOutsideClick(
    () => setProfileOpen(false)
  );

  function updateSelectedPage(elem, title) {
    setSelectedPage(elem);
    setSelectedTitle(title);
  }
  function toggleMobileMenu(val) {
    setMobileMenuOpen(val);
  }

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center h-15 w-full bg-[#212329] border-b border-gray-700 md:px-10 2xl:px-20">
      <img
        className="h-5 m-5 cursor-pointer mx-7"
        src="https://upload.wikimedia.org/wikipedia/commons/0/03/Hulu_logo_%282014%29.svg"
        alt="hulu logo"
      ></img>
      <div className="flex hidden h-full text-white md:block">
        <span
          onClick={() => updateSelectedPage(homePageRef.current, "Home")}
          className={`py-3 mx-1 rounded-md px-3 hover:bg-[#525966] cursor-pointer font-bold text-sm${
            selectedPage === homePageRef.current || !selectedPage
              ? " bg-[#424752]"
              : ""
          }`}
        >
          Home
        </span>
        <span
          onClick={() => updateSelectedPage(tvPageRef.current, "TV")}
          className={`py-3 mx-1 rounded-md px-3 hover:bg-[#525966] cursor-pointer font-bold text-sm${
            selectedPage === tvPageRef.current ? " bg-[#424752]" : ""
          }`}
        >
          TV
        </span>
        <span
          onClick={() => updateSelectedPage(moviesPageRef.current, "Movies")}
          className={`py-3 mx-1 rounded-md px-3 hover:bg-[#525966] cursor-pointer font-bold text-sm${
            selectedPage === moviesPageRef.current ? " bg-[#424752]" : ""
          }`}
        >
          Movies
        </span>
        <span
          onClick={() => updateSelectedPage(myStuffPageRef.current, "My Stuff")}
          className={`py-3 mx-1 rounded-md px-3 hover:bg-[#525966] cursor-pointer font-bold text-sm${
            selectedPage === myStuffPageRef.current ? " bg-[#424752]" : ""
          }`}
        >
          My Stuff
        </span>
        <span
          onClick={() => updateSelectedPage(hubsPageRef.current, "Hubs")}
          className={`py-3 mx-1 rounded-md px-3 hover:bg-[#525966] cursor-pointer font-bold text-sm${
            selectedPage === hubsPageRef.current ? " bg-[#424752]" : ""
          }`}
        >
          Hubs
        </span>
      </div>
      <div
        ref={excludeRef}
        className="md:hidden z-50 relative flex items-center justify-center h-8 w-28 text-center text-white rounded-md cursor-pointer bg-[#4e5155]"
        onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
      >
        <span className="mr-1">{selectedTitle}</span>
        <MdKeyboardArrowDown
          className={`h-5 w-5  duration-150${
            isMobileMenuOpen ? " rotate-180" : ""
          }`}
        />
        <div
          ref={ref}
          className={`absolute top-[53px] left-1/2 -translate-x-1/2 flex flex-col w-[270px] m-auto bg-[#31353e] w-full rounded-md text-center text-white cursor-pointer${
            !isMobileMenuOpen ? " hidden" : ""
          }`}
        >
          <span
            className={`p-1 hover:bg-[#525966]${
              selectedPage === homePageRef.current || !selectedPage
                ? " bg-[#424752]"
                : ""
            }`}
            ref={homePageRef}
            onClick={() => updateSelectedPage(homePageRef.current, "Home")}
          >
            Home
          </span>
          <span
            className={`p-1 hover:bg-[#525966]${
              selectedPage === tvPageRef.current ? " bg-[#424752]" : ""
            }`}
            ref={tvPageRef}
            onClick={() => updateSelectedPage(tvPageRef.current, "TV")}
          >
            TV
          </span>
          <span
            className={`p-1 hover:bg-[#525966]${
              selectedPage === moviesPageRef.current ? " bg-[#424752]" : ""
            }`}
            ref={moviesPageRef}
            onClick={() => updateSelectedPage(moviesPageRef.current, "Movies")}
          >
            Movies
          </span>
          <span
            className={`p-1 hover:bg-[#525966]${
              selectedPage === myStuffPageRef.current ? " bg-[#424752]" : ""
            }`}
            ref={myStuffPageRef}
            onClick={() => updateSelectedPage(myStuffPageRef.current, "Stuff")}
          >
            My Stuff
          </span>
          <span
            className={`p-1 hover:bg-[#525966]${
              selectedPage === hubsPageRef.current ? " bg-[#424752]" : ""
            }`}
            ref={hubsPageRef}
            onClick={() => updateSelectedPage(hubsPageRef.current, "Hubs")}
          >
            Hubs
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end w-[116px] sm:w-[132px] md:w[144px] lg:w[152px]">
        <span className="font-light text-white">
          <FiSearch className="w-6 h-6 cursor-pointer" />
          <div
            ref={profileRef}
            onClick={() => setProfileOpen(!isProfileOpen)}
            className={`${
              isProfileOpen ? "absolute" : "hidden"
            }  z-50 top-16 mt-2 right-5 flex flex-col bg-[#121417] p-3 w-60 rounded-b-md`}
          >
            <div className="flex items-center cursor-pointer hover:font-normal">
              <LetterAvatar letter="D" bgColor="#292c33" />
              <span>Dwayne</span>
            </div>
            <hr className="h-[1px] border-none bg-gray-300 bg-opacity-10 mt-3 -mx-3"></hr>
            <div className="flex flex-col mx-4 my-5 cursor-pointer">
              <p className="hover:font-normal">Manage Profiles</p>
              <p className="hover:font-normal">Account</p>
              <p className="hover:font-normal">Help Center</p>
              <p className="hover:font-normal">Log Out</p>
            </div>
          </div>
        </span>
        <span
          ref={profileTriggerRef}
          onClick={() => setProfileOpen(!isProfileOpen)}
        >
          <LetterAvatar letter="D" />
        </span>
      </div>
    </div>
  );
}

export default Header;
