<script setup lang="ts">
  import InputTextarea from '../../atoms/InputTextarea/InputTextarea.vue'
  import InputLabel from '../../atoms/InputLabel/InputLabel.vue'

  import type { InputTextareaLabelInterface } from './InputTextareaLabel.interface.ts'

  const props = defineProps<InputTextareaLabelInterface>()

  const { label, value, disabled } = props

  const uniqLabel = label + "_" + Math.round(Math.random() * 10000)

  const setValue = (returnedValue) => {
    if (props.onFocusOut) {
      props.onFocusOut(returnedValue);
    }
  }
</script>

<template>
  <div class="inputGroup">
    <InputLabel
      :label="label"
      :uniqLabel="uniqLabel"
    />
    <InputTextarea
      :label="label"
      :uniqLabel="uniqLabel"
      :value="value"
      :disabled="disabled"
      :onFocusOut="setValue"
    />
  </div>
</template>

<style scoped lang="scss">
  @use "@/styles/_variables.scss" as *;

  .inputGroup {
    display: flex;
    flex-direction: column;
  }
</style>