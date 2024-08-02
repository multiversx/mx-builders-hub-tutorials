import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Home } from "../pages";
import { Tutorial } from "../components";
import { SideBarLayout } from "../components/SideBarLayout";
import { relayedV3Map, relayedV3MapComponents } from "../turorials";
import {
  extensionProviderMap,
  extensionProviderMapComponents,
} from "../turorials/extensionProvider";
import { GiftIcon, PuzzlePieceIcon } from "@heroicons/react/16/solid";

export const routeNames = {
  dashboard: {
    name: "/dashboard",
    children: {
      relayedV3: {
        name: `/dashboard/relayedV3`,
        displayName: "Relayed transaction V3",
        menuIncon: <GiftIcon className="h-5 w-5" />,
      },

      extensionProvider: {
        name: `/dashboard/extensionProvider`,
        displayName: "Extension provider",
        menuIncon: <PuzzlePieceIcon className="h-5 w-5" />,
      },
    },
  },
  home: {
    name: "/",
  },
};

export const router = createBrowserRouter([
  {
    path: routeNames.home.name,
    element: <Home />,
  },

  {
    path: routeNames.dashboard.name,
    element: <Dashboard />,
    children: [
      {
        path: routeNames.dashboard.children.relayedV3.name,
        element: (
          <Tutorial
            title={routeNames.dashboard.children.relayedV3.displayName}
            tutorialMap={relayedV3Map}
            tutorialMapComponents={relayedV3MapComponents}
          />
        ),
      },

      {
        path: routeNames.dashboard.children.extensionProvider.name,
        element: (
          <Tutorial
            title={routeNames.dashboard.children.extensionProvider.displayName}
            tutorialMap={extensionProviderMap}
            tutorialMapComponents={extensionProviderMapComponents}
          />
        ),
      },
    ],
  },
]);
