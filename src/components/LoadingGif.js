import React from "react";
import gengardance from "../images/gengardance.gif";

export const LoadingGif = () => {
	return (
		<div className="loadingGif">
			<img src={gengardance} width={250} height={250} alt="loadingGif" />
		</div>
	);
};
