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
    color: map-get($colors, dark);
    background-color: $inputBackground;
    border: none;
    border-radius: map-get($borderRadius, full);
    font-family: "Comfortaa", sans-serif;
    font-size: .9rem;
    cursor: text;
    transition: $transition;
  }

  input:focus {
    background-color: white;
  }

  input:disabled {
    cursor: default;
    opacity: .5;
  }
</style>