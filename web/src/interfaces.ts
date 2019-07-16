export interface ILinkInfo {
    url: string,
    name: string,
    isEqual?: (comparedLink: ILinkInfo) => boolean
}