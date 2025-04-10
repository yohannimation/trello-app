<script setup lang="ts">
  // Basic import
  import { onMounted } from 'vue'
  import { useColumnsStore } from '@/stores/columns'
  import { useCardsStore } from '@/stores/cards'

  // Components
  import ColumnsList from '../components/template/ColumnsList/ColumnsList.vue'

  onMounted(() => {
    const columnsStore = useColumnsStore()
    const cardsStore = useCardsStore()

    columnsStore.initColumns()
    cardsStore.initCards()
  })
</script>

<template>
  <ColumnsList />
</template>

<style scoped lang="scss">
</style>
