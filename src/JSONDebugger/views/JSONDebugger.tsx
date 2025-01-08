import { replaceWith } from "ballerina-core";
import { JSONDebugger, JSONDebuggerView } from "../state";
import {
  DarkModeIcon,
  DragIcon,
  HideIcon,
  LayerDownIcon,
  LayerUpIcon,
  LeftIndentIcon,
  LightModeIcon,
  MergeIcon,
  ResizeIcon,
  RightIndentIcon,
  ScrollLockIcon,
  ScrollUnlockIcon,
  SendToFrontIcon,
  ShowIcon,
  SplitIcon,
  TextDecreaseIcon,
  TextIncreaseIcon,
} from "./icons";
import { ViewerControls } from "./ViewerControls";

export const JsonDebugger: JSONDebuggerView = (props) => {
  const onDragMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    props.context.moveToTop();
    props.setState(
      JSONDebugger.Updaters.Core.isMoving(replaceWith(true)).then(
        JSONDebugger.Updaters.Template.moveOffset([
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
        ])
      )
    );
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    props.context.moveToTop();
    props.setState(
      JSONDebugger.Updaters.Core.isResizing(replaceWith(true)).then(
        JSONDebugger.Updaters.Template.resizingOffset([e.clientX, e.clientY])
      )
    );
  };

  const onMouseUp = (_: React.MouseEvent) => {
    props.setState(
      JSONDebugger.Updaters.Core.isResizing(replaceWith(false)).then(
        JSONDebugger.Updaters.Core.isMoving(replaceWith(false))
      )
    );
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (props.context.isMoving)
      props.setState(
        JSONDebugger.Updaters.Template.position([e.clientX, e.clientY])
      );

    if (props.context.isResizing)
      props.setState(
        JSONDebugger.Updaters.Template.size([e.clientX, e.clientY])
      );
  };

  const onCollapseClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.open(replaceWith(false)));

  const onExpandClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.open(replaceWith(true)));

  const onDarkModeClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.darkMode((_) => !_));

  const onPause1Click = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused1(replaceWith(true)));

  const onPause2Click = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused2(replaceWith(true)));

  const onPlay1Click = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused1(replaceWith(false)));

  const onPlay2Click = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused2(replaceWith(false)));

  const onHistory1ForwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused1(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current1((_) =>
          _ < props.context.history.size - 1 ? _ + 1 : _
        )
      )
    );

  const onHistory2ForwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused2(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current2((_) =>
          _ < props.context.history.size - 1 ? _ + 1 : _
        )
      )
    );

  const onHistory1BackwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused1(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current1((_) => (_ > 0 ? _ - 1 : _))
      )
    );

  const onHistory2BackwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused2(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current2((_) => (_ > 0 ? _ - 1 : _))
      )
    );

  const onFontSizeIncreaseClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.fontSize((_) => _ + 1));

  const onFontSizeDecreaseClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.fontSize((_) => _ - 1));

  const onIndentIncreaseClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.indent((_) => (_ < 10 ? _ + 1 : _))
    );

  const onIndentDecreaseClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.indent((_) => (_ > 1 ? _ - 1 : _))
    );

  const onShowDiffClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.showDiff((_) => !_));

  const onScrollLockClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.scrollLock((_) => !_));

  const curr = props.context.paused1
    ? props.context.history.valueSeq().toArray()[props.context.current1]
    : props.context.history.last();

  const curr2 = props.context.paused2
    ? props.context.history.valueSeq().toArray()[props.context.current2]
    : props.context.history.last();

  const lightModeText = "black";
  const darkModeText = "white";

  const lightModeBackground = "white";
  const darkModeBackground = "black";

  const darkModeAccent = "grey";
  const lightModeAccent = "lightblue";

  const divs = document
    .getElementById(props.context.id)!
    .shadowRoot!.querySelectorAll(".jsObjectContainer");

  if (props.context.scrollLock) {
    divs.forEach((div) =>
      div.addEventListener("scroll", (_) => {
        divs.forEach((d) => {
          d.scrollTop = div.scrollTop;
          d.scrollLeft = div.scrollLeft;
        });
      })
    );
  }

  return (
    <div
      className="container"
      style={{
        visibility:
          props.context.isMoving || props.context.isResizing
            ? "visible"
            : "hidden",
        userSelect:
          props.context.isMoving || props.context.isResizing ? "none" : "auto",
        cursor:
          props.context.isMoving || props.context.isResizing
            ? "grabbing"
            : "auto",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {!props.context.open ? (
        <div
          className="collapsedPanel"
          style={{
            left: `${props.context.xPosition}px`,
            top: `${props.context.yPosition}px`,
            backgroundColor: props.context.darkMode
              ? darkModeBackground
              : lightModeBackground,
            color: props.context.darkMode ? darkModeText : lightModeText,
          }}
        >
          <button
            onMouseDown={onDragMouseDown}
            className="draggable topBarButton"
            style={(props.context.isMoving && { cursor: "grabbing" }) || {}}
          >
            <DragIcon
              color={props.context.darkMode ? darkModeText : lightModeText}
            />
          </button>
          <button className="topBarButton hoverPointer" onClick={onExpandClick}>
            <ShowIcon
              color={props.context.darkMode ? darkModeText : lightModeText}
            />
          </button>
          <button
            onClick={onDarkModeClick}
            className="topBarButton hoverPointer"
          >
            {props.context.darkMode ? (
              <LightModeIcon
                color={props.context.darkMode ? darkModeText : lightModeText}
              />
            ) : (
              <DarkModeIcon
                color={props.context.darkMode ? darkModeText : lightModeText}
              />
            )}
          </button>
          <p className="label">{props.context.label}</p>
        </div>
      ) : (
        <div
          className="panel"
          style={{
            height: `${props.context.height}px`,
            width: `${props.context.width}px`,
            left: `${props.context.xPosition}px`,
            top: `${props.context.yPosition}px`,
          }}
        >
          <button
            onMouseDown={onResizeMouseDown}
            className="draggable resizeButton"
            style={{
              ...(props.context.isResizing && { cursor: "grabbing" }),
              backgroundColor: props.context.darkMode
                ? darkModeAccent
                : lightModeAccent,
            }}
          >
            <ResizeIcon />
          </button>
          <div
            className="topBar"
            style={{
              backgroundColor: props.context.darkMode
                ? darkModeBackground
                : lightModeBackground,
              color: props.context.darkMode ? darkModeText : lightModeText,
            }}
          >
            <button
              onMouseDown={onDragMouseDown}
              className="draggable topBarButton"
              style={(props.context.isMoving && { cursor: "grabbing" }) || {}}
            >
              <DragIcon
                color={props.context.darkMode ? darkModeText : lightModeText}
              />
            </button>
            <button
              onClick={onCollapseClick}
              className="topBarButton hoverPointer"
            >
              <HideIcon
                color={props.context.darkMode ? darkModeText : lightModeText}
              />
            </button>

            <button
              onClick={onDarkModeClick}
              className="topBarButton hoverPointer"
            >
              {props.context.darkMode ? (
                <LightModeIcon
                  color={props.context.darkMode ? darkModeText : lightModeText}
                />
              ) : (
                <DarkModeIcon
                  color={props.context.darkMode ? darkModeText : lightModeText}
                />
              )}
            </button>
            <p
              className="label"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",
              }}
            >
              {props.context.label}
            </p>
          </div>
          <div
            className="content"
            style={{
              backgroundColor: props.context.darkMode
                ? darkModeBackground
                : lightModeBackground,
              color: props.context.darkMode ? darkModeText : lightModeText,
            }}
          >
            <div
              className="menu"
              style={{
                backgroundColor: props.context.darkMode
                  ? darkModeAccent
                  : lightModeAccent,
              }}
            >
              <div className="buttonGroup">
                <button onClick={onShowDiffClick} className="menuButton" style={{ marginTop: "8px"}}>
                  {props.context.showDiff ? <MergeIcon/> : <SplitIcon />}
                </button>
              </div>
              <div className="buttonGroup">
                <button
                  onClick={onFontSizeIncreaseClick}
                  className="menuButton"
                >
                  <TextIncreaseIcon />
                </button>
                <button
                  onClick={onFontSizeDecreaseClick}
                  className="menuButton"
                >
                  <TextDecreaseIcon />
                </button>
              </div>
              <div className="buttonGroup">
                <button className="menuButton" onClick={onIndentIncreaseClick}>
                  <RightIndentIcon />
                </button>
                <button className="menuButton" onClick={onIndentDecreaseClick}>
                  <LeftIndentIcon />
                </button>
              </div>
              <div className="buttonGroup">
                <button className="menuButton" onClick={props.context.swapNext}>
                  <LayerUpIcon />
                </button>
                <button className="menuButton" onClick={props.context.swapPrev}>
                  <LayerDownIcon />
                </button>
                <button
                  className="menuButton"
                  onClick={props.context.moveToTop}
                >
                  <SendToFrontIcon />
                </button>
              </div>
              {props.context.showDiff && (
                <div className="buttonGroup">
                  <button className="menuButton" onClick={onScrollLockClick}>
                    {props.context.scrollLock ? <ScrollLockIcon /> : <ScrollUnlockIcon />}
                  </button>
                </div>
              )}
            </div>

            <div
              className="jsObjectContainer"
              style={{
                fontSize: `${props.context.fontSize}px`,
                lineHeight: `${props.context.fontSize}px`,
              }}
            >
              <ViewerControls
                paused={props.context.paused1}
                current={props.context.current1}
                onPauseClick={onPause1Click}
                onPlayClick={onPlay1Click}
                onHistoryForwardClick={onHistory1ForwardClick}
                onHistoryBackwardClick={onHistory1BackwardClick}
                historySize={props.context.history.size}
                darkMode={props.context.darkMode}
              />
              <pre className="jsObject">
                {JSON.stringify(
                  curr,
                  props.context.noReplaceUndefined
                    ? undefined
                    : (_, v) => (v === undefined ? null : v),
                  props.context.indent
                )}
              </pre>
            </div>
            {props.context.showDiff && (
              <div
                className="jsObjectContainer"
                style={{
                  fontSize: `${props.context.fontSize}px`,
                  lineHeight: `${props.context.fontSize}px`,
                  borderLeft: `2px solid ${
                    props.context.darkMode ? darkModeAccent : lightModeAccent
                  }`,
                }}
              >
                <ViewerControls
                  paused={props.context.paused2}
                  current={props.context.current2}
                  onPauseClick={onPause2Click}
                  onPlayClick={onPlay2Click}
                  onHistoryForwardClick={onHistory2ForwardClick}
                  onHistoryBackwardClick={onHistory2BackwardClick}
                  historySize={props.context.history.size}
                  darkMode={props.context.darkMode}
                />
                <pre className="jsObject">
                  {JSON.stringify(
                    curr2,
                    props.context.noReplaceUndefined
                      ? undefined
                      : (_, v) => (v === undefined ? null : v),
                    props.context.indent
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
