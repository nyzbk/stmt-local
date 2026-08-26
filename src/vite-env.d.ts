/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_LIVE?: string;
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_ADSENSE_SLOT_AFTER_SUCCESS?: string;
  readonly VITE_ADSENSE_SLOT_MID?: string;
  readonly VITE_ADSENSE_SLOT_FOOTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
