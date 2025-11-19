/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_DEV_URL: string;
  readonly VITE_API_PROD_URL?: string;
  readonly VITE_DEV_BASE_URL?: string;
  readonly VITE_PROD_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
