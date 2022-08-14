import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemon, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/favoritesContext";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import PokemonDetailModal from "./components/PokemonDetailModal.js";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

export default function App() {
	const [pokemon, setPokemon] = useState([]);
	const [allPokemon, setAllPokemon] = useState([]);
	const [pokemonModalItem, setPokemonModalItem] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pokemonPerPage] = useState(24);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [searching, setSearching] = useState(false);
	const regions = [
		{ name: "All", startId: 1, endId: 898 },
		{ name: "Kanto (Gen. 1)", startId: 1, endId: 151 },
		{ name: "Johto (Gen. 2)", startId: 152, endId: 251 },
		{ name: "Hoenn (Gen. 3)", startId: 252, endId: 386 },
		{ name: "Sinnoh (Gen. 4)", startId: 387, endId: 493 },
		{ name: "Unova (Gen. 5)", startId: 494, endId: 649 },
		{ name: "Kalos (Gen. 6)", startId: 650, endId: 721 },
		{ name: "Alola (Gen. 7)", startId: 722, endId: 809 },
		{ name: "Galar (Gen. 8)", startId: 810, endId: 898 }
	];
	const types = [
		{ name: "All" },
		{ name: "Bug" },
		{ name: "Dark" },
		{ name: "Dragon" },
		{ name: "Electric" },
		{ name: "Fairy" },
		{ name: "Fighting" },
		{ name: "Fire" },
		{ name: "Flying" },
		{ name: "Ghost" },
		{ name: "Grass" },
		{ name: "Ground" },
		{ name: "Ice" },
		{ name: "Normal" },
		{ name: "Poison" },
		{ name: "Psychic" },
		{ name: "Rock" },
		{ name: "Steel" },
		{ name: "Water" }
	];
	const [selectedRegion, setSelectedRegion] = useState(0);
	const [selectedType, setSelectedType] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const fetchPokemon = async () => {
		try {
			setLoading(true);
			var data = null;
			var promises = null;
			data = await getPokemon();
			promises = data.results.map(async (pokemon) => {
				return await getPokemonData(pokemon.url);
			});
			const results = await Promise.all(promises);
			setAllPokemon(results);
			setPokemon(results);
			setLoading(false);
			setNotFound(false);
		} catch (err) {}
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	useEffect(() => {
		const filteredPokemon = allPokemon
			.filter((pokemon) => {
				return (
					pokemon.id >= regions[selectedRegion].startId &&
					pokemon.id <= regions[selectedRegion].endId
				);
			})
			.filter((pokemon) => {
				if (selectedType < 1) {
					return allPokemon;
				}
				return pokemon.types
					.map((type) => type.type.name)
					.includes(types[selectedType].name.toLowerCase());
			});
		setPokemon(filteredPokemon);
	}, [selectedRegion, selectedType]);

	const loadFavoritePokemon = () => {
		const pokemon =
			JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
		setFavorites(pokemon);
	};

	useEffect(() => {
		loadFavoritePokemon();
	}, []);

	const updateFavoritePokemon = (name) => {
		const updated = [...favorites];
		const isFavorite = updated.indexOf(name);
		if (isFavorite >= 0) {
			updated.splice(isFavorite, 1);
		} else {
			updated.push(name);
		}
		setFavorites(updated);
		window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
	};

	const onSearch = async (pokemon) => {
		if (!pokemon) {
			return setPokemon(allPokemon);
		}
		setLoading(true);
		setNotFound(false);
		setSearching(true);
		const result = await searchPokemon(pokemon);
		if (!result) {
			setNotFound(true);
			setLoading(false);
		} else {
			setPokemon([result]);
			setCurrentPage(1);
			setTotalPages(1);
		}
		setLoading(false);
		setSearching(false);
	};

	const handleTypeSelection = (e) => {
		setSelectedType(e.target.value);
	};

	const handleRegionSelection = (e) => {
		setSelectedRegion(e.target.value);
	};

	const filterPageTotal = filterPageTotalByRegion(pokemon);

	function filterPageTotalByRegion() {
		return Math.ceil(pokemon.length / 24);
	}

	const indexOfLastRecord = currentPage * pokemonPerPage;
	const indexOfFirstRecord = indexOfLastRecord - pokemonPerPage;
	const currentPokemon = pokemon.slice(indexOfFirstRecord, indexOfLastRecord);

	const onClickPokemonCard = (pokemon) => {
		setPokemonModalItem(pokemon);
		setShowModal(true);
	};

	return (
		<FavoriteProvider
			value={{
				favoritePokemon: favorites,
				updateFavoritePokemon: updateFavoritePokemon
			}}
		>
			<PokemonDetailModal
				showModal={showModal}
				closeModal={() => {
					setShowModal(false);
				}}
				pokemon={pokemonModalItem}
			/>
			<div>
				<Navbar />
				<div className="App">
					<Searchbar onSearch={onSearch} />
					<Filters
						setFilterType={handleTypeSelection}
						setFilterRegion={handleRegionSelection}
						types={types}
						regions={regions}
					/>
					{notFound ? (
						<div className="not-found-text">That Pokemon doesn't exist!</div>
					) : (
						<Pokedex
							loading={loading}
							pokemon={currentPokemon}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={filterPageTotal}
							setShowModal={setShowModal}
							onClickPokemonCard={onClickPokemonCard}
						/>
					)}
				</div>
				<Footer />
			</div>
		</FavoriteProvider>
	);
}
