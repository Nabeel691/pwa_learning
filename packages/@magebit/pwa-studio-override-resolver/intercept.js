const path = require('path');

const { cachedCleverMerge } = require('webpack/lib/util/cleverMerge');

const PwaStudioOverrideResolverPlugin = require('./lib/PwaStudioOverrideResolverPlugin');

const resolvers = [
    new PwaStudioOverrideResolverPlugin({
        name: '@magebit/venia-ui-override-resolver',
        projectPath: path.resolve('src', 'overrides', 'venia-ui'),
        modulePath: path.resolve('node_modules', '@magento', 'venia-ui', 'lib')
    }),
    new PwaStudioOverrideResolverPlugin({
        name: '@magebit/peregrine-override-resolver',
        projectPath: path.resolve('src', 'overrides', 'peregrine'),
        modulePath: path.resolve('node_modules', '@magento', 'peregrine', 'lib')
    })
];

module.exports = targets => {
    const webpackCompiler = targets.of('@magento/pwa-buildpack').webpackCompiler;
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('normal')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign({ plugins: resolvers });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
    webpackCompiler.tap(compiler =>
        compiler.resolverFactory.hooks.resolveOptions
            .for('context')
            .tap('AddVeniaResolverToWebpackConfig', resolveOptions => {
                const plugin = Object.assign({ plugins: resolvers });
                return cachedCleverMerge(plugin, resolveOptions);
            })
    );
};
