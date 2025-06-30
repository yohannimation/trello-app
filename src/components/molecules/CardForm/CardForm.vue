<script setup lang="ts">
  // Basic import
  import { onBeforeUnmount, ref } from 'vue'
  import { useCardsStore } from '@/stores/cards'
  import confetti from 'canvas-confetti'

  // Components
  import { Icon } from '@iconify/vue'
  import InputButton from '../../atoms/InputButton/InputButton.vue'
  import InputText from '../../atoms/InputText/InputText.vue'
  import InputColor from '../../atoms/InputColor/InputColor.vue'
  import InputTextarea from '../../atoms/InputTextarea/InputTextarea.vue'
  import Modal from '../Modal/Modal.vue'

  // Interface
  import type { CardInterface } from '../../../stores/card.interface'

  // Setup the store
  const cardStore = useCardsStore()

  // Props
  const props = defineProps<CardInterface>()

  // Variables
  var cardData = ref<CardInterface>({
    id: props.id,
    columnId: props.columnId,
    name: props.name,
    content: props.content,
    color: props.color
  })
  const cardHtmlId = `card-id-${cardData.value.id}`
  const isADeletion = ref(false)

  // Functions
  const setTitle = (newName) => {
    cardData.value.name = newName
    updateCardData()
  }
  const setContent = (newContent) => {
    cardData.value.content = newContent
    updateCardData()
  }
  const setColor = (newColor) => {
    cardData.value.color = newColor
    updateCardData()
  }
  const updateCardData = () => {
    cardStore.updateCard(cardData.value)
  }
  const deleteCardData = () => {
    isADeletion.value = true
    cardStore.deleteCard(cardData.value.id)
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
        colors: [cardData.value.color]
      })
    }
  })
</script>

<template>
  <form class="form" :id="cardHtmlId" :style="{ backgroundColor: cardData.color }">
    <div class="form-header">
      <p class="form-header-name">{{ cardData.name ? cardData.name : "Card name" }}</p>
      <Modal>
        <template #open-modal-button>
          <Icon icon="hugeicons:pencil-edit-02" width="18" />
        </template>
        <template #title>
          <InputText
            label="Card name"
            :value="cardData.name"
            :onFocusOut="setTitle"
          />
        </template>
        <template #content>
          <InputTextarea
            label="Card content"
            :value="cardData.content"
            :onFocusOut="setContent"
          />
          <InputColor
            label="Card color"
            :value="cardData.color"
            :onChange="setColor"
          />
        </template>
        <template #footer>
          <InputButton
            label="deleteCardButton"
            @click="deleteCardData"
          >
            <Icon icon="hugeicons:delete-02" width="24" />
          </InputButton>
        </template>
      </Modal>
    </div>
    <p class="form-content">{{ cardData.content ? cardData.content : "No content" }}</p>
  </form>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .form {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin-top: $cardGap;
    padding: $cardPadding;
    border-radius: map-get($borderRadius, s);
    font-family: "Comfortaa", sans-serif;

    &-header {
      display: grid;
      grid-template-columns: 80% calc(20% - 11px);
      gap: 10px;
      height: 45px;

      &-name {
        margin: 0;
        padding: 13.5px 10px;
        background-color: $inputBackground;
        border-radius: map-get($borderRadius, xs);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &-content {
      margin: 0;
      padding: 10px;
      max-height: 100px;
      background-color: $inputBackground;
      border-radius: map-get($borderRadius, xs);
      overflow: scroll;
    }

    input {
      width: calc(100% - calc(2 * $inputPadding));
      height: calc(100% - calc(2 * $inputPadding));
      border-radius: map-get($borderRadius, l);
      font-weight: 600;
    }

    textarea {
      width: calc(100% - calc(2 * $inputPadding));
      border-radius: map-get($borderRadius, l);
    }

    button {
      width: 50px;
      height: 50px;
      border-radius: map-get($borderRadius, l);
    }

    .colorpicker-container {
      border-radius: map-get($borderRadius, l);
    }
  }
</style>
