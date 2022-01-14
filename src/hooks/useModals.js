import React, { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
  displayGemForm: false,
  displayFilter: false,
  displayProfile: false,
  displayGems: false,
  displayMapStyle: false,
  displaySettings: false,
};

export const ModalContext = createContext(initialState);

function modalReducer(state, action) {
  switch (action.type) {
    case "CLOSE_MODAL": {
      return { ...initialState };
    }
    case "OPEN_GEM_FORM": {
      return { ...initialState, displayGemForm: true };
    }
    case "OPEN_FILTER": {
      return { ...initialState, displayFilter: true };
    }
    case "OPEN_PROFILE": {
      return { ...initialState, displayProfile: true };
    }
    case "OPEN_GEMS": {
      return { ...initialState, displayGems: true };
    }
    case "OPEN_STYLE": {
      return { ...initialState, displayMapStyle: true };
    }
    case "OPEN_SETTINGS": {
      return { ...initialState, displaySettings: true };
    }
    default:
      return state;
  }
}

export const ModalProvider = (props) => {
  const [state, dispatchModal] = useReducer(modalReducer, initialState);

  const closeModal = () => dispatchModal({ type: "CLOSE_MODAL" });
  const openForm = () => dispatchModal({ type: "OPEN_GEM_FORM" });
  const toggleForm = () => (state.displayGemForm ? closeModal() : openForm());
  const openFilter = () => dispatchModal({ type: "OPEN_FILTER" });
  const toggleFilter = () =>
    state.displayFilter ? closeModal() : openFilter();
  const openProfile = () => dispatchModal({ type: "OPEN_PROFILE" });
  const toggleProfile = () =>
    state.displayProfile ? closeModal() : openProfile();
  const openGems = () => dispatchModal({ type: "OPEN_GEMS" });
  const toggleGems = () => (state.displayGems ? closeModal() : openGems());
  const openStyle = () => dispatchModal({ type: "OPEN_STYLE" });
  const toggleStyle = () =>
    state.displayMapStyle ? closeModal() : openStyle();
  const openSettings = () => dispatchModal({ type: "OPEN_SETTINGS" });

  const value = useMemo(
    () => ({
      ...state,
      closeModal,
      openForm,
      toggleForm,
      openFilter,
      toggleFilter,
      openProfile,
      toggleProfile,
      openGems,
      toggleGems,
      openStyle,
      toggleStyle,
      openSettings,
    }),
    [state]
  );
  return <ModalContext.Provider value={value} {...props} />;
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("useModal not used within ModalProvider");
  return context;
};

export const ManagedModalContext = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

export default useModal;
