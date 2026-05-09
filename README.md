# MS100 Shopify Storefront

Web moderna para conectar con Shopify usando Next.js y Storefront API.

## Configuración rápida

1. Copia `.env.example` como `.env.local`.
2. Rellena:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

## Desarrollo local

```bash
npm install
npm run dev
```

## Despliegue recomendado

Vercel:
- Importa este repositorio desde GitHub.
- Añade las variables de entorno.
- Deploy.

## Shopify

Los productos se cargan desde Shopify Storefront API. Si no hay token configurado, la web muestra productos demo para que puedas ver el diseño.
