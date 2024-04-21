import { useLocalStorage } from "@uidotdev/usehooks";

export function useAuth(): {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<{ value: string } | undefined>>;
} {
  const [token, setToken] = useLocalStorage<{ value: string } | undefined>(
    "token"
  );
  return {
    token: token?.value,
    setToken,
  };
}
