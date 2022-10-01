import React from "react";

const Searchbar = (props) => {
	const { setSearch } = props;

	return (
		<div className="searchbar">
			<input
				placeholder="Search Pokémon..."
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
		</div>
	);
};

export default Searchbar;
