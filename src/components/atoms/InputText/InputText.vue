<script setup lang="ts">
  import type { InputTextInterface } from './InputText.interface.ts';

  const props = defineProps<InputTextInterface>()

  const setValue = (e) => {
    if (props.onFocusOut) {
      props.onFocusOut(e.target.value);
    }
  }
</script>

<template>
  <input
  :id="label"
    :name="label"
    type="text"
    :value
    :placeholder="label"
    :disabled
    @blur="setValue"
  />
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  input {
    padding: $inputPadding;
    background-color: transparent;
    border: none;
    border-radius: $inputBorderRadius;
    cursor: text;
    transition: $transition;
  }

  input:hover, input:focus {
    background-color: white;
  }

  input:disabled {
    cursor: default;
  }
</style>