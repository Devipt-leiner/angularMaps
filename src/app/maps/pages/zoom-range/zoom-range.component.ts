import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%
      }
      .row {
        background-color: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        z-index: 999;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.46992182744869, 7.905667318827385],
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (evt) => this.zoomLevel = this.map.getZoom());

    this.map.on('zoomend', (evt) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  changeZoom(value: string) {
    this.map.zoomTo(Number(value));
  }

}
