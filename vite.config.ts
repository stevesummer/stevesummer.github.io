import path from 'path';
import {defineConfig} from 'vite';
import {imagetools} from 'vite-imagetools';
import {createHtmlPlugin} from 'vite-plugin-html'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: '.',
    base: './',
    plugins: [
        imagetools(),
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
            }
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/js/browser.min.js',
                    dest: 'assets/js'
                },
                {
                    src: 'assets/js/breakpoints.min.js',
                    dest: 'assets/js'
                }
            ]
        }),
    ],

    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: true,
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                // long-term caching friendly names
                entryFileNames: 'assets/js/[name]-[hash].js',
                chunkFileNames: 'assets/js/[name]-[hash].js',
                // assetFileNames: ({name}) => name,
                assetFileNames: ({name}) => {
                    if (/\.(css)$/.test(name ?? '')) return 'assets/css/[name]-[hash][extname]';
                    if (/\.(woff2?|ttf|eot|svg)$/.test(name ?? '')) return 'assets/fonts/[name]-[hash][extname]';
                    if (/\.(png|jpe?g|webp|avif)$/.test(name ?? '')) return 'assets/img/[name]-[hash][extname]';
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.')
        }
    },
});
