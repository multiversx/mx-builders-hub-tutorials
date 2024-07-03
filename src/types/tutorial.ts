export interface ITutorialProps {
  title: string;

  tutorialMap: Array<ITutorialMap>;
  tutorialMapComponents: Array<() => JSX.Element>;
}

export interface ITutorialMap {
  title: string;
  description: string;
  unlocked: boolean;
}
