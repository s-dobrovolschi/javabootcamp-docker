export interface Order {
    id?: number;
    timestamp?: Date;
    pizza?: string;
    location?: string;
    customer?: string;
    waitTime?: number;
    mood?: string;
}
