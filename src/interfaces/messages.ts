export interface ChatMessage {
    content: string;
    stream: string;
    from: string;
    dateTime?: Date;
}

export interface ChatMessagesStats {
    messagesPerS: number;
    messagesPerSOver10: number[];
    messagesPerSOver10Avg: number;
}