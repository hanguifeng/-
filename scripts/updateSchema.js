const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const process = require('process');

const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

const schemaPath = path.join(__dirname, '../schema');

const SERVER = process.env.URL ? `${process.env.URL}/graphql` : 'http://localhost:4000/graphql';
console.log(`update-schema url: ${SERVER}`);

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(`${SERVER}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
}).then(res => res.json())
  .then(schemaJSON => {
    fs.writeFileSync(
      `${schemaPath}.json`,
      JSON.stringify(schemaJSON, null, 2),
    );
    console.log(schemaJSON);
    // Save user readable type system shorthand of schema
    const graphQLSchema = buildClientSchema(schemaJSON.data);
    fs.writeFileSync(
      `${schemaPath}.graphql`,
      printSchema(graphQLSchema),
    );
    console.log('done');
  })
  .catch(error => console.log(error));
