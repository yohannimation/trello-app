// Basic import
import { defineStore } from "pinia";
import { useCardsStore } from '@/stores/cards'

// Interface
import { ColumnInterface } from './column.interface'

export const useColumnsStore = defineStore("columns", {
  state: () => ({
    columns: [] as ColumnInterface[],
  }),

  actions: {
    addColumn() {
      const columnData: ColumnInterface = {
        id: Date.now(),
        name: ""
      }

      this.columns.push(columnData)
      this.persist()
    },

    deleteColumn(columnId: number) {
      const cardsStore = useCardsStore()
      cardsStore.deleteCardsFromColumnId(columnId)

      const columnIndex = this.getColumnIndexById(columnId)
      this.columns.splice(columnIndex, 1)

      this.persist()
    },

    updateColumn(columnData: ColumnInterface) {
      const columnIndex = this.getColumnIndexById(columnData.id)
      if (columnIndex >= 0) {
        this.columns[columnIndex] = columnData
      }

      this.persist()
    },

    initColumns() {
      const storedColumns = localStorage.getItem("columns")

      if (storedColumns) {
        const parsedColumns = JSON.parse(storedColumns)
        this.columns = parsedColumns;
      } else {
        localStorage.setItem("columns", JSON.stringify(this.columns))
      }
    },

    persist() {
      localStorage.setItem("columns", JSON.stringify(this.columns))
    }
  },

  getters: {
    getColumns: (state) => {
      return state.columns
    },

    getColumnIndexById: (state) => (columnId: number) => {
      const columnIndex = state.columns.findIndex((column) => column.id === columnId)
      return columnIndex
    },
  },
});
