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
    case "OPEN_GEM_FORM": {
      return { ...initialState, displayGemForm: true };
    }
    case "CLOSE_GEM_FORM": {
      return { ...initialState };
    }
    case "OPEN_FILTER": {
      return { ...initialState, displayFilter: true };
    }
    case "CLOSE_FILTER": {
      return { ...initialState };
    }
    case "OPEN_PROFILE": {
      return { ...initialState, displayProfile: true };
    }
    case "CLOSE_PROFILE": {
      return { ...initialState };
    }
    case "OPEN_GEMS": {
      return { ...initialState, displayGems: true };
    }
    case "CLOSE_GEMS": {
      return { ...initialState };
    }
    case "OPEN_STYLE": {
      return { ...initialState, displayMapStyle: true };
    }
    case "CLOSE_STYLE": {
      return { ...initialState };
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

  const openForm = () => dispatchModal({ type: "OPEN_GEM_FORM" });
  const closeForm = () => dispatchModal({ type: "CLOSE_GEM_FORM" });
  const toggleForm = () => (state.displayGemForm ? closeForm() : openForm());
  const openFilter = () => dispatchModal({ type: "OPEN_FILTER" });
  const closeFilter = () => dispatchModal({ type: "CLOSE_FILTER" });
  const toggleFilter = () =>
    state.displayFilter ? closeFilter() : openFilter();
  const openProfile = () => dispatchModal({ type: "OPEN_PROFILE" });
  const closeProfile = () => dispatchModal({ type: "CLOSE_PROFILE" });
  const toggleProfile = () =>
    state.displayProfile ? closeProfile() : openProfile();
  const openGems = () => dispatchModal({ type: "OPEN_GEMS" });
  const closeGems = () => dispatchModal({ type: "CLOSE_GEMS" });
  const toggleGems = () => (state.displayGems ? closeGems() : openGems());
  const openStyle = () => dispatchModal({ type: "OPEN_STYLE" });
  const closeStyle = () => dispatchModal({ type: "CLOSE_STYLE" });
  const toggleStyle = () =>
    state.displayMapStyle ? closeStyle() : openStyle();
  const openSettings = () => dispatchModal({ type: "OPEN_SETTINGS" });

  const value = useMemo(
    () => ({
      ...state,
      openForm,
      closeForm,
      toggleForm,
      openFilter,
      closeFilter,
      toggleFilter,
      openProfile,
      closeProfile,
      toggleProfile,
      openGems,
      closeGems,
      toggleGems,
      openStyle,
      closeStyle,
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
