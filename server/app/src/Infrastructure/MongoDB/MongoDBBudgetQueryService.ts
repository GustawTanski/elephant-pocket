import { BudgetModel, BudgetMapper } from './Model/Budget'
import BudgetId from '../../Core/SharedKernel/Component/Budget/Domain/Budget/BudgetId';
import Budget from '../../Core/Component/Budget/Domain/Budget/Budget';
import EmptyQueryError from '../../Core/Port/Persistence/Error/EmptyQueryError';
import UserId from '../../Core/SharedKernel/Component/User/Domain/User/UserId';

export default class MongoDBBudgetQueryService {
    private Model = BudgetModel;

    constructor() {}

    async findById(id: BudgetId): Promise<Budget> {
        const budgetDocument = await this.Model.findById(id.toString());
        if(!budgetDocument) throw new EmptyQueryError("there is no budget with such id");
        else return BudgetMapper.toDomainObject(budgetDocument);
    }

    async findAllByAuthorId(id: UserId): Promise<Budget[]> {
        const budgetDocuments = await this.Model.find({ authorId: id.toString()});
        const budgetDomainObjects: Budget[] = budgetDocuments.map(budget => BudgetMapper.toDomainObject(budget));
        return budgetDomainObjects;
    }

    async findAll(): Promise<Budget[]> {

    }

    
}