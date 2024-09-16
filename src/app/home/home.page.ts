// import { Component, OnInit } from '@angular/core';
// import { throwError } from 'rxjs';
// import Map from '@arcgis/core/map';
// import MapView from '@arcgis/core/views/MapView';
// import { Geolocation } from '@capacitor/geolocation';
// import Point from '@arcgis/core/geometry/Point';
// import Graphic from '@arcgis/core/Graphic';
// import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {

//   constructor() {}

//   private latitude: number | any;
//   private longitude: number | any;
//   public async ngOnInit(){
//     const position = await Geolocation.getCurrentPosition();
//     this.latitude = position.coords.latitude;
//     this.longitude = position.coords.longitude;
//     // this.longitude = 112.73833021443166;
//     // this.latitude = -7.244836975284762;
//     const map = new Map({
//       basemap: 'satellite'
//     })

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
//     this.view.graphics.add(pointGraphic);
//   }

//     const view = new MapView({
//       container: 'container',
//       map: map,
//       zoom: 17,
//       center: [this.longitude,this.latitude]
//     });
//   }
// } 

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private latitude: number | any;
  private longitude: number | any;

  constructor() {}

  public async ngOnInit() {
    // Mendapatkan posisi pengguna menggunakan Geolocation
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Buat peta dengan basemap
    const map = new Map({
      basemap: 'satellite'
    });

    // Inisialisasi MapView untuk menampilkan peta
    const view = new MapView({
      container: 'container', // ID elemen HTML di mana peta akan ditampilkan
      map: map,
      zoom: 16,
      center: [this.longitude, this.latitude] // Posisi awal peta berdasarkan geolokasi
    });

    // Tunggu hingga MapView siap sebelum menambahkan marker
    view.when(() => {
      // Buat Point (titik marker)
      const point = new Point({
        longitude: this.longitude, // Koordinat longitude
        latitude: this.latitude,   // Koordinat latitude
      });

      // Definisikan simbol marker
      const markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40], // Warna marker (oranye)
        outline: {
          color: [255, 255, 255], // Outline putih
          width: 2,
        },
      });

      // Buat graphic dengan marker dan tambahkan ke view
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });

      // Tambahkan graphic ke view
      view.graphics.add(pointGraphic);
    });
  }
}

