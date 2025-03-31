<script setup lang="ts">
  // Basic import
  import { ref, useTemplateRef, onMounted } from 'vue'
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputTextLabel from '../../molecules/InputTextLabel/InputTextLabel.vue'
  import CardsList from '../../molecules/CardsList/CardsList.vue'

  // Interface
  import type ColumnInterface from './Column.interface.ts'

  // Setup the store
  const storeColumns = useColumnsStore()

  // Props
  const props = defineProps<{
    column?: ColumnInterface;
  }>()

  // Variables
  const {
    id,
    name,
    cardsList
  } = props.column
  const formOpen = ref(false)
  const nameValue = ref(name)

  // Functions
  const addCard = () => {
    storeColumns.addCard(id)
  }
  const saveColumnName = () => {
    storeColumns.updateColumn(id, nameValue)
    formOpen.value = false
  }
  const setNewNameValue = (columnName) => {
    nameValue.value = columnName
  }
</script>

<template>
  <div class="column">
    <form v-if="formOpen" class="column-nameForm">
      <InputTextLabel
        label="Column name"
        :onFocusOut="setNewNameValue"
        :value="nameValue"
        @click="displaySaveButton = true"
      />
      <InputButton label="Save" @click="saveColumnName"></InputButton>
    </form>
    <h1
      v-else
      class="column-title"
      @click="formOpen = true"
    >{{ nameValue }}</h1>

    <CardsList
      :columnId="id"
      :cardsList="cardsList"
    />
    <InputButton label="Add card" @click="addCard"></InputButton>
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .column {
    display: flex;
    flex-direction: column;
    padding: $columnPadding;
    background-color: $columnBackground;
    border-radius: $columnBorderRadius;

    &-nameForm {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &-title {
      margin: 0;
    }
  }

</style>
