import { DocumentConfig } from "../Contracts/DocumentConfig";

export class DocumentBuilder<T> {
    /**
     * Create a new document builder.
     */
    constructor(
        private config: DocumentConfig
    ) { }

    /**
     * Insert data into the collection.
     */
    async into(collection: string): Promise<T> {
        const response = await fetch(`${this.config.endpoint}/${collection}${this.config.type === 'documents' ? '/batch' : ''}`, {
            method: "PUT",
            body: JSON.stringify({
                data: this.config.data
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.token}`
            }
        });

        const json: any = await response.json();

        if (json.error) {
            throw new Error(json.error);
        }

        return json;
    }
}
