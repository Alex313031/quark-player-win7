/* This is injecting into remote webpages to add a
menubar which can be used to move the window around
and exit from frameless window on linux where
the frameless window hides the settings menu.
*/

console.log('Electron Status: Injected Header');

document.body.insertAdjacentHTML(
  'afterBegin',
  `
    <div class="ElectronPlayer-topbar"></div>
    <span title="Exit FullScreen" class="ElectronPlayer-exit-btn" onclick="ipc.send('exit-fullscreen')"><svg xmlns="http://www.w3.org/2000/svg" width="16pt" height="16pt" fill="currentColor" version="1.0" viewBox="0 0 1280 1280"><path d="M1545 12784 c-85 -19 -167 -51 -243 -95 -69 -41 -1089 -1049 -1157 -1144 -101 -141 -140 -263 -140 -440 0 -169 36 -293 125 -427 29 -43 705 -726 2149 -2170 l2106 -2108 -2111 -2112 c-1356 -1358 -2124 -2133 -2147 -2169 -88 -137 -121 -249 -121 -419 -1 -181 37 -302 139 -445 68 -95 1088 -1103 1157 -1144 273 -159 604 -143 853 42 22 17 986 976 2143 2131 l2102 2101 2103 -2101 c1156 -1155 2120 -2114 2142 -2131 69 -51 130 -82 224 -113 208 -70 431 -44 629 71 69 41 1089 1049 1157 1144 101 141 140 263 140 440 0 166 -36 290 -121 422 -25 39 -746 767 -2148 2171 l-2111 2112 2107 2108 c2207 2208 2162 2161 2219 2303 75 187 77 392 4 572 -53 132 -74 157 -615 700 -289 291 -552 548 -585 572 -141 101 -263 140 -440 140 -166 0 -289 -35 -420 -120 -41 -26 -724 -702 -2172 -2149 l-2113 -2111 -2112 2111 c-1454 1452 -2132 2123 -2173 2150 -64 41 -149 78 -230 101 -79 22 -258 26 -340 7z" transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"/></svg></span>
    <style>
    @media (prefers-color-scheme: light) {
      :root {
        --bar-color: rgba(52, 52, 52, 96%);
        --btn-color: rgba(52, 52, 52, 96%);
        --btn-hover-color: rgba(32, 32, 32, 0.667);
        --btn-active-color: rgba(32, 32, 32, 0.9);
      }
    }
    :root.light {
      --bar-color: rgba(52, 52, 52, 96%);
      --btn-color: rgba(52, 52, 52, 96%);
      --btn-hover-color: rgba(32, 32, 32, 0.667);
      --btn-active-color: rgba(32, 32, 32, 0.9);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bar-color: #171717;
        --btn-color: rgba(128, 128, 128, 96%);
        --btn-hover-color: rgba(232, 232, 232, 96%);
        --btn-active-color: rgba(232, 232, 232, 0.5);
      }
    }
    :root.dark {
      --bar-color: #171717;
      --btn-color: rgba(128, 128, 128, 96%);
      --btn-hover-color: rgba(232, 232, 232, 96%);
      --btn-active-color: rgba(232, 232, 232, 0.5);
    }
    .ElectronPlayer-topbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 16px;
      opacity: 1;
      background-color: var(--bar-color);
      z-index: 998;
      cursor: -webkit-grab;
      cursor: grab;
      -webkit-user-drag: none;
      -webkit-app-region: drag;
    }
    .ElectronPlayer-exit-btn {
      position: fixed;
      top: 0;
      left: 0;
      color: var(--btn-color);
      padding-top: 24px;
      padding-left: 8px;
      z-index: 999;
      cursor: -webkit-grab;
      cursor: grab;
      -webkit-user-drag: none;
      -webkit-app-region: no-drag;
    }
    .ElectronPlayer-exit-btn:hover {
      color: var(--btn-hover-color);
    }
    .ElectronPlayer-exit-btn:active {
      color: var(--btn-active-color);
    }
    ::-webkit-scrollbar {
      display: none;
    }
    </style>
`
);
