import { CollectionBuilder } from "./Builder/CollectionBuilder";
import { Created } from "./Contracts/Created";
import { DatabaseConfig } from "./Contracts/DatabaseConfig";
import { Document } from "./Contracts/Document";
import { DocumentBuilder } from "./Builder/DocumentBuilder";
import { InsertOptions } from "./Types/InsertOptions";

export class Database {
    /**
     * Collection builder instance.
     */
    private collectionBuilder: CollectionBuilder;

    /**
     * Initialize database.
     */
    constructor(
        private config: DatabaseConfig
    ) {
        this.collectionBuilder = new CollectionBuilder(config);
    }

    /**
     * Create query.
     */
    query(): CollectionBuilder {
        return this.collectionBuilder;
    }

    /**
     * Create document.
     */
    insert<T = unknown>(data: T, options?: InsertOptions) {
        return new DocumentBuilder<Document & T>({
            type: 'document',
            endpoint: this.config.endpoint,
            token: this.config.token,
            data: {
                data: data,
                options: options ?? {},
            },
        });
    }

    /**
     * Create many documents.
     */
    insertMany<T = unknown>(data: T[], options?: InsertOptions) {
        return new DocumentBuilder<Created>({
            type: 'documents',
            endpoint: this.config.endpoint,
            token: this.config.token,
            data: {
                data: data,
                options: options ?? {},
            },
        });
    }
}
