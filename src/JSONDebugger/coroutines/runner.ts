import { id, replaceWith, Unit } from "ballerina-core";

import { JSONDebugger } from "../state";
import { Co } from "./builder";

export const UpdateHistory = Co.GetState().then((currentState) =>
  Co.SetState(
    JSONDebugger.Updaters.Core.current(
      currentState.paused ? id : replaceWith(currentState.history.size)
    ).then(
      JSONDebugger.Updaters.Core.history(
        replaceWith(currentState.history.set(Date.now().toString(), currentState.jsObject))
      )
    )
  )
);

export const UpdateHistoryRunner = Co.Template<Unit>(UpdateHistory, {
  runFilter: (props) =>
    JSON.stringify(props.context.jsObject) !=
    JSON.stringify(props.context.history.last()),
  interval: 1,
  restartWhenFinished: true,
});
