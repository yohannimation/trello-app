<script setup lang="ts">
  // Basic import
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import Column from '../../organisms/Column/Column.vue'

  // Setup the store
  const ColumnsStore = useColumnsStore()
  ColumnsStore.initColumns()
</script>

<template>
  <div class="container">
    <InputButton
      class="container-addButton"
      label="Add column"
      @click="ColumnsStore.addColumns()"
    />
    <ul class="container-columnList">
      <li
        v-for="(column) in ColumnsStore.columns"
        :key="column.id"
      >
        <Column
          :column="column"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .container {
    display: flex;
    flex-direction: column;
    padding: $columnsPadding;
    background-color: $columnsBackground;
    border-radius: $columnsBorderRadius;
    overflow: scroll;

    &-addButton {
      max-width: 100px;
    }

    &-columnList {
      display: flex;
      gap: 15px;
      margin: 0;
      margin-top: 20px;
      padding: 0;
      list-style: none;
    }
  }
</style>
