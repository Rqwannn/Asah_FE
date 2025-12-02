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

	// Sanitize src: remove surrounding quotes if present
	const cleanSrc = src ? String(src).replace(/^["']|["']$/g, "") : "";

	const [imgSrc, setImgSrc] = useState(
		cleanSrc.startsWith("http")
			? cleanSrc
			: `${VITE_DICODING_ASSETS_PRIMARY_URL}${cleanSrc}`
	);
	const [hasError, setHasError] = useState(false);

	const handleError = () => {
		if (!hasError && !src.startsWith("http")) {
			setImgSrc(`${VITE_DICODING_ASSETS_FALLBACK_URL}${src}`);
			setHasError(true);
		}
	};

	return (
		<img src={imgSrc} alt={alt} className={className} onError={handleError} />
	);
};

export default JourneyImage;
