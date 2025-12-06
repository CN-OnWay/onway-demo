import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CardMProps } from './types';

export function CardM({ children, title, description, footer }: CardMProps) {
  return (
    <Card className="w-[350px]">
      {title && description && (
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      )}
    </Card>
  );
}
