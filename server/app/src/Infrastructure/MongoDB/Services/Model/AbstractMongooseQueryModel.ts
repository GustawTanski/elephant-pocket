import DomainObject from "../../../../Core/Port/DomainObject";
import { Query, Document, Model } from "mongoose";

export interface MongooseQueryModel<T extends DomainObject, S extends Document> {
	find(): Query<S[]>;
	mapToHydratedDomainObject(document: S): T;
	mapToPartialDomainObject(document: S): Partial<T>;
}

export default abstract class AbstractMongooseQueryModel<T extends DomainObject, S extends Document>
	implements MongooseQueryModel<T, S> {
	protected abstract Model: Model<S, {}>;
    
    abstract mapToHydratedDomainObject(document: S): T;
	abstract mapToPartialDomainObject(document: S): Partial<T>;

	find(): Query<S[]> {
		return this.Model.find();
	}
}
