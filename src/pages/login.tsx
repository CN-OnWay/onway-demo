import Aurora from '@/shared/components/Aurora';
import { LoginForm } from '@/components/Login/login-form';
import Image from 'next/image';
import Logo from '@/app/onway-logo.png';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#8000ff', '#ffffff', '#521dff']}
          blend={0.5}
          amplitude={1.0}
          speed={0.4}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-primary-foreground">
            <Image src={Logo} alt="OnWay Logo" width={16} height={16} />
          </div>
          OnWay
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
