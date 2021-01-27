import { User } from "../../services/user.service";

export interface Conversation {
    _id: string;
    chatRoomId: string;
    message: {
        messageText: string;
    },
    postedByUser: User,
    readByRecipients: {
        readAt: string;
        readByUserId: string;
    }[],
    type: string;
}

export interface ChatMessage {
    success: true,
    conversation: Conversation[],
    users: User[]
}