import React, { useContext, PropsWithChildren } from 'react';

/**
 * Globally shared navigation state for keeping track 
 * of the state of the sidebar so that it renders 
 * correctly on page changes.
 */
export interface NavigationState {
  sidebarExpandedSections: string[]
}

export enum NavigationActionType {
  SET_SIDEBAR_EXPANDED_SECTIONS = 'SET_SIDEBAR_EXPANDED_SECTIONS',
  EXPAND_SIDEBAR_SECTION = 'EXPAND_SIDEBAR_SECTION',
  COLLAPSE_SIDEBAR_SECTION = 'COLLAPSE_SIDEBAR_SECTION',
}

export interface NavigationAction {
  type: NavigationActionType;
  payload?: any;
}

const NavigationContext = React.createContext<{state: NavigationState; dispatch: React.Dispatch<NavigationAction>} | undefined>(undefined);

const initialState: NavigationState = {
  sidebarExpandedSections: [],
}

const navigationReducer = (state: NavigationState, action: NavigationAction): NavigationState => {
  switch (action.type) {
    case NavigationActionType.SET_SIDEBAR_EXPANDED_SECTIONS: {
      return {
        ...state,
        sidebarExpandedSections: action.payload
      }
    }
    case NavigationActionType.EXPAND_SIDEBAR_SECTION: {
      const newValue = state.sidebarExpandedSections;
      const sectionIndex = state.sidebarExpandedSections.indexOf(action.payload);
      if (sectionIndex === -1) {
        newValue.push(action.payload);
      }
      return {
        ...state,
        sidebarExpandedSections: newValue
      }
    }
    case NavigationActionType.COLLAPSE_SIDEBAR_SECTION: {
      const newValue = state.sidebarExpandedSections;
      const sectionIndex = state.sidebarExpandedSections.indexOf(action.payload);
      if (sectionIndex > -1) {
        newValue.splice(sectionIndex, 1);
      }
      return {
        ...state,
        sidebarExpandedSections: newValue
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/**
 * Provider for providing the navigation state to its child components.
 * This gets wrapped around the whole app via gatsby-browser.tsx.
 */
export const NavigationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(navigationReducer, initialState);
  const value = { state, dispatch };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

/**
 * Shortcut hook for consuming the navigation context from a component
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within an NavigationProvider')
  }
  return context
}