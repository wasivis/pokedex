import React from "react";
import flechaderecha from "../images/flechaderecha.png";
import flechaizquierda from "../images/flechaizquierda.png";

export const RightArrow = () => {
	return <img src={flechaderecha} width={60} height={60} alt="flechaderecha" />;
};

export const LeftArrow = () => {
	return (
		<img src={flechaizquierda} width={60} height={60} alt="flechaizquierda" />
	);
};
