import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    // SAVE: prev. title
    const prevTitle = document.title;

    // SET: new title
    document.title = `pluviaster | ${title}`;

    // CLEANUP
    return () => {
      // document.title = prevTitle; (NOT NECESSARY)
    };
  }, [title]);
};
