import { ILinkInfo } from "../interfaces";

export default class LinkInfo implements ILinkInfo {
	public name: string;
	public url: string;

	constructor(name: string = "Undefined", url: string = "") {
		this.name = name;
		this.url = url;
	}

	public isEqual(comparedLink: ILinkInfo): boolean {
		return comparedLink.url === this.url;
	}
}
