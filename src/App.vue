<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import { store } from "./data/store";

export default {
  components: {
    Header,
    Main,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="content-wrapper w-100">
      <Header />
      <Main />
    </div>

    <div class="d-none d-lg-block map-wrapper">Mappa</div>
  </div>
</template>

<style lang="scss">
@use "./assets/scss/main.scss";

.map-wrapper {
  background-color: aquamarine;
  height: 100vh;
  width: 40%;
  flex-shrink: 0;
}
</style>
