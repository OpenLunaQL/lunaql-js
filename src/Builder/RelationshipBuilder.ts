import { RelationshipConfig } from "../Contracts/RelationshipConfig";
import { OperatorTypes } from "../Types/Operators";

export class RelationshipBuilder {
    /**
     * Raw query.
     */
    private _builder: any = {
        query: { }
    }

    /**
     * Create a new query builder.
     */
    constructor(
        private config: RelationshipConfig
    ) {
        this._builder.query[this.config.type] = {
            [this.config.collection]: {}
        };
    }

    /**
     * Select fields from the collection.
     */
    select(fields: string[]): RelationshipBuilder {
        return this.updateQuery("select", fields);
    }

    /**
     * Hide fields from the collection.
     */
    hidden(fields: string[]): RelationshipBuilder {
        return this.updateQuery("hidden", fields);
    }

    /**
     * Filter the collection.
     */
    where<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): RelationshipBuilder {
        return this.updateQuery(
            "where",
            [ field, operator, value ],
            true,
            true,
        );
    }

    /**
     * Filter the collection.
     */
    orWhere<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): RelationshipBuilder {
        return this.updateQuery(
            "orWhere",
            [ field, operator, value ],
            true,
            true,
        );
    }

    /**
     * Order the collection.
     */
    orderBy(field: string, direction: "asc" | "ASC" | "desc" | "DESC"): RelationshipBuilder {
        return this.updateQuery("orderBy", field).sort(direction);
    }

    /**
     * Sort the collection.
     */
    sort(direction: "asc" | "ASC" | "desc" | "DESC"): RelationshipBuilder {
        return this.updateQuery("sort", direction);
    }

    /**
     * Group the collection.
     */
    groupBy(fields: string[]): RelationshipBuilder {
        return this.updateQuery("groupBy", fields);
    }

    /**
     * Filter the collection.
     */
    having<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): RelationshipBuilder {
        return this.updateQuery("having", [
            field, operator, value
        ], true);
    }

    /**
     * Limit the collection.
     */
    limit(limit: number): RelationshipBuilder {
        return this.updateQuery("limit", limit);
    }

    /**
     * Limit the collection.
     */
    skip(skip: number): RelationshipBuilder {
        return this.updateQuery("skip", skip);
    }

    /**
     * Join collection to another collection.
     */
    hasMany(collection: string, callback: (query: RelationshipBuilder) => void): RelationshipBuilder {
        const builder = new RelationshipBuilder({
            type: 'hasMany',
            collection
        });

        callback(builder);

        if (!this._builder.query[this.config.type][this.config.collection].hasMany) {
            this._builder.query[this.config.type][this.config.collection].hasMany = {};
        }

        this._builder.query[this.config.type][this.config.collection].hasMany[collection] = builder.getQuery().query['hasMany'][collection];

        return this;
    }

    /**
     * Join collection to another collection.
     */
    belongsTo(collection: string, callback: (query: RelationshipBuilder) => void): RelationshipBuilder {
        const builder = new RelationshipBuilder({
            type: 'belongsTo',
            collection
        });

        callback(builder);

        if (!this._builder.query[this.config.type][this.config.collection].belongsTo) {
            this._builder.query[this.config.type][this.config.collection].belongsTo = {};
        }

        this._builder.query[this.config.type][this.config.collection].belongsTo[collection] = builder.getQuery().query['belongsTo'][collection];

        return this;
    }

    /**
     * Get raw query.
     */
    getQuery() {
        return this._builder;
    }

    /**
     * Update query.
     */
    private updateQuery(keys: string | any[], query: any, create: boolean = false, push: boolean = false): RelationshipBuilder {
        if (typeof keys === "string") {
            keys = [ keys ];
        }

        if (!this._builder.query[this.config.type][this.config.collection][keys[0]] && create) {
            this._builder.query[this.config.type][this.config.collection][keys[0]] = [];
        }

        if (keys.length === 1) {
            this._builder.query[this.config.type][this.config.collection][keys[0]] = push
                ? [ ...this._builder.query[this.config.type][this.config.collection][keys[0]], query ]
                : query;
        } else {
            this._builder.query[this.config.type][this.config.collection][keys[0]][keys[1]] = push
                ? [ ...this._builder.query[this.config.type][this.config.collection][keys[0]][keys[1]], query ]
                : query;
        }

        return this;
    }
}
