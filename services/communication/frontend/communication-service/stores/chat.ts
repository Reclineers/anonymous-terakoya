import { defineStore } from 'pinia'
import type { Message } from '@/types/chat'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[]
  }),

  actions: {
    sendMessage(content: string) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        userId: 'user1',
        timestamp: new Date(),
        isOwn: true
      }
      this.messages.push(message)
    }
  }
})