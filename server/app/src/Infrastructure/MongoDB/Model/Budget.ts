import { Document, Schema, model } from "mongoose";
import UuidGenerator from "../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import Budget from "../../../Core/Component/Budget/Domain/Budget/Budget";
import DateRange from "../../../../lib/ts-extension/src/DateRange/DateRange";
import BudgetFactory from "../../../Core/Component/Budget/Domain/Budget/BudgetFactory";
import BudgetEventFactory from "../../../Core/Component/Budget/Domain/Event/BudgetEventFactory";
import { BudgetEvent } from "../../../Core/Component/Budget/Domain/Event/BudgetEvent";

export interface BudgetDocument extends Document {
	_id: string;
	ownerId: string;
	type: string;
	dateRange: { begin: Date; end: Date };
	minimalBalance: number;
	history: Array<BudgetEvent>;
}

interface BudgetDocumentInput {
	_id: BudgetDocument["_id"];
	ownerId: BudgetDocument["ownerId"];
	type: BudgetDocument["type"];
	dateRange: BudgetDocument["dateRange"];
	minimalBalance: BudgetDocument["minimalBalance"];
	history: BudgetDocument["history"];
}

const BudgetEventSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		creationDate: {
			type: Date,
			required: true
		},
		payload: {
			type: {
				balanceChange: {
					type: Number,
					required: true
				}
			},
			required: true
		}
	},
	{ _id: false }
);

const DateRangeSchema = new Schema(
	{
		begin: { type: Date, required: true },
		end: { type: Date, required: true }
	},
	{ _id: false }
);

const BudgetSchema = new Schema({
	_id: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: UuidGenerator.validate
		}
	},
	ownerId: {
		type: String,
		unique: true,
		required: true,
		index: true,
		validate: {
			validator: UuidGenerator.validate
		}
	},
	type: { type: String, required: true },
	dateRange: {
		type: DateRangeSchema,
		required: true
	},
	minimalBalance: { type: Number, required: true },
	history: {
		type: [BudgetEventSchema],
		required: true
	}
});

export const BudgetModel = model<BudgetDocument>("Budget", BudgetSchema);

export const BudgetMapper = class BudgetMapper {
	static toDocumentProperties(budget: Budget): BudgetDocumentInput {
		return {
			_id: budget.id.toString(),
			type: budget.type,
			ownerId: budget.ownerId.toString(),
			dateRange: {
				begin: budget.dateRange.begin,
				end: budget.dateRange.end
			},
			minimalBalance: budget.minimalBalance,
			history: [...budget.history]
		};
	}
	
	static toDomainObject(budget: BudgetDocument): Budget {
		return BudgetFactory.produce({
			id: budget._id,
			ownerId: budget.ownerId,
			type: budget.type,
			dateRange: new DateRange(budget.dateRange),
			minimalBalance: budget.minimalBalance,
			history: budget.history.map(event => BudgetEventFactory.produce(event))
		});
	}
};
