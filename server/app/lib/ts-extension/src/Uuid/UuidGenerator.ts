import uuidv4 from "uuid/v4";
import Uuid from "./Uuid";
import validate from "uuid-validate"

export default abstract class UuidGenerator {
	static readonly defaultGenerator = uuidv4;

	static generateAsString(): string {
		return UuidGenerator.defaultGenerator();
    }
    
    static generate(): Uuid {
        return new Uuid(UuidGenerator.generateAsString());
    }

    static validate(uuid: string): boolean {
        return validate(uuid);
    }
}
