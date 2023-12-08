import React from "react";
import { NavigationProvider } from "./src/context/NavigationProvider";
import { GatsbyBrowser } from 'gatsby';

/**
 * Wrap the gatsby app in a NavigationProvider so that any component
 * in the app can consume this context state.
 */
export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <NavigationProvider>{element}</NavigationProvider>
);