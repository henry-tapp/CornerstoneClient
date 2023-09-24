import "./asyncImage.css";

import { AnimatePresence, motion } from "framer-motion";
import log from "loglevel";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

import errorImage from "./error.png";

export type ImageURI = string | undefined;

export interface AsyncImageProps {
  src?: ImageURI[];
  alt?: string;
  placeholder?: React.ReactNode; // The fallback shown while we load the image
  errorFallback?: React.ReactNode; // Optional to display if no images can load, if not passed will use built in fallback
  loading?: boolean; // Used to force a loading state if required
  className?: string; // Class name applied to the outer container
  imgClassName?: string; // Class name applied to the actual img element
  style?: React.CSSProperties;
}

/**
 * A helper wrapper so when we want to show an image we can
 * show a placeholder in its place while it's loading and then
 * swap it out when loaded.
 * Also supports alternative fallback images to use if the
 * prior option can't be loaded.
 *
 * All of this may not be the most performant, but does
 * actually work how I want for the time being.
 *
 * The loading state will show the placeholder OR fallback on a default skeleton
 * that takes up 100% of the parent, as such this component
 * may not look correct when in the loading state if the not wrapped
 * correctly (I.E. In the Storybook)
 *
 *  - TODO: Look into if we can utilise the React Suspense bits for this now ?
 */
export const AsyncImage = (props: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const numSrc = useMemo(() => props?.src?.length ?? 0, [props?.src?.length]);

  const nextIdx = useMemo(
    () =>
      currentIndex >= 0 && currentIndex + 1 < numSrc - 1
        ? currentIndex + 1
        : -1,
    [currentIndex, numSrc]
  );

  // The current src URI we should try to load
  const currentUri = useMemo(
    () => (currentIndex >= 0 ? props?.src?.[currentIndex] : undefined),
    [currentIndex, props.src]
  );

  useEffect(() => {
    if (currentUri) {
      log.debug(
        `%cAsyncImage:%c Loading image: ${currentUri}`,
        "color: hotpink; font-weight: 800;",
        "color: inherit; font-weight: inherit;"
      );
      const handleLoad = () => {
        log.debug(
          `%cAsyncImage:%c Loaded image successfully ${currentUri}`,
          "color: hotpink; font-weight: 800;",
          "color: green; font-weight: inherit;"
        );
        setLoadedSrc(currentUri ?? null);
      };
      const handleError = () => {
        log.debug(
          `%cAsyncImage:%c Unable to load image: '${currentUri}'`,
          "color: hotpink; font-weight: 800;",
          "color: orangered; font-weight: inherit;",
          nextIdx >= 0
            ? `Falling back on next: '${props?.src?.[nextIdx]}'`
            : "No further fallbacks available."
        );

        if (nextIdx >= 0) {
          setCurrentIndex(nextIdx);
        } else {
          setCurrentIndex(-1); // I.E. Error
        }
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.addEventListener("error", handleError);
      image.src = currentUri;
      return () => {
        image.removeEventListener("load", handleLoad);
        image.removeEventListener("error", handleError);
      };
    }
  }, [currentIndex, currentUri, nextIdx, numSrc, props?.src]);

  const isError = useMemo(() => currentIndex < 0, [currentIndex]);

  const isLoading = useMemo(
    () => props.loading || (!isError && loadedSrc === null),
    [isError, loadedSrc, props.loading]
  );

  return (
    <div
      style={props.style}
      className={`${props.className ?? ""} async-image-wrapper`}
    >
      <AnimatePresence>
        {/* Placeholder while Loading */}
        {isLoading && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${props.imgClassName ?? ""} async-image-placeholder`}
            data-testid="async-image-loading-wrapper"
          >
            {props.placeholder ?? (
              <Skeleton
                height="100%"
                containerTestId="async-image-default-loading"
              />
            )}
          </motion.div>
        )}

        {isError && props.errorFallback ? (
          props.errorFallback
        ) : (
          <motion.img
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={isError ? errorImage : loadedSrc ?? ""}
            alt={isError ? "Error" : props.alt ?? ""}
            className={[props.imgClassName ?? "", "async-image"].join(" ")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
