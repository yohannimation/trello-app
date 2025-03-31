<script setup lang="ts">
  // Basic import
  import { ref, useTemplateRef, onMounted } from 'vue'
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import Column from '../../organisms/Column/Column.vue'

  // Interface
  import type ColumnsListInterface from './ColumnsList.interface'

  // Setup the store
  const storeColumns = useColumnsStore()
  storeColumns.getColumns()

  // Functions
  const addColumn = () => {
    storeColumns.addColumns("Change me")
  }
</script>

<template>
  <div class="container">
    <InputButton
      class="container-addButton"
      label="Add column"
      @click="addColumn"
    />
    <ul class="container-columnList">
      <li v-for="column in storeColumns.columns">
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
