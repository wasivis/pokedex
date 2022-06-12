import React from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Logo } from "./LogoPng";

const { useContext } = React;

const Navbar = () => {
	const { favoritePokemons } = useContext(FavoriteContext);

	console.log(favoritePokemons);

	const defaultMessage = "Todavía no tienes Pokemons favoritos";
	const tooltiptext =
		favoritePokemons === null ? defaultMessage : favoritePokemons;

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
				<div className="favorite-number">{favoritePokemons.length}</div>
			</div>
		</nav>
	);
};

export default Navbar;
