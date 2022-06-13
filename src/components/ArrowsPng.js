import React from "react";
import rightarrow from "../images/rightarrow.png";
import leftarrow from "../images/leftarrow.png";

export const RightArrow = () => {
	return <img src={rightarrow} width={60} height={60} alt="flechaderecha" />;
};

export const LeftArrow = () => {
	return <img src={leftarrow} width={60} height={60} alt="flechaizquierda" />;
};
