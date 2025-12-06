import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/app/store/slices/authSlice';
import { showToast } from '@/shared/utils/toast';
import { authAPI } from '@/shared/api/auth';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast.error('Validation Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });

      if (
        response.message === 'Login successful' &&
        response.user &&
        response.accessToken
      ) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }

        dispatch(
          login({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          }),
        );

        showToast.success('Welcome!', `Hello, ${response.user.name}!`);
        await router.replace('/');
      } else {
        showToast.error('Login failed', 'Invalid response from server');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('401')) {
        showToast.error(
          'Invalid credentials',
          'Please check your email and password',
        );
      } else if (errorMessage.includes('Network')) {
        showToast.error(
          'Network error',
          'Please check your internet connection',
        );
      } else {
        showToast.error('Login failed', errorMessage || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Login</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="admin"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="admin"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
