import React from "react";

const Filters = (props) => {
	const { setFilterType, setFilterRegion, regions, types } = props;

	const setType = (e) => {
		setFilterType(e);
	};

	const setRegion = (e) => {
		setFilterRegion(e);
	};

	return (
		<div className="filter-container">
			<div className="type-filter-container">
				<p>Filter by Type</p>
				<select
					className="selectType-box"
					aria-label="Filter Pokemon By Type"
					name="type-list"
					onChange={setType}
				>
					{types.map((type, idx) => {
						return <option value={idx}>{type.name}</option>;
					})}
				</select>
			</div>
			<div className="region-filter-container">
				<p>Filter by Region</p>
				<select
					className="selectRegion-box"
					aria-label="Filter Pokemon By Region"
					name="region-list"
					onChange={setRegion}
				>
					{regions.map((region, idx) => {
						return <option value={idx}>{region.name}</option>;
					})}
				</select>
			</div>
		</div>
	);
};

export default Filters;
