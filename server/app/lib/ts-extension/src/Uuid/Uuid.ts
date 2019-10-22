import validate from "uuid-validate"


export default class Uuid {

    readonly uuid: string;
    constructor(uuid: string) {
        if(!this.validate(uuid)) throw new Error("Wrong uuid string provided!")
        this.uuid = uuid;
    }

    private validate(uuid: string) {
        return validate(uuid);
    }
}