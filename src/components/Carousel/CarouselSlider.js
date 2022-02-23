import React from "react";

function CarouselSlider({ direction, onButtonClick, icon: Icon, xPosition }) {
  const arrowStyle = `absolute text-white text-2xl z-10 bg-[#121417] h-10 w-10 rounded-full opacity-75 flex items-center justify-center ${xPosition}`;

  return (
    <div className="flex items-center">
      <button type="button" onClick={onButtonClick} className={arrowStyle}>
        <span role="img" aria-label={`Arrow ${direction ? "left" : "right"}`}>
          {<Icon />}
        </span>
      </button>
    </div>
  );
}

export default CarouselSlider;
