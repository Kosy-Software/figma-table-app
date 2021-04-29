/// Messages that are relayed to all of the clients
export type AppMessage =
    | ReceiveFigmaUrl

export interface ReceiveFigmaUrl {
    type: "receive-figma-url";
    payload: string;
}

/// Internal component messages
export type ComponentMessage =
    | FigmaUrlHasChanged

export interface FigmaUrlHasChanged {
    type: "figma-url-changed";
    payload: string;
}

