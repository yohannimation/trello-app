<script setup lang="ts">
  import { ref, useTemplateRef, onMounted } from 'vue'
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputTextGroup from '../InputTextLabel/InputTextLabel.vue'
  import InputTextareaGroup from '../InputTextareaLabel/InputTextareaLabel.vue'

  import type { CardFormInterface } from './CardForm.interface.ts'

  const props = defineProps<{
    card?: CardFormInterface;
    onSave?: () => void;
  }>()

  let cardData: CardFormInterface;
  if (props.card) {
    cardData = props.card
  } else {
    cardData = {
      id: 0,
      title: "",
      content: ""
    }
  }

  let displaySaveButton: bool = ref(false)

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
    <InputTextGroup
      label="Card title"
      :value="cardData.title"
      :onFocusOut="setTitle"
      @click="displaySaveButton = true"
    />
    <InputTextareaGroup
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
  }
</style>
