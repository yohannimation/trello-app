<script setup lang="ts">
  import { ref, useTemplateRef, onMounted } from 'vue'
  import Column from '../../organisms/Column/Column.vue'

  import type ColumnsListInterface from './ColumnsList.interface'

  const props = defineProps<{
    columnsList?: ColumnsListInterface;
  }>()

  const { columnsList } = props
</script>

<template>
  <ul class="columnList">
    <li v-for="column in columnsList">
      <Column
        :column="column"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .columnList {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    border-radius: $borderRadius;
  }
</style>
