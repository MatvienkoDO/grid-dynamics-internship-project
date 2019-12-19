import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { googleMapEmbedKey } from '../../../../environments';
import { LocalizationService } from '../../services';

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
  @Input() public zoom?: number;

  public src: string | SafeResourceUrl = '';

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly localization: LocalizationService,
  ) { }

  ngOnChanges() {
    const url = buildMapsUrl(
      googleMapEmbedKey,
      this.latitude,
      this.longitude,
      this.address,
      this.localization.getLocale(),
      this.zoom,
    );

    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

function buildMapsUrl(
  key: string,
  latitude?: number,
  longitude?: number,
  address?: string,
  language: string = 'en',
  zoom?: number,
): string {
  const base = 'https://www.google.com/maps/embed/v1/place';

  const withKey = `${base}?key=${key}`;
  const withLanguage = `${withKey}&language=${language}`;
  const withZoom = zoom !== undefined ? `${withLanguage}&zoom=${zoom}` : withLanguage;

  const query = makeQuery(latitude, longitude, address);
  const withQuery = query ? `${withZoom}&q=${query}` : withZoom;

  return withQuery;
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
