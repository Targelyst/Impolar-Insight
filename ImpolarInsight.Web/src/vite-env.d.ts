/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_AUTH_AUTHORITY: string;
	readonly VITE_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
