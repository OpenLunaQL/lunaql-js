import { DatabaseConfig } from "../Contracts/DatabaseConfig";
import { OperatorTypes } from "../Types/Operators";
import { RelationshipBuilder } from "./RelationshipBuilder";

export class QueryBuilder {
    /**
     * Raw query.
     */
    private _builder: any = {
        query: { from: { } }
    }

    /**
     * Create a new query builder.
     */
    constructor(
        private config: DatabaseConfig,
        private collection: string
    ) {
        this._builder.query.from = {
            [collection]: {}
        };
    }

    /**
     * Select fields from the collection.
     */
    select(fields: string[]): QueryBuilder {
        return this.updateQuery("select", fields);
    }

    /**
     * Hide fields from the collection.
     */
    hidden(fields: string[]): QueryBuilder {
        return this.updateQuery("hidden", fields);
    }

    /**
     * Filter the collection.
     */
    where<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): QueryBuilder {
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
    orWhere<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): QueryBuilder {
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
    orderBy(field: string, direction: "asc" | "ASC" | "desc" | "DESC"): QueryBuilder {
        return this.updateQuery("orderBy", field).sort(direction);
    }

    /**
     * Sort the collection.
     */
    sort(direction: "asc" | "ASC" | "desc" | "DESC"): QueryBuilder {
        return this.updateQuery("sort", direction);
    }

    /**
     * Group the collection.
     */
    groupBy(fields: string[]): QueryBuilder {
        return this.updateQuery("groupBy", fields);
    }

    /**
     * Filter the collection.
     */
    having<T extends keyof OperatorTypes>(field: string, operator: T, value: OperatorTypes[T]): QueryBuilder {
        return this.updateQuery("having", [
            field, operator, value
        ], true);
    }

    /**
     * Limit the collection.
     */
    limit(limit: number): QueryBuilder {
        return this.updateQuery("limit", limit);
    }

    /**
     * Skip documents in the collection.
     */
    skip(skip: number): QueryBuilder {
        return this.updateQuery("skip", skip);
    }

    /**
     * Join collection to another collection.
     */
    hasMany(collection: string, callback: (query: RelationshipBuilder) => void): QueryBuilder {
        const builder = new RelationshipBuilder({
            type: 'hasMany',
            collection
        });

        callback(builder);

        if (!this._builder.query.from[this.collection].hasMany) {
            this._builder.query.from[this.collection].hasMany = {}
        }

        this._builder.query.from[this.collection].hasMany[collection] = builder.getQuery().query['hasMany'][collection];

        return this;
    }

    /**
     * Join collection to another collection.
     */
    belongsTo(collection: string, callback: (query: RelationshipBuilder) => void): QueryBuilder {
        const builder = new RelationshipBuilder({
            type: 'belongsTo',
            collection
        });

        callback(builder);

        if (!this._builder.query.from[this.collection].belongsTo) {
            this._builder.query.from[this.collection].belongsTo = {}
        }

        this._builder.query.from[this.collection].belongsTo[collection] = builder.getQuery().query['belongsTo'][collection];

        return this;
    }

    /**
     * Delete documents in the collection.
     */
    async delete<T = unknown>(): Promise<T> {
        this.updateQuery("do", "delete");

        return this.persist();
    }

    /**
     * Count documents in the collection.
     */
    async count<T = unknown>(): Promise<T> {
        this.updateQuery("do", "count");

        return this.persist();
    }

    /**
     * Check if documents exist in the collection.
     */
    async exists<T = unknown>(): Promise<T> {
        this.updateQuery("do", "exists");

        return this.persist();
    }

    /**
     * Pluck a property from the collection.
     */
    async list<T = unknown>(property?: string): Promise<T[]> {
        this.updateQuery("do", "list");

        if (property) {
            this.updateQuery("listBy", property);
        }

        return this.persist();
    }

    /**
     * Fetch documents from the collection.
     */
    async fetch<T = unknown>(): Promise<T> {
        this.updateQuery("do", "fetch");

        return this.persist();
    }

    /**
     * Fetch the first document from the collection.
     */
    async fetchFirst<T = unknown>(): Promise<T> {
        this.updateQuery("do", "fetchFirst");

        return this.persist();
    }

    /**
     * Update documents in the collection.
     */
    async update(data: any) {
        this.updateQuery("set", data);
        this.updateQuery("do", "update");

        return this.persist();
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
    private updateQuery(keys: string | any[], query: any, create: boolean = false, push: boolean = false): QueryBuilder {
        if (typeof keys === "string") {
            keys = [ keys ];
        }

        if (!this._builder.query.from[this.collection][keys[0]] && create) {
            this._builder.query.from[this.collection][keys[0]] = [];
        }

        if (keys.length === 1) {
            this._builder.query.from[this.collection][keys[0]] = push
                ? [ ...this._builder.query.from[this.collection][keys[0]], query ]
                : query;
        } else {
            this._builder.query.from[this.collection][keys[0]][keys[1]] = push
                ? [ ...this._builder.query.from[this.collection][keys[0]][keys[1]], query ]
                : query;
        }

        return this;
    }

    /**
     * Persist query to the database.
     */
    private async persist() {
       const response = await fetch(this.config.endpoint, {
            method: "POST",
            body: JSON.stringify(this.getQuery()),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.token}`
            }
        });

        const json: any = await response.json();

        if (json.error) {
            throw new Error(json.error);
        }

        return json[this.collection];
    }
}
