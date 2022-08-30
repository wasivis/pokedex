import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PokemonDetailModal = (props) => {
	const { closeModal, pokemon, showModal } = props;
	const [pokemonDetails, setPokemonDetails] = useState();
	const [about, setAbout] = useState();

	useEffect(() => {
		if (pokemon) {
			const fetchPokemonDetails = async () => {
				try {
					const species = await fetch(pokemon.species.url).then((r) =>
						r.json()
					);
					setPokemonDetails(species);
					const englishEntry = species.flavor_text_entries.filter(
						(entry) => entry.language.name === "en"
					);
					if (englishEntry.length > 0) {
						setAbout(englishEntry[0].flavor_text);
					} else {
						return "There's no english description for this Pokémon!";
					}
				} catch (err) {}
			};
			fetchPokemonDetails();
		}
	}, [showModal, pokemon]);

	useEffect(() => {
		const keyDownHandler = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeModal();
			}
		};
		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [showModal]);

	const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

	return (
		<div
			className={showModal ? "modal-backdrop open" : "modal-backdrop closed"}
			onClick={closeModal}
		>
			<div
				className={showModal ? "modal open" : "modal closed"}
				onClick={(e) => {
					e.stopPropagation();
				}}
				onKeyPress={(e) => {
					e.closeEsc();
				}}
			>
				<div className="modal-top">
					<h1 className="modal-pokemon-id">#{pokemon?.id}</h1>
					<h1>
						{pokemon?.name} ({pokemonDetails?.names[0].name})
					</h1>
					<div className="modal-close-button">
						<FontAwesomeIcon
							icon={faXmark}
							className="closeIcon"
							onClick={closeModal}
						/>
					</div>
				</div>
				<div className="modal-bottom">
					<div className="modal-left-column">
						<div
							className={`modal-pokemon-genus ${pokemon?.types[0].type.name}`}
						>
							{pokemonDetails?.genera[7].genus}
						</div>
						<div className="modal-img" key="idx">
							<img src={imageURL} alt="{pokemon?.name}" />
						</div>
						<div className="modal-type-icons">
							{pokemon?.types.map((type) => {
								return (
									<img
										src={`/${type.type.name}_icon.png`}
										alt={type.type.name}
										title={type.type.name}
									/>
								);
							})}
						</div>
						<div className="weight-and-height">
							<div className="pokemon-weight">
								<span>Weight: </span>
								<span>{pokemon?.weight / 10}kg</span>
							</div>
							<div className="pokemon-height">
								<span>Height: </span>
								<span>{pokemon?.height / 10}m</span>
							</div>
						</div>
					</div>
					<div className="modal-right-column">
						<div>
							<h1>Base Stats</h1>
							<div className="modal-stats container">
								<div>
									<span id="stat-name">{pokemon?.stats[0].stat.name}:</span>
									<span> {pokemon?.stats[0].base_stat}</span>
								</div>
								<div>
									<span id="stat-name">{pokemon?.stats[1].stat.name}:</span>
									<span> {pokemon?.stats[1].base_stat}</span>
								</div>

								<div>
									<span id="stat-name">{pokemon?.stats[2].stat.name}:</span>
									<span> {pokemon?.stats[2].base_stat}</span>
								</div>
								<div>
									<span id="stat-name">
										{pokemon?.stats[3].stat.name.replace(/-/g, " ")}:
									</span>
									<span> {pokemon?.stats[3].base_stat}</span>
								</div>

								<div>
									<span id="stat-name">
										{pokemon?.stats[4].stat.name.replace(/-/g, " ")}:
									</span>
									<span> {pokemon?.stats[4].base_stat}</span>
								</div>
								<div>
									<span id="stat-name">{pokemon?.stats[5].stat.name}:</span>
									<span> {pokemon?.stats[5].base_stat}</span>
								</div>
							</div>
						</div>
						<div>
							<h1>Abilities</h1>
							<div className="modal-abilities container">
								{pokemon?.abilities.map((ability) => {
									return (
										<ul>
											<li key={ability}>
												{ability.ability.name.replace(/-/g, " ")}
											</li>
										</ul>
									);
								})}
							</div>
						</div>
						<div>
							<h1>About</h1>
							<div className="modal-flavor-text container">
								<div>{about}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetailModal;
