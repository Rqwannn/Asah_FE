import { useState } from "react";

const JourneyImage = ({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) => {
	const {
		VITE_DICODING_ASSETS_PRIMARY_URL,
		VITE_DICODING_ASSETS_FALLBACK_URL,
	} = import.meta.env;

	// Robust sanitization
	let cleanSrc = String(src || "").trim();

	// Handle stringified arrays like '["url"]' or "['url']"
	if (cleanSrc.startsWith("[") && cleanSrc.endsWith("]")) {
		try {
			// Attempt to parse as JSON, replacing single quotes with double quotes for compatibility
			const parsed = JSON.parse(cleanSrc.replace(/'/g, '"'));
			if (Array.isArray(parsed) && parsed.length > 0) {
				cleanSrc = parsed[0];
			}
		} catch (e) {
			// Fallback: just strip brackets
			cleanSrc = cleanSrc.slice(1, -1);
		}
	}

	// Remove all surrounding quotes (single or double)
	cleanSrc = cleanSrc.replace(/^["']+|["']+$/g, "");

	// Fix malformed protocol (e.g., https:/example -> https://example)
	if (cleanSrc.match(/^https?:\/[^/]/)) {
		cleanSrc = cleanSrc.replace(/^(https?):\/([^/])/, "$1://$2");
	}

	const [imgSrc, setImgSrc] = useState(
		cleanSrc.startsWith("http")
			? cleanSrc
			: `${VITE_DICODING_ASSETS_PRIMARY_URL || ""}${cleanSrc}`
	);
	const [hasError, setHasError] = useState(false);

	const handleError = () => {
		if (!hasError && !src.startsWith("http")) {
			setImgSrc(`${VITE_DICODING_ASSETS_FALLBACK_URL}${src}`);
		}
	};

	return (
		<img src={imgSrc} alt={alt} className={className} onError={handleError} />
	);
};

export default JourneyImage;
