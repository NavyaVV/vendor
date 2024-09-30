import { useState, useCallback, SetStateAction } from "react";
import { useAppDispatch } from "./redux";

type returnState = [(arg: object) => void, boolean, string | null];

export function useThunk(thunk: any): returnState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    (arg: object) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: SetStateAction<null>) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
