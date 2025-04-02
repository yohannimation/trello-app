import { defineStore } from "pinia";

export const useColumnsStore = defineStore("columns", {
  state: () => ({
    columns: [],
  }),

  actions: {
    addCard(columnId: number) {
      const columnIndex = this.getColumnIndex(columnId)

      this.columns[columnIndex].cardsList.unshift({
        id: Date.now(),
        title: "",
        content: "",
      });

      this.setColumns();
    },

    addColumns() {
      this.columns.push({
        id: Date.now(),
        name: "Column name",
        cardsList: []
      })

      this.setColumns();
    },

    deleteCard(columnId: number, cardId: number) {
      const columnIndex = this.getColumnIndex(columnId)
      const cardIndex = this.getCardIndex(
        this.columns[columnIndex].cardsList,
        cardId
      )

      this.columns[columnIndex].cardsList.splice(cardIndex, 1);

      this.setColumns();
    },

    deleteColumn(columnId: number) {
      const columnIndex = this.getColumnIndex(columnId)

      this.columns.splice(columnIndex, 1);

      this.setColumns();
    },

    updateCard(
      columnId: number,
      cardId: number,
      cardTitle: string,
      cardContent: string
    ) {
      const columnIndex = this.getColumnIndex(columnId)
      const cardIndex = this.getCardIndex(
        this.columns[columnIndex].cardsList,
        cardId
      )

      this.columns[columnIndex].cardsList[cardIndex].title = cardTitle
      this.columns[columnIndex].cardsList[cardIndex].content = cardContent

      this.setColumns()
    },

    updateColumn(columnId: number, name: string) {
      const columnIndex = this.getColumnIndex(columnId)

      if (columnIndex >= 0) {
        this.columns[columnIndex].name = name;
      }

      this.setColumns();
    },

    setColumns() {
      localStorage.setItem("columns", JSON.stringify(this.columns));
    },

    initColumns() {
      const storedColumns = localStorage.getItem("columns");

      if (storedColumns) {
        const parsedColumns = JSON.parse(storedColumns);
        this.columns = parsedColumns;
      } else {
        this.setColumns();
      }
    },
  },

  getters: {
    getColumns: (state) => {
      return state.columns;
    },

    getColumnIndex: (state) => (columnId) => {
      const columnIndex = state.columns.findIndex(column => column.id === columnId);
      return columnIndex
    },

    getCardIndex: (state) => (cardsList, cardId) => {
      const cardIndex = cardsList.findIndex(card => card.id === cardId);
      return cardIndex
    }
  },
});
