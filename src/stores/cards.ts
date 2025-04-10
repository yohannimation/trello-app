// Basic import
import { defineStore } from "pinia";

// Interface
import { CardInterface } from './card.interface'

export const useCardsStore = defineStore("cards", {
  state: () => ({
    cards: [] as CardInterface[],
  }),

  actions: {
    addCard(columnId: number) {
      const cardData: CardInterface = {
        id: Date.now(),
        columnId: columnId,
        name: "",
        content: "",
      }

      this.cards.unshift(cardData)
      this.persist()
    },

    deleteCard(cardId: number) {
      const cardIndex = this.getCardIndexById(cardId)
      this.cards.splice(cardIndex, 1)

      this.persist()
    },

    deleteCardsFromColumnId(columnId: number) {
      var cardsIndexToDelete = []

      this.cards.map((card, index) => {
        if (card.columnId === columnId) {
          cardsIndexToDelete.push(index)
        }
      })
      this.cards = this.cards.filter(
        (_, index) => !cardsIndexToDelete.includes(index)
      )

      this.persist()
    },

    updateCard(cardData: CardInterface) {
      const cardIndex = this.getCardIndexById(cardData.id)

      if (cardIndex >= 0) {
        this.cards[cardIndex] = cardData
      }

      this.persist()
    },

    initCards() {
      const storedCards = localStorage.getItem("cards")

      if (storedCards) {
        const parsedCards = JSON.parse(storedCards)
        this.cards = parsedCards
      } else {
        localStorage.setItem("cards", JSON.stringify(this.cards))
      }
    },

    persist() {
      localStorage.setItem("cards", JSON.stringify(this.cards))
    }
  },

  getters: {
    getCards: (state) => {
      return state.cards
    },

    getCardIndexById: (state) => (cardId: number) => {
      const cardIndex = state.cards.findIndex((card) => card.id === cardId)
      return cardIndex
    },

    getCardsForColumnId: (state) => (columnId: number) => {
      const cardsForCurrentColumn = state.cards.filter((card) => {
        if (card.columnId === columnId) {
          return card
        }
      })

      return cardsForCurrentColumn
    }
  },
});
