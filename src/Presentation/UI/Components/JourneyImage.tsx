import { useState } from "react";

const JourneyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const { VITE_DICODING_ASSETS_PRIMARY_URL, VITE_DICODING_ASSETS_FALLBACK_URL } = import.meta.env;
    const [imgSrc, setImgSrc] = useState(
        src.startsWith('http') ? src : `${VITE_DICODING_ASSETS_PRIMARY_URL}${src}`
    );
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && !src.startsWith('http')) {
            setImgSrc(`${VITE_DICODING_ASSETS_FALLBACK_URL}${src}`);
            setHasError(true);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
};

export default JourneyImage;