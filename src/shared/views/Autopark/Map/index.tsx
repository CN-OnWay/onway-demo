import { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { autoparkAPI } from '@/shared/api/autopark/autopark.service';
import { Vehicle } from '@/shared/api/autopark/types';
import { Captions, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fitMapToMarkers, focusOnMarker } from '@/shared/utils/map';

export default function MapView() {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeId, setActiveId] = useState<Vehicle['id'] | null>(null);
  const initialCenter = { lat: 39.7642444, lng: -104.8547524 };
  const mapRef = useRef<google.maps.Map | null>(null);
  const initialFitDoneRef = useRef(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await autoparkAPI.getVehicles();
        setVehicles(res.data || []);
      } catch (error) {
        console.error('[getVehicles] error', error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !mapRef.current || initialFitDoneRef.current) return;
    const coords = vehicles
      .map(v => (v as unknown as { location?: unknown }).location)
      .filter(
        (raw): raw is [number, number] =>
          Array.isArray(raw) &&
          raw.length === 2 &&
          raw.every(n => typeof n === 'number'),
      );
    if (coords.length) {
      fitMapToMarkers(mapRef.current, coords, {
        maxZoom: 10,
        singlePointZoom: 14,
      });
      initialFitDoneRef.current = true;
    }
  }, [loading, vehicles]);

  if (loading) {
    return (
      <div className="p-4 pt-0 w-full">
        <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full" />
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Loading vehicles and map...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-0 w-full">
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Vehicle Management</h3>
          <p className="text-sm text-muted-foreground">
            Fleet overview with {vehicles.length} vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <div className="col-span-1 md:col-span-3">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY || ''}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '500px',
                  borderRadius: '8px',
                }}
                center={initialCenter}
                zoom={12}
                onLoad={map => {
                  mapRef.current = map;
                }}
                options={{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  styles: [
                    {
                      featureType: 'all',
                      elementType: 'geometry.fill',
                      stylers: [{ weight: '2.00' }],
                    },
                    {
                      featureType: 'all',
                      elementType: 'geometry.stroke',
                      stylers: [{ color: '#9c9c9c' }],
                    },
                  ],
                }}
              >
                {vehicles.map(v => {
                  const raw = (v as unknown as { location?: unknown }).location;
                  if (
                    !Array.isArray(raw) ||
                    raw.length !== 2 ||
                    !raw.every(n => typeof n === 'number')
                  ) {
                    return null;
                  }
                  const [lat, lng] = raw as [number, number];
                  return (
                    <OverlayView
                      key={`vehicle-dot-${v.id}`}
                      position={{ lat, lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div className="relative -translate-x-1/2 -translate-y-1/2">
                        {v.status && (
                          <span className="absolute inset-0 -m-1 rounded-full bg-green-400/40 animate-ping min-w-[30px]" />
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveId(p => (p === v.id ? null : v.id))
                          }
                          className={`relative rounded-full border border-white shadow-md outline-none ring-0 focus:ring-2 focus:ring-primary transition-all ${
                            v.status
                              ? 'w-5 h-5 bg-green-500 ring-2 ring-green-300'
                              : 'w-4 h-4 bg-gray-400'
                          }`}
                          title={`${v.model} (${lat.toFixed(4)}, ${lng.toFixed(4)})`}
                        />
                        {activeId === v.id && v.licence_plate && (
                          <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full bg-card text-xs font-medium px-2 py-1 rounded border shadow-lg whitespace-nowrap z-10">
                            {v.licence_plate}
                            <span className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card" />
                          </div>
                        )}
                      </div>
                    </OverlayView>
                  );
                })}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="bg-muted/20 rounded-lg p-4 h-[500px] overflow-y-auto">
              <h4 className="text-md font-semibold mb-4">Vehicle List</h4>
              {vehicles.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No vehicles found
                </div>
              ) : (
                <ul className="space-y-3">
                  {vehicles.map(v => (
                    <li
                      key={v.id}
                      onClick={() => {
                        const raw = (v as unknown as { location?: unknown })
                          .location;
                        if (
                          Array.isArray(raw) &&
                          raw.length === 2 &&
                          raw.every(n => typeof n === 'number') &&
                          mapRef.current
                        ) {
                          setActiveId(v.id);
                          focusOnMarker(
                            mapRef.current,
                            raw as [number, number],
                            15,
                          );
                        }
                      }}
                      className="bg-card/40 border rounded p-3 flex flex-col gap-3 cursor-pointer hover:bg-card/60 transition-colors"
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          const raw = (v as unknown as { location?: unknown })
                            .location;
                          if (
                            Array.isArray(raw) &&
                            raw.length === 2 &&
                            raw.every(n => typeof n === 'number') &&
                            mapRef.current
                          ) {
                            setActiveId(v.id);
                            focusOnMarker(
                              mapRef.current,
                              raw as [number, number],
                              15,
                            );
                          }
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-semibold leading-tight">
                          {v.model}
                        </div>
                        <Badge variant="outline">
                          <span
                            className={
                              v.status ? 'text-green-500' : 'text-red-500'
                            }
                          >
                            {v.status ? 'Active' : 'Inactive'}
                          </span>
                        </Badge>
                      </div>
                      {v.shortDesc && (
                        <div className="text-xs text-muted-foreground">
                          {v.shortDesc}
                        </div>
                      )}
                      {v.bind && v.bindBy && (
                        <div className="text-xs text-blue-500">
                          Bind by: {v.bindBy}
                        </div>
                      )}
                      {v.licence_plate && (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-1">
                            <Captions className="w-4 h-4" />
                            <span className=" text-xs text-muted-foreground">
                              Licence Plate:
                            </span>
                            <span className="text-base font-semibold">
                              {v.licence_plate}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h4" />
                            <span className="text-xs text-muted-foreground">
                              Current Location:{' '}
                              {v.location
                                ? `${v.location[0]}, ${v.location[1]}`
                                : 'N/A'}
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
