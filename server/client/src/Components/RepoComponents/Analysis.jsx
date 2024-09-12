import React from "react";

const Analysis = () => {
  return (
    <div>
      <div className="p-2 overflow-y-auto max-h-full text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem eum
        repellendus tempore quod nam velit consequatur ullam fugit saepe est.
        Dolorem ex maiores inventore earum, quas porro! Obcaecati incidunt
        voluptatum minima quos dolorum numquam, odio, itaque sequi nisi vitae
        quas animi? Praesentium quaerat vel odio provident possimus, incidunt
        voluptate facilis.
      </div>
      <button className="absolute text-white border hover:scale-110 transition-all border-white bottom-4 right-5 px-5 py-1 rounded-2xl backdrop-blur-2xl cursor-pointer">
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default Analysis;
