import { replaceWith } from "ballerina-core";
import { JSONDebugger, JSONDebuggerView } from "../state";
import {
  BackwardIcon,
  DarkModeIcon,
  DragIcon,
  ForwardIcon,
  HideIcon,
  LayerDownIcon,
  LayerUpIcon,
  LeftIndentIcon,
  LightModeIcon,
  PauseIcon,
  PlayIcon,
  ResizeIcon,
  RightIndentIcon,
  SendToFrontIcon,
  ShowIcon,
  TextDecreaseIcon,
  TextIncreaseIcon,
} from "./icons";

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

  const onPauseClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused(replaceWith(true)));

  const onPlayClick = (_: React.MouseEvent) =>
    props.setState(JSONDebugger.Updaters.Core.paused(replaceWith(false)));

  const onHistoryForwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current((_) =>
          _ < props.context.history.size - 1 ? _ + 1 : _
        )
      )
    );

  const onHistoryBackwardClick = (_: React.MouseEvent) =>
    props.setState(
      JSONDebugger.Updaters.Core.paused(replaceWith(true)).then(
        JSONDebugger.Updaters.Core.current((_) => (_ > 0 ? _ - 1 : _))
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

  const curr = props.context.paused
    ? props.context.history.valueSeq().toArray()[props.context.current]
    : props.context.history.last();

  const lightModeText = "black";
  const darkModeText = "white";

  const lightModeBackground = "white";
  const darkModeBackground = "black";

  const darkModeAccent = "grey";
  const lightModeAccent = "lightblue";

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
              <div className="playbackButtons buttonGroup">
                {props.context.paused ? (
                  <button className="menuButton" onClick={onPlayClick}>
                    <PlayIcon />
                  </button>
                ) : (
                  <button className="menuButton" onClick={onPauseClick}>
                    <PauseIcon />
                  </button>
                )}
                <button onClick={onHistoryForwardClick} className="menuButton">
                  <ForwardIcon />
                </button>
                <button onClick={onHistoryBackwardClick} className="menuButton">
                  <BackwardIcon />
                </button>
              </div>
              <div className="pageNumbers">
                <p className="menuText pageNumberDivider">{`${props.context.current + 1}`}</p>
                <p
                  className="menuText"
                  style={{
                    textShadow: "-.5px 0,  0 .5px,  .5px 0,  0 -.5px",
                  }}
                >{`${props.context.history.size}`}</p>
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
            </div>
            <div
              className="jsObject"
              style={{
                fontSize: `${props.context.fontSize}px`,
                lineHeight: `${props.context.fontSize}px`,
              }}
            >
              <pre>
                {JSON.stringify(
                  curr,
                  props.context.noReplaceUndefined
                    ? undefined
                    : (_, v) => (v === undefined ? null : v),
                  props.context.indent
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
