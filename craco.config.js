/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CracoEsbuildPlugin = require('craco-esbuild');
const webpack = require('webpack');

module.exports = {
    plugins: [
        {
            plugin: CracoEsbuildPlugin,
            options: {
                esbuildLoaderOptions: {
                    // Optional. Defaults to auto-detect loader.
                    loader: 'tsx',
                    target: 'es2020',
                },
                esbuildMinimizerOptions: {
                    // Optional. Defaults to:
                    target: 'es2020',
                    css: true, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
                },
                skipEsbuildJest: true, // Optional. Set to true if you want to use babel for jest tests,
            },
        },
    ],
    eslint: { enable: false },
    webpack: {
        configure: (config) => {
            // Remove ModuleScopePlugin which throws when we try to import something
            // outside of src/.
            config.resolve.plugins.pop();

            // Resolve the path aliases.
            config.resolve.plugins.push(new TsconfigPathsPlugin());
            config.resolve.fallback = {
                fs: false,
                tty: false,
                constants: false,
                path: false,
                child_process: false,
                http: false,
                https: false,
                os: false,
                url: false,
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
            };

            // Let Babel compile outside of src/.
            const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
            const tsRule = oneOfRule.oneOf.find((rule) => rule.test.toString().includes('ts|tsx'));

            tsRule.include = undefined;
            tsRule.exclude = /node_modules/;

            config.module.rules.push({
                test: /\.wasm$/,
                type: 'javascript/auto',
            });

            // Use raw loader when importing ".md" files
            config.module.rules.push({
                test: /\.md$/,
                type: 'asset/source',
            });

            return config;
        },
        plugins: {
            remove: [
                // This plugin is too old and causes problems in monorepos.
                'ForkTsCheckerWebpackPlugin',
            ],
            add: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),
                // Use newer version of ForkTSCheckerWebpackPlugin to type check files across the monorepo.
                new ForkTSCheckerWebpackPlugin({
                    issue: {
                        // The exclude rules are copied from CRA.
                        exclude: [
                            {
                                file: '**/src/**/__tests__/**',
                            },
                            {
                                file: '**/src/**/?(*.)(spec|test).*',
                            },
                            {
                                file: '**/src/setupTests.*',
                            },
                        ],
                    },
                }),
            ],
        },
    },
};
