import React from "react";
import { LeftArrow, RightArrow } from "./ArrowsPng";

const Pagination = (props) => {
	const { onLeftClick, onRightClick, page, totalPages } = props;

	return (
		<div className="pagination">
			<button className="pagination-btn" onClick={onLeftClick}>
				<div className="icon">
					<LeftArrow />
				</div>
			</button>
			<div>
				{page} of {totalPages}
			</div>
			<button className="pagination-btn" onClick={onRightClick}>
				<div className="icon">
					<RightArrow />
				</div>
			</button>
		</div>
	);
};

export default Pagination;
