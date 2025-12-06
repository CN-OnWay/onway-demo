/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/store/store';
import '@/app/styles/globals.css';
import { RootState } from '@/app/store/store';
import { Toaster } from 'sonner';

function AuthChecker({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    // Разрешаем доступ к странице логина без авторизации
    if (router.pathname === '/login') {
      return;
    }

    // Для всех остальных страниц проверяем авторизацию
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // На странице логина не проверяем авторизацию
  if (router.pathname === '/login') {
    return <Component {...pageProps} />;
  }

  // На остальных страницах показываем контент только если авторизован
  if (!isAuthenticated) {
    return null;
  }

  return <Component {...pageProps} />;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AuthChecker
            Component={Component}
            pageProps={pageProps}
            router={router as any}
          />
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={false}
            theme="dark"
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
