import { Staff } from '@/shared/api/staff/types';
import { Vehicle } from '@/shared/api/autopark/types';

export interface ExtendedStaff extends Staff {
  vehicle?: Vehicle;
}

export type DataType = ExtendedStaff;
