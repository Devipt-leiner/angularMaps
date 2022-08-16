import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  centerMap: [number, number] = [-72.46992182744869, 7.905667318827385];

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centerMap,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (evt) => this.zoomLevel = this.map.getZoom());

    this.map.on('zoomend', (evt) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    // Movimiento del mapa
    this.map.on('move', (evt) => {
      const target = evt.target;
      const { lng, lat } = target.getCenter();
      this.centerMap = [lng, lat];
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
