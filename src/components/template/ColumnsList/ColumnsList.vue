<script setup lang="ts">
  // Basic import
  import { useColumnsStore } from '@/stores/columns'
  import { useCardsStore } from '@/stores/cards'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import Column from '../../organisms/Column/Column.vue'

  // Interface
  import type { CardInterface } from '@/stores/card.interface'

  // Setup the store
  const columnsStore = useColumnsStore()
  const cardsStore = useCardsStore()

  // Variables
  const variableToUppercase: string = "Add column"

  // Functions
  const onDrop = (event, columnId) => {
    const stringifiedCard = event.dataTransfer.getData('card')
    var cardData: CardInterface = JSON.parse(stringifiedCard)

    cardsStore.updateCard({ ...cardData, columnId: columnId })
  }
  const uppercase = (text: string) => {
    return text.toUpperCase()
  }
</script>

<template>
  <ul class="container-list">
    <li
      v-for="(column) in columnsStore.columns"
      :key="column.id"
      @drop="onDrop($event, column.id)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Column
        :id="column.id"
        :name="column.name"
      />
    </li>
    <li class="container-list-default-column">
      <InputButton
        class="container-addButton"
        label="addColumnButton"
        @click="columnsStore.addColumn()"
      >
        {{ uppercase(variableToUppercase) }}
      </InputButton>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .container-list {
    display: flex;
    gap: $columnsPadding;
    margin: 0;
    padding: $columnsPadding;
    height: calc(100% - 2rem);
    background-color: $columnsBackground;
    box-shadow: $columnsBoxShadow;
    border-radius: map-get($borderRadius, xl);
    list-style: none;
    overflow: scroll;

    &-default-column {
      width: $columnWidth;
      height: 66px;

      button {
        padding: $columnPadding;
        width: $columnWidth;
        height: 100%;
        background-color: $columnBackground;
        border-radius: map-get($borderRadius, l);
        font-size: 1.1rem;
        font-weight: 800;
        color: map-get($colors, white);
        text-align: left;
      }
    }
  }
</style>
