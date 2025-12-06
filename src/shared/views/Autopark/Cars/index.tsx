import { useEffect, useState } from 'react';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { CarCard } from '@/shared/components/CarCard';
import { autoparkAPI } from '@/shared/api/autopark/autopark.service';
import { Vehicle } from '@/shared/api/autopark/types';
import { showToast as toast } from '@/shared/utils/toast';

const DEFAULT_CAR_IMAGE =
  'https://mrchauffeurcolorado.com/wp-content/uploads/2025/03/6311beba7c60637b3729d524_mr-chauffeur-sep-breckenridge-private-shuttle-service.webp';

export default function CarsView() {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const response = await autoparkAPI.getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const convertVehicleToCardProps = (vehicle: Vehicle) => ({
    car: vehicle.model.split(' ')[0] || 'Unknown',
    model: vehicle.model.split(' ').slice(1).join(' ') || vehicle.model,
    year: new Date().getFullYear(),
    status: vehicle.status ? 'Available' : 'Unavailable',
    img: vehicle.img || DEFAULT_CAR_IMAGE,
    bind: vehicle.bind ? vehicle.bindBy || 'Bound' : 'Free',
  });

  return (
    <div className="p-4 pt-0 w-full">
      {loading ? (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full" />
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full" />
          <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full" />
        </div>
      ) : vehicles.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {vehicles.map(vehicle => (
            <CarCard key={vehicle.id} {...convertVehicleToCardProps(vehicle)} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No vehicles found</p>
        </div>
      )}
    </div>
  );
}
