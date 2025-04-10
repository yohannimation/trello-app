<script setup lang="ts">
  // Basic import
  import { watch } from 'vue'
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import Column from '../../organisms/Column/Column.vue'

  // Setup the store
  const columnsStore = useColumnsStore()
  columnsStore.initColumns()
</script>

<template>
  <div class="container">
    <InputButton
      class="container-addButton"
      label="Add column"
      @click="columnsStore.addColumn()"
    />
    <ul class="container-columnList">
      <li
        v-for="(column) in columnsStore.columns"
        :key="column.id"
      >
        <Column
          :id="column.id"
          :name="column.name"
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
    border-radius: map-get($borderRadius, xl);
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
