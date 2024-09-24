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
      locations: [], // Array che conterrà le coordinate delle posizioni
    });

    // Iterazione su tutte le tappe del viaggio presenti nello store
    for (let i = 0; i < store.USATrip.length; i++) {
      for (let j = 0; j < store.USATrip[i].stops.length; j++) {
        // Estrazione latitudine e longitudine di ciascuna tappa
        let latStop = store.USATrip[i].stops[j].lat;
        let longStop = store.USATrip[i].stops[j].long;

        // Creazione oggetto location con latitudine e longitudine
        let location = { lat: latStop, lng: longStop };

        store.locationsName.push(store.USATrip[i].stops[j].title);

        // Aggiunta della location all'array reattivo delle locations
        state.locations.push(location);
      }
    }

    // Funzione che inserisce i marker sulla mappa
    const insertLocs = (map) => {
      const tomtom = window.tt;

      // Iterazione su tutte le locations salvate, creazione di un elemento DOM per il marker e creazione del marker e del relativo popup utilizzando l'elemento creato e le coordinate della posizione
      state.locations.forEach(function (location, i) {
        let element = document.createElement("div");
        element.classList.add("marker");
        element.innerHTML = `
        <div class="col-md-1 d-flex flex-column align-items-center stop-id-box">
          <i class="fa-solid fa-location-pin"></i>
          <p class="id mt-2">${i + 1}</p>
        </div>`;
        element.style.fontSize = "1rem";

        var marker = new tomtom.Marker({ element: element })
          .setLngLat(location)
          .addTo(map);

        const popup = new tt.Popup({
          anchor: "top",
          className: "custom-popup",
        }).setHTML(`<b>${store.locationsName[i]}</b>`);
        marker.setPopup(popup).togglePopup();
      });
    };

    onMounted(() => {
      const tt = window.tt;

      // Coordinate predefinite per il focus della mappa (prima tappa)
      let focus = { lat: 37.79, lng: -122.41 };

      // Se ci sono tappe salvate nel localStorage, estrazione dell'ultima tappa selezionata per impostare il focus
      if (localStorage.checkedStops) {
        store.checkedStops = localStorage.checkedStops.split(",");

        let focusStop = store.checkedStops.pop();

        for (let i = 0; i < store.USATrip.length; i++) {
          for (let j = 0; j < store.USATrip[i].stops.length; j++) {
            if (store.USATrip[i].stops[j].title === focusStop) {
              let latFocusStopLat = store.USATrip[i].stops[j].lat;
              let longFocusStopLat = store.USATrip[i].stops[j].long;

              focus = { lat: latFocusStopLat, lng: longFocusStopLat };
            }
          }
        }
      }

      // Creazione dell'istanza della mappa TomTom
      var map = tt.map({
        key: "8IsdBWbimG2u5UKipp1qOpjv5WEgaEzY",
        container: mapRef.value,
        center: focus,
        zoom: 14,
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
