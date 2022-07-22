import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";
import { LoadingGif } from "./LoadingGif";

const Pokedex = (props) => {
	const { pokemon, currentPage, setCurrentPage, totalPages, loading } = props;

	const nextPage = () => {
		if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
	};
	const previousPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div>
			<div className="header">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onLeftClick={previousPage}
					onRightClick={nextPage}
				/>
			</div>
			{loading ? (
				<LoadingGif />
			) : (
				<div className="pokedex-grid">
					{pokemon.map((pokemon, idx) => {
						return <Pokemon pokemon={pokemon} key={pokemon.name} />;
					})}
				</div>
			)}
		</div>
	);
};

export default Pokedex;
