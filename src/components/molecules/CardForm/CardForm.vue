<script setup lang="ts">
  // Basic import
  import { ref, useTemplateRef, onMounted } from 'vue'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputTextLabel from '../InputTextLabel/InputTextLabel.vue'
  import InputTextareaLabel from '../InputTextareaLabel/InputTextareaLabel.vue'

  // Interface
  import type { CardFormInterface } from './CardForm.interface.ts'

  // Props
  const props = defineProps<{
    columnId: number
    card: CardFormInterface;
    onSave?: () => void;
  }>()

  // Variables
  let cardData: CardFormInterface;
  if (props.card) {
    cardData = props.card
  }
  let displaySaveButton: bool = ref(false)

  // Functions
  const setTitle = (title) => {
    cardData.title = title
  }
  const setContent = (content) => {
    cardData.content = content
  }
  const saveData = () => {
    displaySaveButton.value = false
    if (props.onSave) {
      props.onSave(cardData);
    }
  }
</script>

<template>
  <form class="formGroup">
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
    <InputButton label="Save" @click="saveData" v-if="displaySaveButton"></InputButton>
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
