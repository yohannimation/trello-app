<script setup lang="ts">
  import type { InputColorInterface } from './InputColor.interface.ts';

  const props = defineProps<InputColorInterface>()

  const setValue = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }
</script>

<template>
    <label :for="label" class="colorpicker-container">
      Set color
      <input
        :id="label"
        :name="label"
        type="color"
        :value
        :disabled
        @change="setValue"
      />
  </label>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .colorpicker-container {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: .5rem;
    padding: $inputPadding;
    background-color: white;
    border: none;
    border-radius: $inputBorderRadius;
    cursor: pointer;
    transition: $transition;
  }

  input {
    background-color: white;
    border: none;
  }

  input:disabled {
    cursor: default;
  }
</style>