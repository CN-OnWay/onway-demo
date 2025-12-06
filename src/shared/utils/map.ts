export interface FitOptions {
  padding?: number | google.maps.Padding;
  maxZoom?: number;
  singlePointZoom?: number;
  minZoom?: number;
}

export function fitMapToMarkers(
  map: google.maps.Map,
  coords: Array<[number, number]>,
  options: FitOptions = {},
) {
  if (!coords || coords.length === 0) return;
  const { padding = 60, maxZoom = 12, singlePointZoom = 15, minZoom } = options;
  if (coords.length === 1) {
    const [lat, lng] = coords[0];
    map.setCenter({ lat, lng });
    map.setZoom(singlePointZoom);
    return;
  }
  const bounds = new window.google.maps.LatLngBounds();
  coords.forEach(([lat, lng]) => bounds.extend({ lat, lng }));
  map.fitBounds(bounds, padding);
  const once = google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
    const current = map.getZoom();
    if (typeof current === 'number') {
      if (maxZoom && current > maxZoom) map.setZoom(maxZoom);
      if (minZoom && current < minZoom) map.setZoom(minZoom);
    }
    google.maps.event.removeListener(once);
  });
}

export function focusOnMarker(
  map: google.maps.Map,
  coord: [number, number],
  zoom: number = 8,
) {
  const [lat, lng] = coord;
  map.panTo({ lat, lng });
  const current = map.getZoom();
  if (typeof current !== 'number' || current < zoom) {
    map.setZoom(zoom);
  }
}
