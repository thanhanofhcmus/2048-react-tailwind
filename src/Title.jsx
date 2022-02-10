import React from "react";

const titleColor = {
  2: "bg-yellow-400",
  4: "bg-orange-400",
  8: "bg-red-400",
  16: "bg-blue-400",
  32: "bg-green-400",
  64: "bg-lime-400",
  128: "bg-emerald-400",
  256: "bg-teal-400",
  512: "bg-indigo-400",
  1024: "bg-violet-400",
  2048: "bg-purple-400",
  4096: "bg-fuchsia-400",
  8172: "bg-rose-400"
};

const Title = props => {
  return (
    <div className={`m-2 w-24 h-24 text-4xl flex rounded-xl
    justify-center items-center drop-shadow-md
    ${titleColor[props.content]}`}>
      {props.content || ' '}
    </div>
  );
};

export default Title;