import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "jsx": "preserve",
    "module": "esnext",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}


export default nextConfig;
