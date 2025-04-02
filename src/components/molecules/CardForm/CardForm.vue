<script setup lang="ts">
  // Basic import
  import { ref } from 'vue'
  import { useColumnsStore } from '@/stores/columns'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputTextLabel from '../InputTextLabel/InputTextLabel.vue'
  import InputTextareaLabel from '../InputTextareaLabel/InputTextareaLabel.vue'

  // Interface
  import type { CardFormInterface } from './CardForm.interface.ts'

  // Setup the store
  const ColumnsStore = useColumnsStore()

  // Props
  const props = defineProps<{
    columnId: number;
    card: CardFormInterface;
    onSave?: () => void;
  }>()

  // Variables
  let cardData: CardFormInterface = props.card
  let displaySaveButton = ref<boolean>(false)


  // Functions
  const setTitle = (title) => {
    cardData.title = title
  }
  const setContent = (content) => {
    cardData.content = content
  }
  const saveData = () => {
    ColumnsStore.updateCard(
      props.columnId,
      cardData.id,
      cardData.title,
      cardData.content,
    )
    displaySaveButton.value = false
  }
</script>

<template>
  <form class="formGroup">
    <InputButton
      label="X"
      @click="
        ColumnsStore.deleteCard(
          columnId,
          cardData.id
        )
      "
    />
    <InputTextLabel
      label="Card title"
      :value="cardData.title"
      :onFocusOut="setTitle"
      @click="displaySaveButton = true"
    />
    <InputTextareaLabel
      label="Card content"
      :value="cardData.content"
      :onFocusOut="setContent"
      @click="displaySaveButton = true"
    />
    <InputButton
      label="Save"
      @click="saveData"
      v-if="displaySaveButton"
    />
  </form>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .formGroup {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: $cardPadding;
    background-color: $cardBackground;
    border-radius: $cardBorderRadius;
  }
</style>
