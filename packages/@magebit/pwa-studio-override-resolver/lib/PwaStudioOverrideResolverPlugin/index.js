const fs = require('fs');
const path = require('path');

class PwaStudioOverrideResolverPlugin {
    constructor(options) {
        this.name = options.name || 'PwaStudioResolverPlugin';
        this.basePath = options.basePath || path.resolve();
        this.projectPath = options.projectPath;
        this.includePath = options.modulePath;
    }

    apply(resolver) {
        const target = resolver.ensureHook('resolved');
        resolver
            .getHook('existingFile')
            .tapAsync(this.name, (request, resolveContext, callback) => {
                const current = request.path;
                if (current && current.startsWith(this.includePath)) {
                    const newFile = current.replace(this.includePath, this.projectPath);
                    fs.stat(newFile, (err, stat) => {
                        if (!err && stat && stat.isFile()) {
                            console.log(
                                '\nOverride made: %s => %s',
                                current.replace(this.basePath, ''),
                                newFile.replace(this.basePath, '')
                            );
                            const obj = {
                                ...request,
                                path: newFile,
                                request: undefined
                            };
                            return resolver.doResolve(
                                target,
                                obj,
                                `resolved by ${this.name} to ${newFile}`,
                                resolveContext,
                                callback
                            );
                        }
                        return callback();
                    });
                } else {
                    return callback();
                }
            });
    }
}

module.exports = PwaStudioOverrideResolverPlugin;
