import { simpleUpdater, Unit, Updater, View } from "ballerina-core";
import { OrderedMap } from "immutable";

export type JSONDebugger = {
  open: boolean;
  history: OrderedMap<string, any>;
  current: number;
  darkMode: boolean;
  fontSize: number;
  indent: number;
  paused: boolean;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  isMoving: boolean;
  isResizing: boolean;
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
    current: 0,
    darkMode: lightMode ? false : true,
    fontSize: 12,
    indent: 2,
    paused: false,
    xPosition: 0,
    yPosition: 0,
    width: 300,
    height: 400,
    xOffset: 0,
    yOffset: 0,
    isMoving: false,
    isResizing: false,
  }),
  Updaters: {
    Core: {
      ...simpleUpdater<JSONDebugger>()("history"),
      ...simpleUpdater<JSONDebugger>()("current"),
      ...simpleUpdater<JSONDebugger>()("open"),
      ...simpleUpdater<JSONDebugger>()("darkMode"),
      ...simpleUpdater<JSONDebugger>()("fontSize"),
      ...simpleUpdater<JSONDebugger>()("indent"),
      ...simpleUpdater<JSONDebugger>()("paused"),
      ...simpleUpdater<JSONDebugger>()("xPosition"),
      ...simpleUpdater<JSONDebugger>()("yPosition"),
      ...simpleUpdater<JSONDebugger>()("width"),
      ...simpleUpdater<JSONDebugger>()("height"),
      ...simpleUpdater<JSONDebugger>()("xOffset"),
      ...simpleUpdater<JSONDebugger>()("yOffset"),
      ...simpleUpdater<JSONDebugger>()("isMoving"),
      ...simpleUpdater<JSONDebugger>()("isResizing"),
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
