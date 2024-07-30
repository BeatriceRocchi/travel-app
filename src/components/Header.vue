<script>
import { store } from "../data/store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <h1>CIao</h1>
  <header>{{ store.counter }}</header>
</template>

<style lang="scss" scoped></style>
