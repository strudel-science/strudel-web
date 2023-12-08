import './src/styles/global.css';
import React from "react";
import { NavigationProvider } from "./src/context/NavigationProvider";

/**
 * Wrap the gatsby app in a NavigationProvider so that any component
 * in the app can consume this context state.
 */
export const wrapRootElement = ({ element }) => (
  <NavigationProvider>{element}</NavigationProvider>
)