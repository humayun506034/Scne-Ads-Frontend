
export const chatAgents: ChatAgent[] = [
    {
        id: "1",
        name: "Danaj Agent ",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        role: "AI Agent",
    },
]

export const chatConversations: ChatConversation[] = [
    {
        id: "1",
        agentName: "Danaj Agent ",
        agentAvatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Did that answer your question?",
        timestamp: new Date(Date.now() - 33 * 60 * 1000), // 33 minutes ago
        unread: true,
    },
    {
        id: "2",
        agentName: "Danaj Agent ",
        agentAvatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Was that helpful",
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        unread: false,
    },
]

export const chatMessages: ChatMessage[] = [
    {
        id: "1",
        content: "Hey Zayed, what's going on?",
        sender: "agent",
        timestamp: new Date(),
        agentName: "Danaj Agent ",
        agentAvatar: "/placeholder.svg?height=32&width=32",
    },
]
export interface ChatMessage {
    id: string
    content: string
    sender: "user" | "agent"
    timestamp: Date
    agentName?: string
    agentAvatar?: string
}

export interface ChatConversation {
    id: string
    agentName: string
    agentAvatar: string
    lastMessage: string
    timestamp: Date
    unread?: boolean
}

export interface ChatAgent {
    id: string
    name: string
    avatar: string
    status: "online" | "offline"
    role: string
}
