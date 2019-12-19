import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { googleMapEmbedKey } from '../../../../environments';

@Component({
  selector: 'app-map-place',
  templateUrl: './map-place.component.html',
  styleUrls: ['./map-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPlaceComponent implements OnChanges {
  @Input() public latitude?: number;
  @Input() public longitude?: number;
  @Input() public address?: string;

  public src: string | SafeResourceUrl = '';

  constructor(
    private readonly domSanitizer: DomSanitizer,
  ) { }

  ngOnChanges() {
    const url = buildMapsUrl(googleMapEmbedKey, this.latitude, this.longitude, this.address);
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

function buildMapsUrl(
  key: string,
  latitude?: number,
  longitude?: number,
  address?: string,
): string {
  const baseWithKey = `https://www.google.com/maps/embed/v1/place?key=${key}`;
  const query = makeQuery(latitude, longitude, address);

  return baseWithKey + (query ? '&q=' : '') + query;
}

function makeQuery(
  latitude?: number,
  longitude?: number,
  address: string = '',
): string {
  const coords = latitude !== undefined && longitude !== undefined
    ? latitude + ',' + longitude
    : '';

  return coords + (coords && address ? ',' : '') + address;
}
