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
	8192: "bg-rose-400",
	16384: "bg-green-600",
	32768: "bg-blue-600",
	65536: "bg-red-600",
	131072: "bg-violet-600"
};

const getSize = size => {
	if (size < 5) {
		return "w-24 h-24 text-3xl m-2"
	} else if (size < 7) {
		return "w-20 h-20 text-2xl m-2"
	} else if (size < 9) {
		return "w-16 h-16 text-xl m-1"
	} else {
		return "w-12 h-12 text-base m-1"
	}
}

const Title = props => {
	return (
		<div className={`${getSize(props.size)} text-gray-200 flex rounded-xl
		justify-center items-center drop-shadow-md transition duration-100 hover:scale-105
		${titleColor[props.content]}`}>
			{props.content || ' '}
		</div>
	);
};

export default Title;