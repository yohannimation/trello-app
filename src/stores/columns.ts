import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useColumnsStore = defineStore('columns', () => {
  const columns = ref([])

  function addCard(columnId: number) {
    columns.value[columnId].cardsList.push({
      id: columns.value[columnId].cardsList.length,
      title: "",
      content: ""
    })

    setColumns()
  }

  function addColumns(columnsName: string) {
    columns.value.push({
      id: columns.value.length,
      name: columnsName,
      cardsList: []
    })

    setColumns()
  }

  function getColumns() {
    const storedColumns = localStorage.getItem('columns')

    if (storedColumns) {
      const parsedColumns = JSON.parse(storedColumns)
      columns.value = parsedColumns
    } else {
      setColumns()
    }
  }

  function setColumns() {
    localStorage.setItem('columns', JSON.stringify(columns.value))
  }

  function updateCard(
    columnId: number,
    cardId: number,
    cardTitle: string,
    cardContent: string
  ) {
    columns.value[columnId].cardsList[cardId].title = cardTitle
    columns.value[columnId].cardsList[cardId].content = cardContent

    setColumns()
  }

  function updateColumn(
    columnId: number,
    name: string
  ) {
    columns.value[columnId].name = name

    setColumns()
  }

  return {
    columns,
    addCard,
    addColumns,
    getColumns,
    updateCard,
    updateColumn
  }
})