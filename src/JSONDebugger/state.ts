import { simpleUpdater, Unit, Updater, View } from "ballerina-core";
import { OrderedMap } from "immutable";

export type JSONDebugger = {
  open: boolean;
  history: OrderedMap<string, any>;
  current1: number;
  current2: number;
  darkMode: boolean;
  fontSize: number;
  indent: number;
  paused1: boolean;
  paused2: boolean;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  isMoving: boolean;
  isResizing: boolean;
  showDiff: boolean;
  scrollLock: boolean;
};

export const JSONDebugger = {
  Default: ({
    open,
    lightMode,
  }: {
    open?: boolean;
    lightMode?: boolean;
  }): JSONDebugger => ({
    open: open ?? false,
    history: OrderedMap(),
    current1: 0,
    current2: 0,
    darkMode: lightMode ? false : true,
    fontSize: 12,
    indent: 2,
    paused1: false,
    paused2: false,
    xPosition: 0,
    yPosition: 0,
    width: 300,
    height: 400,
    xOffset: 0,
    yOffset: 0,
    isMoving: false,
    isResizing: false,
    showDiff: false,
    scrollLock: false,
  }),
  Updaters: {
    Core: {
      ...simpleUpdater<JSONDebugger>()("history"),
      ...simpleUpdater<JSONDebugger>()("current1"),
      ...simpleUpdater<JSONDebugger>()("current2"),
      ...simpleUpdater<JSONDebugger>()("open"),
      ...simpleUpdater<JSONDebugger>()("darkMode"),
      ...simpleUpdater<JSONDebugger>()("fontSize"),
      ...simpleUpdater<JSONDebugger>()("indent"),
      ...simpleUpdater<JSONDebugger>()("paused1"),
      ...simpleUpdater<JSONDebugger>()("paused2"),
      ...simpleUpdater<JSONDebugger>()("xPosition"),
      ...simpleUpdater<JSONDebugger>()("yPosition"),
      ...simpleUpdater<JSONDebugger>()("width"),
      ...simpleUpdater<JSONDebugger>()("height"),
      ...simpleUpdater<JSONDebugger>()("xOffset"),
      ...simpleUpdater<JSONDebugger>()("yOffset"),
      ...simpleUpdater<JSONDebugger>()("isMoving"),
      ...simpleUpdater<JSONDebugger>()("isResizing"),
      ...simpleUpdater<JSONDebugger>()("showDiff"),
      ...simpleUpdater<JSONDebugger>()("scrollLock"),
    },
    Template: {
      position: (
        cursorPosition: [x: number, y: number]
      ): Updater<JSONDebugger> =>
        Updater<JSONDebugger>((_) => ({
          ..._,
          xPosition: Math.max(cursorPosition[0] - _.xOffset, 0),
          yPosition: Math.max(cursorPosition[1] - _.yOffset, 0),
        })),
      size: (cursorPosition: [x: number, y: number]): Updater<JSONDebugger> =>
        Updater<JSONDebugger>((_) => ({
          ..._,
          width: Math.max(cursorPosition[0] + _.xOffset - _.xPosition, 60),
          height: Math.max(cursorPosition[1] + _.yOffset - _.yPosition, 60),
        })),
      resizingOffset: (
        cursorPosition: [x: number, y: number]
      ): Updater<JSONDebugger> =>
        Updater<JSONDebugger>((_) => ({
          ..._,
          xOffset: _.width + _.xPosition - cursorPosition[0],
          yOffset: _.height + _.yPosition - cursorPosition[1],
        })),
      moveOffset: (
        cursorPosition: [x: number, y: number]
      ): Updater<JSONDebugger> =>
        Updater<JSONDebugger>((_) => ({
          ..._,
          xOffset: cursorPosition[0],
          yOffset: cursorPosition[1],
        })),
    },
  },
};

export type JSONDebuggerWritableState = JSONDebugger;

export type JSONDebuggerReadOnlyContext = {
  jsObject: Record<string | number | symbol, unknown>;
  id: string;
  label?: string;
  noReplaceUndefined?: boolean;
  swapPrev: () => void;
  swapNext: () => void;
  moveToTop: () => void;
};

export type JSONDebuggerView = View<
  JSONDebuggerReadOnlyContext & JSONDebuggerWritableState,
  JSONDebuggerWritableState,
  Unit
>;
