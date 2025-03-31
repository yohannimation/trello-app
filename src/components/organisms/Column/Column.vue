<script setup lang="ts">
  import { ref, useTemplateRef, onMounted } from 'vue'
  import CardsList from '../../molecules/CardsList/CardsList.vue'

  import type ColumnInterface from './Column.interface.ts'

  const props = defineProps<{
    column?: ColumnInterface;
  }>()

  const { name, cardsList } = props.column
</script>

<template>
  <div class="column">
    <h1>{{ name }}</h1>
    <CardsList
      :cards="cardsList"
    />
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .column {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: 1rem;
    background-color: green;
    border-radius: $borderRadius;
  }
</style>
