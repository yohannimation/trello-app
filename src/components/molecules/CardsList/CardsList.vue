<script setup lang="ts">
  // Basic import
  import { computed } from 'vue'
  import { useCardsStore } from '@/stores/cards'

  // Components
  import CardForm from '../CardForm/CardForm.vue'

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

  // Functions
  const startDrag = (event, card) => {
    const stringifiedCard = JSON.stringify(card)

    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('card', stringifiedCard)
  }
</script>

<template>
  <ul class="cardList">
    <li
      v-for="card in cardsData"
      :key="card.id"
      draggable="true"
      @dragstart="startDrag($event, card)"
    >
      <CardForm
        :id="card.id"
        :columnId="card.columnId"
        :name="card.name"
        :content="card.content"
        :color="card.color"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .cardList {
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style: none;

    ul {
      padding: 0;
    }
  }
</style>
