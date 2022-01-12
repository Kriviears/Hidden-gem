import React, { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
  mapStyle: "mapbox://styles/eruity/ckx571w430ll315mmqlgxoi0m",
};

export const MapContext = createContext(initialState);

function mapReducer(state, action) {
  switch (action.type) {
    case "BLUEPRINT_STYLE": {
      return {
        mapStyle: "mapbox://styles/eruity/cky6knhfc159m15pd4h3c5epu",
      };
    }
    case "LIGHT_STYLE": {
      return {
        mapStyle: "mapbox://styles/eruity/cky6mji292n8415qqzhc0hvi8",
      };
    }
    case "SUN_STYLE": {
      return {
        mapStyle: "mapbox://styles/eruity/ckybnhhx04j5y15olpe0sfbmw",
      };
    }
    case "DEFAULT_STYLE": {
      return {
        mapStyle: "mapbox://styles/eruity/ckx571w430ll315mmqlgxoi0m",
      };
    }
    default:
      return state;
  }
}

export const MapProvider = (props) => {
  const [state, dispatchMap] = useReducer(mapReducer, initialState);

  const setBlueprint = () => dispatchMap({ type: "BLUEPRINT_STYLE" });
  const setLight = () => dispatchMap({ type: "LIGHT_STYLE" });
  const setSun = () => dispatchMap({ type: "SUN_STYLE" });
  const setDefault = () => dispatchMap({ type: "DEFAULT_STYLE" });

  const value = useMemo(
    () => ({
      ...state,
      setBlueprint,
      setLight,
      setSun,
      setDefault,
    }),
    [state]
  );
  return <MapContext.Provider value={value} {...props} />;
};

const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined)
    throw new Error("useMap not used within MapProvider");
  return context;
};

export const ManagedMapContext = ({ children }) => (
  <MapProvider>{children}</MapProvider>
);

export default useMap;
