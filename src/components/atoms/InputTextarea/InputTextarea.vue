<script setup lang="ts">
  import type { InputTextareaInterface } from './InputTextarea.interface.ts';

  const props = defineProps<InputTextareaInterface>()

  const setValue = (e) => {
    if (props.onFocusOut) {
      props.onFocusOut(e.target.value);
    }
  }
</script>

<template>
  <textarea
    :id="label"
    :name="label"
    :value
    :placeholder="label"
    :disabled
    @blur="setValue"
  ></textarea>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  textarea {
    padding: $inputPadding;
    min-height: 50px;
    background-color: $inputBackground;
    border: none;
    font-family: "Comfortaa", sans-serif;
    font-size: .9rem;
    cursor: text;
    resize: vertical;
    transition: $transition;
  }

  textarea:focus {
    background-color: white;
  }

  textarea:disabled {
    cursor: default;
  }
</style>