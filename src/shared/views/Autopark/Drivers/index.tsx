import { useEffect, useState } from 'react';
import { DataTable } from '@/shared/components/DataTable';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { DataType } from './types';
import { columns } from './columns';
import { showToast as toast } from '@/shared/utils/toast';
import { staffAPI } from '@/shared/api/staff/staff.service';
import { autoparkAPI } from '@/shared/api/autopark/autopark.service';

export default function DriversView() {
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<DataType[]>([]);

  const loadStaffWithVehicles = async () => {
    try {
      setLoading(true);
      const response = await staffAPI.getStaff();

      const staffWithVehicles = await Promise.all(
        response.data.map(async staffMember => {
          if (staffMember.bind && staffMember.bindCard) {
            try {
              const vehicle = await autoparkAPI.getVehicleById(
                staffMember.bindCard,
              );
              return { ...staffMember, vehicle };
            } catch (error) {
              console.error(
                `Failed to load vehicle for staff ${staffMember.id}:`,
                error,
              );
              return { ...staffMember, vehicle: undefined };
            }
          }
          return { ...staffMember, vehicle: undefined };
        }),
      );

      setStaff(staffWithVehicles);
    } catch (error) {
      console.error('Failed to load staff:', error);
      toast.error('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffWithVehicles();
  }, []);

  return (
    <div className="w-full p-4">
      {loading ? (
        <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full max-h-[386px]" />
      ) : (
        <div className="w-full">
          <DataTable<DataType> data={staff} columns={columns} filter={false} />
        </div>
      )}
    </div>
  );
}
