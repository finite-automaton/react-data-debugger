import { unit } from "ballerina-core";
import { useEffect, useRef, useState } from "react";
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
  id,
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
        id
      }}
      setState={setJSONDebuggerState}
      foreignMutations={unit}
      view={JsonDebugger}
    />
  );
};

export const Debugger = ({
  jsObject,
  label,
  open,
  lightMode,
  noReplaceUndefined,
}: {
  jsObject: Record<string | number | symbol, unknown>;
  label?: string;
  open?: boolean;
  lightMode?: boolean;
  noReplaceUndefined?: boolean;
}) => {
  let initialized = useRef(false);
  const root = useRef<Root | null>(null);
  const id = useRef<string>("");

  const ID_PREFIX = "£!@£json-debugger-";
  if (!initialized.current) {
    initialized.current = true;

    if (!document.getElementById(`${ID_PREFIX}PARENT`)) {
      const _ = document.createElement("div");
      _.id = `${ID_PREFIX}PARENT`;
      _.style.zIndex = "2147483647";
      _.style.position = "fixed";
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

  useEffect(() => {
    if (root.current) {
      root.current.render(
        <DebuggerContainer
          open={open}
          lightMode={lightMode}
          label={label}
          jsObject={jsObject}
          noReplaceUndefined={noReplaceUndefined}
          swapNext={swapNext}
          swapPrev={swapPrev}
          moveToTop={moveToTop}
          id={id.current}
        />
      );
    }
  }, [JSON.stringify(jsObject)]);

  return <></>;
};
