import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className="footer">
			<p>
				Made with{" "}
				<span role="img" aria-label="heart">
					❤️
				</span>{" "}
				by Wasivis © 2022
			</p>
			<a href="https://www.github.com/wasivis/" target="”_blank”">
				<FontAwesomeIcon icon={faGithub} beat className="githubIcon" />
			</a>
		</footer>
	);
};

export default Footer;
