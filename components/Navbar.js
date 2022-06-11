import React from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Logo } from "./LogoPng";

const { useContext } = React;

const Navbar = () => {
	const { favoritePokemons } = useContext(FavoriteContext);

	console.log(favoritePokemons);

	return (
		<nav>
			<div />
			<div className="logo">
				<Logo />
			</div>
			<div className="favorites">
				Favorites &#10084;&#65039; {favoritePokemons.length}
			</div>
		</nav>
	);
};

export default Navbar;
