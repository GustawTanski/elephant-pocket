export interface ILinkInfo {
    url: string,
    name: string,
    isEqual: (comparedLink: { url: string }) => boolean
}