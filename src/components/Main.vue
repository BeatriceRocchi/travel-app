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
  <main>
    <div class="d-md-flex">
      <aside>Aside</aside>
      <div class="travel-wrapper">
        <div v-for="(day, label) in store.USATrip" :key="label">
          <h4>{{ label }}</h4>
          <ul>
            <li v-for="(stop, id) in day" :key="id">
              {{ stop.title }} {{ id + 1 }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
aside {
  background-color: greenyellow;
  min-width: 200px;
  overflow-y: auto;
}

.travel-wrapper {
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 20px 30px;
}
</style>
