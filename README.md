# schema loader

provides a easy to use functionality load all schemas in a directory structure. The structure creates the schema ids, so references are easy to handle.

## Usage with [ajv](https://www.npmjs.com/package/ajv)

```
const SchemaLoader = require('json-schema-loader')
const schemaLoader = SchemaLoader()

const Ajv = require('ajv');
const ajv = new Ajv();

const dataToValidate = {
    my: "data"
}
schemaId = "/schema/id"

return schemaLoader.loadSchemas('./path/to/schemas', (schema, id) => {
    ajv.addSchema(schema, id)
})
.then(() => {
    const valid = ajv.validate(schemaId, dataToValidate);
    console.log(valid)
})
```