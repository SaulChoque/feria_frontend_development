# Estructura de Imágenes

Esta carpeta contiene todas las imágenes del proyecto organizadas por categorías.

## 📁 Estructura de Carpetas:

### `/products/`
- Imágenes de productos del marketplace
- Ejemplos: productos electrónicos, ropa, muebles, etc.
- Formatos recomendados: PNG, JPG, WebP
- Tamaño recomendado: 400x400px mínimo

### `/icons/`
- Iconos personalizados y logos
- Iconos de redes sociales
- Logos de marcas y empresas
- Formatos recomendados: SVG, PNG (con transparencia)

### `/crypto/`
- Logos de criptomonedas (ETH, USDC, BTC, etc.)
- Iconos de wallets (MetaMask, Trust Wallet, etc.)
- Iconos de exchanges y protocolos DeFi
- Formato recomendado: SVG, PNG 64x64px

### `/backgrounds/`
- Imágenes de fondo para banners
- Gradientes y texturas
- Imágenes hero para landing pages
- Formatos recomendados: JPG, WebP
- Tamaño recomendado: 1920x1080px o mayor

### `/ui/`
- Elementos de interfaz de usuario
- Ilustraciones decorativas
- Placeholders y elementos gráficos
- Formatos recomendados: SVG, PNG

## 🔗 Uso en el Código:

```tsx
// Desde la carpeta public/images/
<img src="/images/products/iphone.png" alt="iPhone" />

// Con Next.js Image component
import Image from 'next/image'
<Image src="/images/crypto/ethereum.svg" width={32} height={32} alt="Ethereum" />
```

## 📝 Convenciones de Nomenclatura:

- Usar kebab-case: `product-name.jpg`
- Incluir dimensiones si es relevante: `logo-32x32.png`
- Ser descriptivo: `ethereum-logo.svg` en lugar de `eth.svg`
- Evitar espacios y caracteres especiales

## 🎨 Optimización:

- Comprimir imágenes antes de subir
- Usar WebP cuando sea posible para mejor performance
- Considerar lazy loading para imágenes grandes
- Usar SVG para iconos simples
