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
    :id="uniqLabel"
    :name="uniqLabel"
    type="text"
    :value
    :disabled
    @blur="setValue"
  />
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  input {
    padding: $inputPadding;
    border: none;
    border-radius: $borderRadius;
    cursor: text;
  }

  input:disabled {
    cursor: default;
  }
</style>