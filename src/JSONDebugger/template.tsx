import { Template, Unit } from "ballerina-core";
import {
  JSONDebuggerReadOnlyContext,
  JSONDebuggerView,
  JSONDebuggerWritableState,
} from "./state";
import {
  UpdateHistoryRunner,
} from "./coroutines/runner";

export const JSONDebuggerTemplate = Template.Default<
  JSONDebuggerReadOnlyContext,
  JSONDebuggerWritableState,
  Unit,
  JSONDebuggerView
>((props) => <props.view {...props} />).any([
  UpdateHistoryRunner,
]);
