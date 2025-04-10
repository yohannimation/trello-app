<script setup lang="ts">
  // Basic import
  import { useCardsStore } from '@/stores/cards'

  // Components
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputText from '../../atoms/InputText/InputText.vue'
  import InputTextarea from '../../atoms/InputTextarea/InputTextarea.vue'

  // Interface
  import type { CardInterface } from '../../../stores/card.interface'

  // Setup the store
  const cardStore = useCardsStore()

  // Props
  const props = defineProps<CardInterface>()

  // Variables
  var cardData: CardInterface = {
    id: props.id,
    columnId: props.columnId,
    name: props.name,
    content: props.content
  }

  // Functions
  const setTitle = (newName) => {
    cardData.name = newName
    updateDeployCardData()
  }
  const setContent = (newContent) => {
    cardData.content = newContent
    updateDeployCardData()
  }
  const updateDeployCardData = () => {
    cardStore.updateCard(cardData)
  }
</script>

<template>
  <form class="form">
    <div class="form-header">
      <InputText
      label="Card title"
      :value="cardData.name"
      :onFocusOut="setTitle"
      />
      <InputButton
        label="X"
        @click="cardStore.deleteCard(cardData.id)"
      />
    </div>
    <InputTextarea
      label="Card content"
      :value="cardData.content"
      :onFocusOut="setContent"
    />
  </form>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .form {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: $cardPadding;
    background-color: $cardBackground;
    border-radius: map-get($borderRadius, s);

    &-header {
      display: grid;
      grid-template-columns: 80% calc(20% - 11px);
      gap: 10px;

      input {
        border-radius: map-get($borderRadius, xs);
        font-weight: 600;
      }
    }

    textarea {
      min-height: 50px;
      background-color: white;
      border-radius: map-get($borderRadius, xs);
    }

    button {
      border-radius: map-get($borderRadius, xs);
    }
  }
</style>
