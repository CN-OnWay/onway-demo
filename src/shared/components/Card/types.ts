import { ReactNode } from 'react';

export interface CardMProps {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: boolean;
}
