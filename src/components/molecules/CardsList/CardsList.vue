<script setup lang="ts">
  // Basic import
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import CardForm from '../CardForm/CardForm.vue'

  // Interface
  import type { CardsListInterface } from './CardsList.interface.ts'

  // Setup the store
  const ColumnsStore = useColumnsStore()

  // Props
  const props = defineProps<{
    columnId: number;
    cardsList: CardsListInterface;
  }>()
</script>

<template>
  <ul class="cardList">
    <li v-for="card in cardsList" :key="card.id">
      <CardForm
        :columnId="columnId"
        :card="card"
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
