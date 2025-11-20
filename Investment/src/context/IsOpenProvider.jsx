import { createContext, useContext, useState } from "react";

const IsOpenContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

function IsOpenProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
}

export function useIsOpen() {
  return useContext(IsOpenContext);
}

export default IsOpenProvider;
