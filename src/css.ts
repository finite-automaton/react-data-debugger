/** For syntax highlighting and intellisense in VS Code,
 * use the pluging inline html
 */

export const styles = /*css*/ `
    /* CSS Rest */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
	quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Styles */

    .container {
        left: 0;
        top: 0;
        position: fixed;
        width: 100vw;
        height: 100vh;
    }

    .topBar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        text-wrap: "nowrap";
        text-overflow: "ellipsis";
        border-bottom: 1px solid grey;
    }

    .label {
        padding-left: 8px;
    }

    .collapsedPanel {
        visibility: visible;
        font-family: monospace;
        display: flex;
        align-items: center;
        position: fixed;
        font-size: 12px;
        padding-right: 16px;
        border: 1px solid grey;
    }

    .panel {
        visibility: visible;
        font-family: monospace;
        display: flex;
        flex-direction: column;
        position: fixed;
        font-size: 12px;
        min-width: 60px;
        min-height: 60px;
        border: 1px solid grey;
        overflow: hidden;
    }

    .content {
        visibility: visible;
        color: white;
        font-family: monospace;
        display: flex;
        overflow: hidden;
        height: 100%;
    }

    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* padding: 4px; */
        width: 32px;
        min-width: 32px;
        height: 100%;
        gap: 12px;
        overflow: scroll;
        scrollbar-width: none;
    }

    .pageNumbers {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .menuText {
        font-size: 12px;
        margin: 0;
        padding: 0;
        color: black;
    }

    .menuButton {
        all: unset;
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: lightgrey;
            cursor: pointer;
        }
    }

    .pageNumberDivider {
        border-bottom: 1px solid darkslategray;
    }

    .jsObject {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        text-align: left;
        overflow: scroll;
        width:100%;
        z-index: 1;
    }

    .resizeButton {
        all: unset;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
        border-top-left-radius: 4px;
        z-index: 2;
    }

    .draggable {
        &:hover {
            cursor: grab;
        }
    }

    .hoverPointer {
        &:hover {
            cursor: pointer;
        }
    }

    .topBarButton {
        all: unset;
        width: 24px;
        min-width: 24px;
        height: 12px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .playbackButtons {
        margin-top: 12px;
    }

    .buttonGroup {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
    }
/* 
    .iconWrapper {
        width: 24px;
        border-radius: 4px;
    } */

    .arrowIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;

        border-radius: 4px;
        /* padding: 16px; */

        &:hover {
            background-color: lightgrey;
            cursor: pointer;
        }
    }

    .expandIconWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        width: 12px;

        &:hover {
            cursor: pointer;
        }
    }

    .collapseIconWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        /* height: 24px; */
        width: 24px;
        &:hover {
            cursor: pointer;
        }
    }
`;
