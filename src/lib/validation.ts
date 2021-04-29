const URL_REGEX = "https:\/\/([\w\.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$"

export function isValidFigmaUrl(url: string) {
    return url && url.match(URL_REGEX);
}