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
      Color
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
    background-color:  $inputBackground;
    border: none;
    font-family: "Comfortaa", sans-serif;
    font-size: .9rem;
    cursor: pointer;
  }

  input {
    background-color: transparent;
    border: none;
  }

  input:disabled {
    cursor: default;
  }
</style>