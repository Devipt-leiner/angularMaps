import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMark {
  color: string
  marker?: mapboxgl.Marker
  center?: [number, number]
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
      }

      li {
        cursor: pointer
      }
    `
  ]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  centerMap: [number, number] = [-72.46992182744869, 7.905667318827385];
  map!: mapboxgl.Map;
  markers: ColorMark[] = [];
  zoomLevel: number = 15;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centerMap,
      zoom: this.zoomLevel
    });

    this.readLocalStorage();

    // Como agregar un marcador personalizado...
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo!';

    // new mapboxgl.Marker({
    //   element: markerHtml
    // }).setLngLat(this.centerMap).addTo(this.map)
  }

  addMark() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.centerMap)
    .addTo(this.map)

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkerLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkerLocalStorage();
    });
  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat()
    });
  }

  saveMarkerLocalStorage() {
    const lngLatArr: ColorMark[] = [];

    this.markers.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        center: [lng, lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  readLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: ColorMark[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      }).setLngLat(m.center!).addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkerLocalStorage();
      });

    })

  }

  deleteMarker(i: number) {
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.saveMarkerLocalStorage();
  }

}
