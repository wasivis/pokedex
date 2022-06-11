import React from "react";
import FavoriteContext from "../contexts/favoritesContext";

const { useContext } = React;

const Navbar = () => {
	const { favoritePokemons } = useContext(FavoriteContext);

	console.log(favoritePokemons);

	let imgUrl = "https://fontmeme.com/images/Pokemon-Logo.jpg";

	return (
		<nav>
			<div />
			<div>
				<img src={imgUrl} alt="pokemon-logo" className="navbar-image" />
			</div>
			<div className="favorites">
				Favorites &#10084;&#65039; {favoritePokemons.length}
			</div>
		</nav>
	);
};

export default Navbar;
