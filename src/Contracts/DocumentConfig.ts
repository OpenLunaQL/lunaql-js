export interface DocumentConfig {
    endpoint: string;
    token: string;
    type: 'document' | 'documents';
    data: unknown;
}
