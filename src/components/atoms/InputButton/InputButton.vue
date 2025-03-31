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
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  button {
    padding: $buttonPadding;
    border: none;
    border-radius: $borderRadius;
    cursor: pointer;
  }

  button:disabled {
    cursor: default;
  }
</style>