import { useEffect, useState, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  }, []);

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(
    () => setMatches(getMatches(query)),
    [getMatches, query]
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [handleChange, query]);

  return matches;
}
