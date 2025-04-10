<script setup lang="ts">
  // Basic import
  import { useColumnsStore } from '@/stores/columns'
  import { useCardsStore } from '@/stores/cards'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputText from '../../atoms/InputText/InputText.vue'
  import CardsList from '../../molecules/CardsList/CardsList.vue'

  // Interface
  import { ColumnInterface } from '../../../stores/column.interface'

  // Setup the store
  const columnsStore = useColumnsStore()
  const cardsStore = useCardsStore()

  // Props
  const props = defineProps<ColumnInterface>()

  // Variables
  var columnData: ColumnInterface = {
    id: props.id,
    name: props.name
  }

  // Functions
  const setNewNameValue = (columnName) => {
    columnData.name = columnName
    columnsStore.updateColumn(columnData)
  }
</script>

<template>
  <div class="column">
    <div class="column-header">
      <InputText
        label="Column name"
        :value="columnData.name"
        :onFocusOut="setNewNameValue"
      />
      <InputButton label="X" @click="columnsStore.deleteColumn(columnData.id)" />
    </div>

    <CardsList
      :columnId="columnData.id"
    />
    <InputButton label="Add card" @click="cardsStore.addCard(columnData.id)" />
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .column {
    display: flex;
    flex-direction: column;
    padding: $columnPadding;
    max-width: 250px;
    background-color: $columnBackground;
    border-radius: map-get($borderRadius, l);

    &-header {
      display: grid;
      grid-template-columns: 80% calc(20% - 11px);
      gap: 10px;

      input {
        border-radius: map-get($borderRadius, s);
        font-size: 1.1rem;
        font-weight: 800;
      }
    }

    button {
      border-radius: map-get($borderRadius, s);
    }
  }
</style>
