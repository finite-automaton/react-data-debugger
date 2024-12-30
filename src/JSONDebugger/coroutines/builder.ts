import { CoTypedFactory } from "ballerina-core";
import {
  JSONDebuggerReadOnlyContext,
  JSONDebuggerWritableState,
} from "../state";

export const Co = CoTypedFactory<
  JSONDebuggerReadOnlyContext,
  JSONDebuggerWritableState
>();
