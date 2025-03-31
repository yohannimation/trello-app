<script setup lang="ts">
  import type { InputLabelInterface } from './InputLabel.interface.ts';

  const props = defineProps<InputLabelInterface>()
</script>

<template>
  <label :for="uniqLabel">{{ label }}</label>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  label {
    cursor: pointer;
  }
</style>