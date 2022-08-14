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
				<div className="modal-close-button">
					<FontAwesomeIcon
						icon={faXmark}
						className="closeIcon"
						onClick={closeModal}
					/>
				</div>
				<div className="modal-container">
					<div className="modal-content-main">
						<div className="modal-main-top">
							<h1 className="pokemon-id-modal">#{pokemon?.id}</h1>
							<h1 className="pokemon-name-modal">{pokemon?.name}</h1>
						</div>
						<div className="pokemon-img-modal">
							<img
								src={pokemon?.sprites.other.dream_world.front_default}
								alt={pokemon?.name}
							/>
						</div>
					</div>
					<div className="modal-content-details">
						<div className="base-stats">
							<h1>Base Stats</h1>
							<div>
								{pokemon?.stats[0].stat.name}: {pokemon?.stats[0].base_stat}
							</div>
							<div>
								{pokemon?.stats[1].stat.name}: {pokemon?.stats[1].base_stat}
							</div>
							<div>
								{pokemon?.stats[2].stat.name}: {pokemon?.stats[2].base_stat}
							</div>
							<div>
								{pokemon?.stats[3].stat.name}: {pokemon?.stats[3].base_stat}
							</div>
							<div>
								{pokemon?.stats[4].stat.name}: {pokemon?.stats[4].base_stat}
							</div>
							<div>
								{pokemon?.stats[5].stat.name}: {pokemon?.stats[5].base_stat}
							</div>
							<div>weight: {pokemon?.weight}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetailModal;
