<template>
  <div class="container" :class="{ small: size==='small', full: size ==='full' }">
    <input v-model="value" :type="type ? type : 'text'" placeholder="&nbsp" maxlength="128">
    <label>{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['type', 'modelValue', 'label', 'size'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get(): string {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>

<style scoped>
.container {
  display: inline-block;
  position: relative;
  height: 57px;
  padding: 15px 2px 2px 0;
  width: 250px;
}

.container.small {
  width: 150px;
}

.container.full {
  width: auto;
}

input {
  height: 42px;
  font-size: 14px;
  line-height: inherit;
  color: inherit;
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
  font-family: 'Roboto', sans-serif;
}

input:focus {
  box-shadow: rgb(46 170 220 / 70%) 0px 0px 0px 1px inset, rgb(46 170 220 / 40%) 0px 0px 0px 2px;
}

label {
  position: absolute;
  pointer-events: none;
  color: var(--grey);
  transition: left .1s ease-in-out;
  font-size: 14px;
  background: var(--background);
  padding: 0 3px;
  top: 4px;
  left: 8px;
}

input:placeholder-shown + label {
  top: 27px;
  left: 0;
  padding: 0 0 0 6px;
  background: transparent;
}

input:focus + label {
  padding: 0 3px;
  top: 4px;
  left: 8px;
  color: var(--orange);
  background: var(--background);
}
</style>
