<script setup lang="ts">
  import { ref, useTemplateRef, onMounted } from 'vue'
  import CardForm from '../CardForm/CardForm.vue'

  import type { CardListInterface } from './CardList.interface.ts'

  const props = defineProps<{
    cards?: CardListInterface;
  }>()

  const { cards } = props

  const saveCard = (updatedCard) => {
    cards[updatedCard.id] = updatedCard
  }
</script>

<template>
  <ul>
    <li v-for="card in cards">
      <CardForm
        :card="card"
        :onSave="saveCard"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .formGroup {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
</style>
