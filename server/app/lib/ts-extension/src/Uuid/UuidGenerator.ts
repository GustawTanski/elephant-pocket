import uuidv4 from "uuid/v4";
import Uuid from "./Uuid";

export default class UuidGenerator {
	static readonly defaultGenerator = uuidv4;

	static generateAsString(): string {
		return UuidGenerator.defaultGenerator();
    }
    
    static generate(): Uuid {
        return new Uuid(UuidGenerator.generateAsString());
    }
}
