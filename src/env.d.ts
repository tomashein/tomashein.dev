interface ImportMetaEnv {
  readonly PUBLIC_MAIL_URL: string;
  readonly PUBLIC_MAIL_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
