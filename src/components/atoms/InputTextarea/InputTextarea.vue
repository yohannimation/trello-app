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
    :id="uniqLabel"
    :name="uniqLabel"
    :value
    :disabled
    @blur="setValue"
  ></textarea>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  textarea {
    padding: $inputPadding;
    border: none;
    border-radius: $borderRadius;
    cursor: text;
  }

  textarea:disabled {
    cursor: default;
  }
</style>