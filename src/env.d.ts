interface ImportMetaEnv {
  readonly PUBLIC_MAIL_URL: string;
  readonly PUBLIC_MAIL_KEY: string;
  readonly PUBLIC_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
