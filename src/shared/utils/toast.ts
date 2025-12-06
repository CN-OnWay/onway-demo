import { toast } from 'sonner';

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
    });
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
    });
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
    });
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
    });
  },

  // Нейтральное сообщение
  message: (message: string, description?: string) => {
    toast.message(message, {
      description,
    });
  },

  // Или можно использовать просто toast без типа
  default: (message: string, description?: string) => {
    toast(message, {
      description,
    });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: string | ((error: any) => string);
    },
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },
};
