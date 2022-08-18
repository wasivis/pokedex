import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PokemonDetailModal = (props) => {
	const { closeModal, pokemon, showModal } = props;

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
			>
				<div className="modal-top">
					<h1 className="modal-pokemon-id">#{pokemon?.id}</h1>
					<h1>{pokemon?.name}</h1>
					<div className="modal-close-button">
						<FontAwesomeIcon
							icon={faXmark}
							className="closeIcon"
							onClick={closeModal}
						/>
					</div>
				</div>
				<div className="modal-img-container">
					<div className="modal-img">
						<img
							src={pokemon?.sprites.other.dream_world.front_default}
							alt="{pokemon?.name}"
						/>
					</div>
				</div>
				<div className="modal-bottom">
					<div className="modal-left-column">
						<h1>Base Stats</h1>
						<div>
							<span className="stat-name">{pokemon?.stats[0].stat.name}:</span>
							<span> {pokemon?.stats[0].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">{pokemon?.stats[1].stat.name}:</span>
							<span> {pokemon?.stats[1].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">{pokemon?.stats[2].stat.name}:</span>
							<span> {pokemon?.stats[2].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">
								{pokemon?.stats[3].stat.name.replace(/-/g, " ")}:
							</span>
							<span> {pokemon?.stats[3].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">
								{pokemon?.stats[4].stat.name.replace(/-/g, " ")}:
							</span>
							<span> {pokemon?.stats[4].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">{pokemon?.stats[5].stat.name}:</span>
							<span> {pokemon?.stats[5].base_stat}</span>
						</div>
						<div>
							<span className="stat-name">weight:</span>
							<span> {pokemon?.weight / 10}kg</span>
						</div>
						<div>
							<span className="stat-name">Height:</span>
							<span> {pokemon?.height / 10}m</span>
						</div>
					</div>
					<div className="modal-right-column">
						<h1>Abilities</h1>
						<div>{pokemon?.abilities[0]?.ability.name.replace(/-/g, " ")}</div>
						<div>{pokemon?.abilities[1]?.ability.name.replace(/-/g, " ")}</div>
						<div>{pokemon?.abilities[2]?.ability.name.replace(/-/g, " ")}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetailModal;
