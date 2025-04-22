<script setup lang="ts">
  import type { InputButtonInterface } from './InputButton.interface.ts';

  const props = defineProps<InputButtonInterface>()

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  }
</script>

<template>
  <button
    :id="label"
    :name="label"
    :disabled
    type="button"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: map-get($borderRadius, full);
    background-color: $inputBackground;
    color: darken($buttonBackground, 60);
    font-family: "Comfortaa", sans-serif;
    cursor: pointer;
    transition: $transition;
  }

  button:hover {
    background-color: white;
  }

  button:disabled {
    cursor: default;
    opacity: .5;
  }
</style>