<script setup lang="ts">
  // Basic import
  import { ref } from 'vue'
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
  var columnData = ref<ColumnInterface>({
    id: props.id,
    name: props.name
  })

  // Functions
  const setNewNameValue = (columnName) => {
    columnData.value.name = columnName
    columnsStore.updateColumn(columnData.value)
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
      <InputButton label="+" @click="cardsStore.addCard(columnData.id)" />
      <InputButton label="X" @click="columnsStore.deleteColumn(columnData.id)" />
    </div>

    <CardsList
      :columnId="columnData.id"
    />
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .column {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: $columnPadding;
    padding-top: 0;
    width: $columnWidth;
    height: fit-content;
    max-height: calc(100% - calc(2 * $columnPadding));
    background-color: $columnBackground;
    border-radius: map-get($borderRadius, l);
    overflow: scroll;
    transition: $transition;

    &-header {
      position: sticky;
      top: 0;
      display: grid;
      grid-template-columns: calc(100% - calc(2 * $columnButtonSize) - calc(2* $columnHeaderGap)) 38px 38px;
      gap: $columnHeaderGap;
      padding: $columnPadding 0 0 0;
      width: 100%;
      background-color: $columnBackground;

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
