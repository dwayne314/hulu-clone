import React from "react";

function LetterAvatar({ letter, bgColor }) {
  const color = !bgColor ? "bg-white" : `bg-[${bgColor}]`;
  return (
    <div className="flex flex-row justify-center m-5">
      <div
        className={`w-8 h-8 flex justify-center items-center rounded-full text-xl uppercase cursor-pointer ${color}`}
      >
        {letter}
      </div>
    </div>
  );
}

export default LetterAvatar;
