export interface ChatMessage {
    content: string;
    stream: string;
    from: string;
    dateTime?: Date;
}
