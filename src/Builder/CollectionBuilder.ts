import { DatabaseConfig } from "../Contracts/DatabaseConfig";
import { QueryBuilder } from "./QueryBuilder";

export class CollectionBuilder {
    /**
     * Initialize collection builder.
     */
    constructor(
        private config: DatabaseConfig
    ) {}

    /**
     * Query from collection.
     */
    from(collection: string): QueryBuilder {
        return new QueryBuilder(this.config, collection);
    }
}
