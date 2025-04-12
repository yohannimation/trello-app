<script setup lang="ts">
  // Basic import
  import { onBeforeUnmount, ref } from 'vue'
  import { useCardsStore } from '@/stores/cards'
  import confetti from 'canvas-confetti'

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
  const cardHtmlId = `card-id-${cardData.id}`
  const isADeletion = ref(false)

  // Functions
  const setTitle = (newName) => {
    cardData.name = newName
    updateCardData()
  }
  const setContent = (newContent) => {
    cardData.content = newContent
    updateCardData()
  }
  const updateCardData = () => {
    cardStore.updateCard(cardData)
  }
  const deleteCardData = () => {
    isADeletion.value = true
    cardStore.deleteCard(cardData.id)
  }
  onBeforeUnmount(() => {
    if (isADeletion.value) {
      const cardElement = document.getElementById(cardHtmlId)
      const rect = cardElement.getBoundingClientRect()

      // Get the center coordinate of the card element
      const centerX = rect.left + rect.width / 2 + window.scrollX;
      const centerY = rect.top + rect.height / 2 + window.scrollY;

      // Get the ratio between 0 - 1
      const centerXRatio = centerX / window.innerWidth;
      const centerYRatio = centerY / window.innerHeight;

      confetti({
        startVelocity: 15,
        spread: 360,
        ticks: 50,
        particleCount: 250,
        origin: {
          x: centerXRatio,
          y: centerYRatio
        },
        colors: ["#7f7f7f"]
      })
    }
  })
</script>

<template>
  <form class="form" :id="cardHtmlId">
    <div class="form-header">
      <InputText
      label="Card title"
      :value="cardData.name"
      :onFocusOut="setTitle"
      />
      <InputButton
        label="X"
        @click="deleteCardData"
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
