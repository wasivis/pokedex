import React from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Logo } from "./LogoPng";

const { useContext } = React;

const defaultMessage = "You don't any favorite Pokemon yet!";

function capitalizeName(name) {
	return name.toString().replace(/\b(\w)/g, (s) => s.toUpperCase());
}

const Navbar = () => {
	const { favoritePokemon } = useContext(FavoriteContext);

	const tooltiptext =
		favoritePokemon.length === 0
			? defaultMessage
			: capitalizeName(favoritePokemon.join(" "));

	return (
		<nav>
			<div />
			<div className="logo">
				<Logo />
			</div>
			<div className="favorites">
				Favorites
				<div className="heart-tooltip">
					<span role="img" aria-label="xxxx">
						&#10084;&#65039;
					</span>
					<span className="tooltip-text">{tooltiptext}</span>
				</div>
				<div className="favorite-number">{favoritePokemon.length}</div>
			</div>
		</nav>
	);
};

export default Navbar;
