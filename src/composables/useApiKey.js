import { ref } from 'vue';

const API_KEY_STORAGE_KEY = 'xyzw_backend_api_key';

const isApiKeyVerified = ref(false);

export function useApiKey() {
  const checkApiKey = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    return !!storedKey;
  };

  const getApiKey = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  };

  const clearApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      isApiKeyVerified.value = false;
    }
  };

  const setApiKeyVerified = (verified) => {
    isApiKeyVerified.value = verified;
  };

  return {
    isApiKeyVerified,
    checkApiKey,
    getApiKey,
    clearApiKey,
    setApiKeyVerified
  };
}
