<script setup lang="ts">
  import InputText from '../../atoms/InputText/InputText.vue'
  import InputLabel from '../../atoms/InputLabel/InputLabel.vue'

  import type { InputTextLabelInterface } from './InputTextLabel.interface.ts'

  const props = defineProps<InputTextLabelInterface>()

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
    <InputText
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