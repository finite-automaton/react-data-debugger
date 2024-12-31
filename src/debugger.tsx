import { unit } from "ballerina-core";
import { useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";

import { styles } from "./css";
import { JSONDebugger } from "./JSONDebugger/state";
import { JSONDebuggerTemplate } from "./JSONDebugger/template";
import { JsonDebugger } from "./JSONDebugger/views/JSONDebugger";

const DebuggerContainer = ({
  open,
  lightMode,
  label,
  jsObject,
  noReplaceUndefined,
  swapNext,
  swapPrev,
  moveToTop,
}: any) => {
  const [JSONDebuggerState, setJSONDebuggerState] = useState<JSONDebugger>(
    JSONDebugger.Default({ open, lightMode })
  );

  return (
    <JSONDebuggerTemplate
      context={{
        ...JSONDebuggerState,
        jsObject,
        label,
        noReplaceUndefined,
        swapNext,
        swapPrev,
        moveToTop,
      }}
      setState={setJSONDebuggerState}
      foreignMutations={unit}
      view={JsonDebugger}
    />
  );
};

export const Debugger = (
  jsObject: Record<string | number | symbol, unknown>,
  options?: {
    label?: string;
    open?: boolean;
    lightMode?: boolean;
    noReplaceUndefined?: boolean;
  }
) => {

  const { label, open, lightMode, noReplaceUndefined } = options;
  let initialized = useRef(false);
  const root = useRef<Root | null>(null);
  const id = useRef<string>("");

  const curr = document.getElementById(id.current);
  const swapPrev = () => {
    const prev = document.getElementById(id.current)?.previousSibling;

    if (prev && curr) {
      curr.after(prev);
    }
  };
  const swapNext = () => {
    const next = document.getElementById(id.current)?.nextSibling;

    if (next && curr) {
      curr.before(next);
    }
  };

  const moveToTop = () => {
    if (curr) {
      curr.parentElement?.appendChild(curr);
    }
  };

  const ID_PREFIX = "£!@£json-debugger-";
  if (!initialized.current) {
    initialized.current = true;

    if (!document.getElementById(`${ID_PREFIX}PARENT`)) {
      const _ = document.createElement("div");
      _.id = `${ID_PREFIX}PARENT`;
      document.body.appendChild(_);
    }

    const parent = document.getElementById(`${ID_PREFIX}PARENT`);
    const container = document.createElement("div");
    const countExisting = document.querySelectorAll(
      `[id^="${ID_PREFIX}"]`
    ).length;
    id.current = `${ID_PREFIX}${countExisting}`;
    container.id = id.current;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);

    const shadowRoot = container.attachShadow({ mode: "open" });
    parent!.appendChild(container);
    root.current = createRoot(shadowRoot);
    shadowRoot.adoptedStyleSheets = [sheet];
  }

  return root.current
    ? root.current.render(
        <DebuggerContainer
          open={open}
          lightMode={lightMode}
          label={label}
          jsObject={jsObject}
          noReplaceUndefined={noReplaceUndefined}
          swapNext={swapNext}
          swapPrev={swapPrev}
          moveToTop={moveToTop}
        />
      )
    : undefined;
};
