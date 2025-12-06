import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { CarCardProps } from './types';
import Image from 'next/image';

export function CarCard({
  car: car,
  model: model,
  year: year,
  status: status,
  img: img,
  bind: bind,
}: CarCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Card
      style={{
        gridColumn: 'span 2 / span 6',
        width: '300px',
        position: 'relative',
      }}
    >
      <Image
        src={img}
        alt={car}
        width={320}
        height={320}
        style={{
          borderRadius: '8px 8px 0 0',
          height: '240px',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent>
        <div className="flex justify-between items-center mt-2">
          <CardTitle>{car}</CardTitle>
          <CardDescription>
            {model} {year}
          </CardDescription>
        </div>
        <div className="flex w-full justify-between items-center mt-2">
          <span>Status:</span>
          <span>{status}</span>
        </div>
        <div className="flex w-full justify-between items-center mt-2">
          <span>Bind:</span>
          <span>{bind}</span>
        </div>
        <div className="mt-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button onClick={handleSaveClick}>Save</Button>
            </>
          ) : (
            <Button onClick={handleEditClick}>Edit</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
