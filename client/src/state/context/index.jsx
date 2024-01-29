/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from 'react';

import { root__modals } from '../../data';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [modals, setModals] = useState({ ...root__modals });
  const [activeLink, setActiveLink] = useState('');

  return (
    <Context.Provider
      value={{
        modals,
        setModals,
        activeLink,
        setActiveLink,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
