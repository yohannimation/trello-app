<script setup lang="ts">
  // Basic import
  import { ref, useTemplateRef, onMounted } from 'vue'
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import CardForm from '../CardForm/CardForm.vue'

  // Interface
  import type { CardListInterface } from './CardList.interface.ts'

  // Setup the store
  const storeColumns = useColumnsStore()

  // Props
  const props = defineProps<{
    columnId: number;
    cardsList: CardListInterface;
  }>()

  // Variables
  const {
    cards,
    columnId
  } = props

  // Functions
  const saveCard = (updatedCard) => {
    storeColumns.updateCard(
      columnId,
      updatedCard.id,
      updatedCard.title,
      updatedCard.content,
    )
  }
</script>

<template>
  <ul class="cardList">
    <li v-for="card in cardsList">
      <CardForm
        :columnId="columnId"
        :card="card"
        :onSave="saveCard"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .cardList {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
    padding: 0;
    list-style: none;
  }
</style>
