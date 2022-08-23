import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";

const Pokemon = (props) => {
	const { pokemon, onClickPokemonCard } = props;
	const { favoritePokemon, updateFavoritePokemon } = useContext(
		FavoriteContext
	);
	const redHeart = "❤️";
	const whiteHeart = "🤍";
	const heart = favoritePokemon.includes(pokemon.name) ? redHeart : whiteHeart;

	const clickHeart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		updateFavoritePokemon(pokemon.name);
	};

	return (
		<div
			className="pokemon-card"
			onClick={() => {
				onClickPokemonCard(pokemon);
			}}
		>
			<div className="pokemon-img-container">
				<img
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					className="pokemon-card-img"
				/>
			</div>
			<div className="card-body">
				<div className="card-top">
					<h3 className="pokemon-card-name">{pokemon.name}</h3>
					<div className="pokemon-card-id">#{pokemon.id}</div>
				</div>
				<div className="card-bottom">
					<div className="pokemon-type">
						{pokemon.types.map((type, idx) => {
							return (
								<div key={idx} id="type-box">
									<img
										src={`/${type.type.name}_icon.png`}
										alt={type.type.name}
									/>
								</div>
							);
						})}
					</div>
					<button onClick={clickHeart} className="favorite-btn">
						<div className="favorite-heart">{heart}</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Pokemon;
