import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        catalog: "catalog.html",
        product: "product.html",
      },
    },
  },
});
