import { useLocation } from "react-router-dom";
import { useMemo } from "react";

function useRouterQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export { useRouterQuery };
