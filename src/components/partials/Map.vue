<template>
  <div id="map" ref="mapRef"></div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { store } from "../../data/store";

export default {
  name: "Map",

  data() {
    return {
      store,
    };
  },

  setup() {
    const mapRef = ref(null);

    const state = reactive({
      locations: [],
    });

    for (let i = 0; i < store.USATrip.length; i++) {
      for (let j = 0; j < store.USATrip[i].stops.length; j++) {
        let latStop = store.USATrip[i].stops[j].lat;
        let longStop = store.USATrip[i].stops[j].long;

        let location = { lat: latStop, lng: longStop };

        store.locationsName.push(store.USATrip[i].stops[j].title);

        state.locations.push(location);
      }
    }

    const insertLocs = (map) => {
      const tomtom = window.tt;

      state.locations.forEach(function (location, i) {
        var marker = new tomtom.Marker().setLngLat(location).addTo(map);
        const popup = new tt.Popup({ anchor: "top" }).setText(
          store.locationsName[i]
        );
        marker.setPopup(popup).togglePopup();
      });
    };

    onMounted(() => {
      const tt = window.tt;
      const focus = { lat: 37.79, lng: -122.41 };

      var map = tt.map({
        key: "8IsdBWbimG2u5UKipp1qOpjv5WEgaEzY",
        container: mapRef.value,
        center: focus,
        zoom: 15,
      });

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());

      // window.map = map;

      insertLocs(map);
    });

    return {
      mapRef,
    };
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
