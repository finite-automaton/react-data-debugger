import { id, replaceWith, Unit } from "ballerina-core";
import { JSONDebugger } from "../state";
import { Co } from "./builder";

export const SetHistoryToCurrent = Co.GetState().then((currentState) =>
  Co.SetState(
    JSONDebugger.Updaters.Core.current(
      replaceWith(currentState.history.size - 1)
    )
  )
);

export const UpdateHistory = Co.GetState().then((currentState) =>
  Co.SetState(
    JSONDebugger.Updaters.Core.history(
      replaceWith(
        currentState.history.set(Date.now().toString(), currentState.jsObject)
      )
    ).then(
      currentState.paused
        ? id
        : JSONDebugger.Updaters.Core.current(
            replaceWith(currentState.history.size)
          )
    )
  )
);

export const SetHistoryToCurrentRunner = Co.Template<Unit>(
  SetHistoryToCurrent,
  {
    runFilter: (props) => !props.context.paused,
    interval: 1,
  }
);

export const UpdateHistoryRunner = Co.Template<Unit>(UpdateHistory, {
  runFilter: (props) =>
    JSON.stringify(props.context.jsObject) !==
    JSON.stringify(props.context.history.last()),
    interval: 1
});
