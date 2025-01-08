import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "./icons";

export const ViewerControls = ({
  paused,
  current,
  onPauseClick,
  onPlayClick,
  onHistoryForwardClick,
  onHistoryBackwardClick,
  historySize,
  darkMode,
}: {
  paused: boolean;
  current: number;
  onPauseClick: (_: React.MouseEvent) => void;
  onPlayClick: (_: React.MouseEvent) => void;
  onHistoryForwardClick: (_: React.MouseEvent) => void;
  onHistoryBackwardClick: (_: React.MouseEvent) => void;
  historySize: number;
  darkMode: boolean;
}) => {
  const iconColor = darkMode ? "white" : "black";
  return (
    <div className="viewerControlsContainer">
      <div
        className="viewerControls"
        style={{
          borderLeft: `1px solid ${iconColor}`,
          borderBottom: `1px solid ${iconColor}`,
          backgroundColor: darkMode ? "black" : "white",
        }}
      >
        <div className="pageNumbers">
          <p className="menuText" style={{ color: iconColor }}>{`${
            current + 1
          }/${historySize}`}</p>
        </div>
        <div className="playbackButtons">
          {paused ? (
            <button className="playbackButton" onClick={onPlayClick}>
              <PlayIcon color={iconColor} />
            </button>
          ) : (
            <button className="playbackButton" onClick={onPauseClick}>
              <PauseIcon color={iconColor} />
            </button>
          )}
          <button onClick={onHistoryBackwardClick} className="playbackButton">
            <BackwardIcon color={iconColor} />
          </button>
          <button onClick={onHistoryForwardClick} className="playbackButton">
            <ForwardIcon color={iconColor} />
          </button>
        </div>
      </div>
    </div>
  );
};
