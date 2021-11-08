import { useState } from "react";

export function useLocalStorage(user, initialValue) {
  const [storedValue, setStoredValue] = useState(
    (user = { log: false, user: null })
  );

  return (setValue = (user) => {
    setStoredValue(user);
  });
}
