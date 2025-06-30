<script setup lang="ts">
  // Basic import
  import { useSlots, ref } from 'vue'

  // Components
  import { Icon } from '@iconify/vue'
  import InputButton from '../../atoms/InputButton/InputButton.vue'

  // Variables
  const slots = useSlots()
  const modal = ref(null)

  // Functions
  const openModal = () => {
    if (modal.value) {
      modal.value.showModal()
    }
  }
  const closeModal = () => {
    if (modal.value) {
      modal.value.close()
    }
  }
</script>

<template>
  <InputButton
    label="open-modal-button"
    :onClick="openModal"
  >
    <slot name="open-modal-button"></slot>
  </InputButton>

  <dialog ref="modal" @cancel.prevent="closeModal" class="modal">
    <header class="modal-header">
      <div class="modal-header-title"><slot name="title"></slot></div>
      <InputButton
        label="close-modal-button"
        :onClick="closeModal"
      >
        <Icon
          icon="hugeicons:cancel-01"
          width="24"
        />
      </InputButton>
    </header>
    <div class="modal-content">
      <slot name="content"></slot>
    </div>
    <footer class="modal-footer">
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .modal {
    padding: 1.5rem;
    width: 50%;
    height: 50%;
    background-color: map-get($colors, white);
    border-radius: map-get($borderRadius, xl);
    border: none;
    font-family: "Comfortaa", sans-serif;
    overflow: hidden;

    &-header {
      display: grid;
      grid-template-columns: auto 50px;
      gap: 20px;
      width: 100%;
      height: 50px;

      &-title {
        width: 100%;
      }

      button {
        width: 50px;
        height: 50px;
        border-radius: map-get($borderRadius, l);
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 10px 0;
      padding: 10px 0;
      height: 70%;
      overflow: scroll;
    }

    &-footer {
      height: 50px;

      button {
        width: 50px;
        height: 50px;
        border-radius: map-get($borderRadius, l);
      }
    }
  }
</style>
