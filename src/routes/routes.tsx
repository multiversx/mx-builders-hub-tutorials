import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Home } from "../pages";
import { Tutorial } from "../components";
import {
  relayedV3Map,
  relayedV3MapComponents,
  extensionProviderMap,
  extensionProviderMapComponents,
  iframeProviderMap,
  iframeProviderMapComponents,
} from "../turorials";

import {
  ArrowUpOnSquareStackIcon,
  CodeBracketSquareIcon,
  GiftIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/16/solid";
import {
  crossWindowProviderMap,
  crossWindowProviderMapComponents,
} from "../turorials/crossWindowProvider";

export const routeNames = {
  dashboard: {
    name: "/dashboard",
    children: {
      relayedV3: {
        name: `/dashboard/relayed-v3`,
        displayName: "Relayed transaction V3",
        menuIncon: <GiftIcon className="h-5 w-5" />,
      },

      extensionProvider: {
        name: `/dashboard/extension-provider`,
        displayName: "Extension provider",
        menuIncon: <PuzzlePieceIcon className="h-5 w-5" />,
      },

      iframeProvider: {
        name: `/dashboard/iframe-provider`,
        displayName: "Iframe provider",
        menuIncon: <CodeBracketSquareIcon className="h-5 w-5" />,
      },

      crossWindowProvider: {
        name: `/dashboard/cross-window-provider`,
        displayName: "Cross window provider",
        menuIncon: <ArrowUpOnSquareStackIcon className="h-5 w-5" />,
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

      {
        path: routeNames.dashboard.children.iframeProvider.name,
        element: (
          <Tutorial
            title={routeNames.dashboard.children.iframeProvider.displayName}
            tutorialMap={iframeProviderMap}
            tutorialMapComponents={iframeProviderMapComponents}
          />
        ),
      },

      {
        path: routeNames.dashboard.children.crossWindowProvider.name,
        element: (
          <Tutorial
            title={
              routeNames.dashboard.children.crossWindowProvider.displayName
            }
            tutorialMap={crossWindowProviderMap}
            tutorialMapComponents={crossWindowProviderMapComponents}
          />
        ),
      },
    ],
  },
]);
