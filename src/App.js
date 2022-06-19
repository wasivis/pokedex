import React from "react";
import "./styles.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import {
	getPokemonData,
	getPokemon,
	searchPokemon,
	searchPokemonByType
} from "./api";
import { FavoriteProvider } from "./contexts/favoritesContext";
import Footer from "./components/Footer";
import Filter from "./components/Filters";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

export default function App() {
	const [pokemon, setPokemon] = useState([]);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [favorites, setFavorites] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [searching, setSearching] = useState(false);
	const [selectedType, setSelectedType] = useState("all");

	const fetchPokemon = async () => {
		try {
			setLoading(true);
			var data = null;
			var promises = null;
			var selectType = selectedType.toLowerCase();
			if (selectType === "all") {
				data = await getPokemon(24, 24 * page);
				promises = data.results.map(async (pokemon) => {
					return await getPokemonData(pokemon.url);
				});
				const results = await Promise.all(promises);
				setPokemon(results);
				setLoading(false);
				setTotal(Math.ceil(data.count / 25));
				setNotFound(false);
			} else {
				const { length, data } = await searchPokemonByType(
					selectType,
					24,
					24 * page
				);
				promises = data.map(async (pokemon) => {
					return await getPokemonData(pokemon.pokemon.url);
				});
				const results = await Promise.all(promises);
				setPokemon(results);
				setLoading(false);
				setTotal(Math.ceil(length / 25));
				setNotFound(false);
			}
		} catch (err) {}
	};

	const loadFavoritePokemon = () => {
		const pokemon =
			JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
		setFavorites(pokemon);
	};

	useEffect(() => {
		loadFavoritePokemon();
	}, []);

	useEffect(() => {
		fetchPokemon();
	}, [page, selectedType]);

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
			return fetchPokemon();
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
			setPage(0);
			setTotal(1);
		}
		setLoading(false);
		setSearching(false);
	};

	const handleTypeSelection = (e) => {
		setSelectedType(e.target.value);
	};

	return (
		<FavoriteProvider
			value={{
				favoritePokemon: favorites,
				updateFavoritePokemon: updateFavoritePokemon
			}}
		>
			<div>
				<Navbar />
				<div className="App">
					<Searchbar onSearch={onSearch} />
					<Filter setFilterType={handleTypeSelection} />
					{notFound ? (
						<div className="not-found-text">That Pokemon doesn't exist!</div>
					) : (
						<Pokedex
							loading={loading}
							pokemon={pokemon}
							page={page}
							setPage={setPage}
							total={total}
						/>
					)}
				</div>
				<Footer />
			</div>
		</FavoriteProvider>
	);
}
