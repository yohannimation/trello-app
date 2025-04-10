<script setup lang="ts">
  // Basic import
  import { computed } from 'vue'
  import { useCardsStore } from '@/stores/cards'

  // Components
  import CardForm from '../CardForm/CardForm.vue'

  // Interface
  import type { CardInterface } from '@/stores/card.interface'

  // Setup the store
  const cardsStore = useCardsStore()

  // Props
  const props = defineProps<{
    columnId: number
  }>()

  // Variables
  const cardsData = computed(() => {
    return cardsStore.getCardsForColumnId(props.columnId)
  })
</script>

<template>
  <ul class="cardList">
    <li v-for="card in cardsData" :key="card.id">
      <CardForm
        :id="card.id"
        :columnId="card.columnId"
        :name="card.name"
        :content="card.content"
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
