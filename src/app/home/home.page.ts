import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView!: MapView;
  userLocationGraphic!: Graphic;
  map!: Map;

  constructor() {}

  async ngOnInit() {
    this.map = new Map({
      basemap: 'topo-vector' // default basemap
    });

    this.mapView = new MapView({
      container: 'container',
      map: this.map,
      zoom: 8
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    this.map.add(weatherServiceFL);

    // Update marker to the specific coordinates
    const specificCoords = [43.24185173447681, -82.98467454625616];
    await this.updateUserLocationOnMap(specificCoords);
    this.mapView.center = this.userLocationGraphic.geometry as Point;

    // Optionally update location every 10 seconds
    // setInterval(this.updateUserLocationOnMap.bind(this), 10000);
  }

  // Commented out geolocation-related functions
  /*
  async getLocationService(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude]);
      });
    });
  }
  */

  async updateUserLocationOnMap(coords: number[]) {
    let geom = new Point({ latitude: coords[0], longitude: coords[1] });
    if (this.userLocationGraphic) {
      this.userLocationGraphic.geometry = geom;
    } else {
      this.userLocationGraphic = new Graphic({
        symbol: new SimpleMarkerSymbol({
          color: [226, 119, 40], // Color for the marker
          outline: { color: [255, 255, 255], width: 2 } // Outline color for the marker
        }),
        geometry: geom,
      });
      this.mapView.graphics.add(this.userLocationGraphic);
    }
  }

  changeBasemap(event: any) {
    const selectedBasemap = event.target.value;
    this.map.basemap = selectedBasemap; // Mengganti basemap sesuai pilihan
  }
}

const WeatherServiceUrl =
  'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';


  // private latitude: number | any;
  // private longitude: number | any;


  // public async ngOnInit() {
  //   // Mendapatkan posisi pengguna menggunakan Geolocation
  //   const position = await Geolocation.getCurrentPosition();
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;

  //   // Buat peta dengan basemap
  //   const map = new Map({
  //     basemap: 'satellite'
  //   });

  //   // Inisialisasi MapView untuk menampilkan peta
  //   const view = new MapView({
  //     container: 'container', // ID elemen HTML di mana peta akan ditampilkan
  //     map: map,
  //     zoom: 16,
  //     center: [this.longitude, this.latitude] // Posisi awal peta berdasarkan geolokasi
  //   });

  //   // Tunggu hingga MapView siap sebelum menambahkan marker
  //   view.when(() => {
  //     // Buat Point (titik marker)
  //     const point = new Point({
  //       longitude: this.longitude, // Koordinat longitude
  //       latitude: this.latitude,   // Koordinat latitude
  //     });

  //     // Definisikan simbol marker
  //     const markerSymbol = new SimpleMarkerSymbol({
  //       color: [226, 119, 40], // Warna marker (oranye)
  //       outline: {
  //         color: [255, 255, 255], // Outline putih
  //         width: 2,
  //       },
  //     });

  //     // Buat graphic dengan marker dan tambahkan ke view
  //     const pointGraphic = new Graphic({
  //       geometry: point,
  //       symbol: markerSymbol,
  //     });

  //     // Tambahkan graphic ke view
  //     view.graphics.add(pointGraphic);
  //   });
  // }


