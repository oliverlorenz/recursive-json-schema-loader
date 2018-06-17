const readdir = require('recursive-readdir')
const fs = require('fs')
const Promise = require('bluebird')

module.exports = function() {
    
    function getSchemaPaths(dir) {
        return readdir(dir)
    }

    function getSchemas(dir) {
        return getSchemaPaths(dir)
        .then((pathList) => {
            return pathList.map((path) => {
                return {
                    path,
                    schemaId: getSchemaIdByPath(dir, path),
                    schema: JSON.parse(fs.readFileSync(path))
                }
            })
        })
    }

    function getSchemaIdByPath(dir, pathOfSchemaFile) {
        return pathOfSchemaFile
            .replace(dir, '')
            .replace(/.json$/, '')
    }

    function loadSchemas(dir, addSchemaCallback) {
        return getSchemas(dir)
            .then((schemaList) => {
                schemaList.forEach((schema) => {
                    // if (!schema.$id) schema.schema.$id = schema.schemaId
                    addSchemaCallback(schema.schema, schema.schemaId)
                })
            })
    }

    return {
        getSchemaPaths,
        getSchemas,
        loadSchemas
    }
}