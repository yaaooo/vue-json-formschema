# FormSchema Native

Vue component form based on JSON Schema and Native HTML

[![npm](https://img.shields.io/npm/v/@formschema/native.svg)](https://www.npmjs.com/package/@formschema/native) [![Build status](https://gitlab.com/formschema/native/badges/master/build.svg)](https://gitlab.com/formschema/native/pipelines) [![Test coverage](https://gitlab.com/formschema/native/badges/master/coverage.svg)](https://gitlab.com/formschema/native/-/jobs)

> This is the branch for @formschema/native 2.0 Alpha, not ready for production.
  For the 1x version, please switch to the [v1](https://gitlab.com/formschema/native/tree/v1) branch.

## Status: Alpha

Core features are not ready and the API could changed. Don't use this in production.

## Install

```sh
npm install --save @formschema/native
```

## Demo

- [Demo with ElementUI](https://gitlab.com/formschema/components/elementui)

![formschema-demo-elementui](https://gitlab.com/formschema/components/elementui/raw/master/screenshot.png "FormSchema Demo with ElementUI")

## Usage

```html
<template>
  <FormSchema :schema="schema" v-model="model" @submit.prevent="submit">
    <button type="submit">Subscribe</button>
  </FormSchema>
</template>

<script>
  import FormSchema from '@formschema/native'
  import schema from './schema/newsletter-subscription.json'

  export default {
    data: () => ({
      schema: schema,
      model: {}
    }),
    methods: {
      submit (e) {
        // this.model contains the valid data according your JSON Schema.
        // You can submit your model to the server here
      }
    },
    components: { FormSchema }
  }
</script>
```

## Features

- [Keywords for Applying Subschemas With Boolean Logic](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.7)
- [Validation Keywords for Any Instance Type](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1)<br>
  FormSchema uses:
  - HTML input `text` to render schema with `type: 'string'`
  - HTML input `number` to render schema with `type: 'number' | 'integer'`
  - HTML input `hidden` to render schema with `type: 'null'`
  - HTML input `checkbox` to render schema with `type: 'boolean'`
- [Validation Keywords for Numeric Instances (number and integer)](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2)<br>
  FormSchema parses keywords `maximum`, `minimum`, `exclusiveMaximum` and `exclusiveMinimum` to generate HTML attributes `max` and `min`.
- [Validation Keywords for Strings](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3)<br>
  FormSchema parses keywords `maxLength`, `minLength`, `pattern` to generate HTML attributes `maxlength`, `minlength` and `pattern`.
- [Validation Keywords for Arrays](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4)
- [Semantic Validation With "format"](https://json-schema.org/latest/json-schema-validation.html#rfc.section.7)<br>
  FormSchema uses:
  - HTML input `date` to render schema with `format: 'date'`
  - HTML input `datetime-local` to render schema with `format: 'date-time'`
  - HTML input `email` to render schema with `format: 'email' | 'idn-email'`
  - HTML input `time` to render schema with `format: 'time'`
  - HTML input `url` to render schema with `format: 'uri'`
- [String-Encoding Non-JSON Data](https://json-schema.org/latest/json-schema-validation.html#rfc.section.8)
- [Property dependencies and Schema dependencies](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7)
- [Schema Re-Use With "definitions"](https://json-schema.org/latest/json-schema-validation.html#rfc.section.9) (see [JSON Schema $ref Pointers](#json-schema-ref-pointers))
- [Schema Annotations](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10)

## Supported Keywords

- [type](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.1) is only supported string value. Array type definition is not supported.
- [enum](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.2) is used to render multiple choices input
- [maximum](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.2), [exclusiveMaximum](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.3), [minimum](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.4) and [exclusiveMinimum](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.5) are used to render numeric fields
- [multipleOf](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.2.1) is used to render the input attribute `step`
- [maxLength](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.1), [minLength](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.2), [pattern](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3) and [const](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.1.3) are used to render string fields
- [items](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.1), [additionalItems](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.2), [maxItems](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.3), [minItems](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.4) and [uniqueItems](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.5) are used to render array fields
- [dependencies](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7) is used to implement *Property dependencies* and *Schema dependencies*
- [contentEncoding](https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.3)
- [contentMediaType](https://json-schema.org/latest/json-schema-validation.html#rfc.section.8.4)
- [title](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1) is used to render the input label
- [description](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.1) is used to render the input description
- [default](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.2) is used to define the default input value
- [readOnly](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.3) is used to render a field as an read-only input

## Irrelevant (ignored) Keywords

Since FormSchema is just a form generator, some JSON Schema validation keywords
are irrelevant:

- [contains](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4.6)
- [maxProperties](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.1)
- [minProperties](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.2)
- [patternProperties](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.5)
- [additionalProperties](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.6)
- [propertyNames](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.8)
- [writeOnly](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.3)
- [examples](https://json-schema.org/latest/json-schema-validation.html#rfc.section.10.4)

## FormSchema API

### props

- `schema` ***Object*** (*optional*) `default: {}`

  The JSON Schema object.

- `v-model` ***Number|String|Array|Object|Boolean*** (*optional*) `default: undefined`

  Use this directive to create two-way data bindings with the
  component. It automatically picks the correct way to update the
  element based on the input type.

- `action` ***String*** (*optional*)

  The URI of a program that processes the form information.

- `autocomplete` ***String*** (*optional*)

  This property indicates whether the value of the control can be
  automatically completed by the browser.

  Possible values are: `off` and `on`.

- `bracketed-array-input-name` ***Boolean*** (*optional*) `default: true`

  When set to true (default), checkbox inputs will automatically include
  brackets at the end of their names (e.g. name="Multicheckbox-Value1[]".
  Setting this property to false, disables this behaviour.

- `enctype` ***String*** (*optional*) `default: 'application/x-www-form-urlencoded'`

  When the value of the method attribute is post, enctype is the
  MIME type of content that is used to submit the form to the
  server.

  Possible values are:
  - `application/x-www-form-urlencoded`: The default value if the
  attribute is not specified.
  - `multipart/form-data`: The value used for an `<input/>` element
  with the type attribute set to "file".
  - `text/plain` (HTML5).

- `method` ***String*** (*optional*) `default: 'post'`

  The HTTP method that the browser uses to submit the form.

  Possible values are:
  - `post`: Corresponds to the HTTP POST method ; form data are
  included in the body of the form and sent to the server.
  - `get`: Corresponds to the HTTP GET method; form data are
  appended to the action attribute URI with a '?' as separator,
  and the resulting URI is sent to the server. Use this method
  when the form has no side-effects and contains only ASCII
  characters.

- `novalidate` ***Boolean*** (*optional*)

  This Boolean attribute indicates that the form is not to be
  validated when submitted.

- `search` ***Boolean*** (*optional*) `default: false`

  Use this prop to enable `search` landmark role to identify a section
  of the page used to search the page, site, or collection of sites.

- `components` ***Components*** (*optional*) `default: GLOBAL.components`

  Use this prop to overwrite the default Native HTML Elements for
  custom components.

### events

- `change`

  Fired when a change to the element's value is committed
  by the user.

- `input`

  Fired synchronously when the value of an element is changed.

- `invalid`

  Fired when a submittable element has been checked and doesn't
  satisfy its constraints. The validity of submittable elements is
  checked before submitting their owner form, or after the
  `checkValidity()` of the element or its owner form is called.

- `submit`

  Fired when a form is submitted

### methods

- `load(schema, model)`

  Load the given `schema` with initial filled `value`.
  Use this to load async schema.

  **parameters:**

     - `schema` **object** - The JSON Schema object to load
     - `model` **Number|String|Array|Object|Boolean** - The initial data for the schema.

- `form()`

  Get the HTML form reference.

   **return value:**

     - **HTMLFormElement,undefined** -  Returns the HTML form element or `undefined` for empty object
- `reportValidity()`

  Returns true if the element's child controls satisfy their
  validation constraints. When false is returned, cancelable invalid
  events are fired for each invalid child and validation problems
  are reported to the user.

- `checkValidity()`

  Checks whether the form has any constraints and whether it
  satisfies them. If the form fails its constraints, the browser
  fires a cancelable `invalid` event at the element, and then
  returns false.

- `reset()`

  Reset the value of all elements of the parent form.

## Working with Async Schema

You may want to use `FormSchema` with a schema loaded from a remote URL.

To do that, use the `load(schema[, value = undefined])` method:

```html
<template>
  <FormSchema v-model="schema"/>
</template>

<script>
  import axios from 'axios'
  import FormSchema from '@formschema/native'

  export default {
    data: () => ({
      schema: {}
    }),
    created () {
      axios.get('/api/schema/subscription.json').then(({ data }) => {
        this.schema = data
      })
    },
    components: { FormSchema }
  }
</script>
```

## Multiple Checkbox elements

To define multiple checkbox, use the [JSON Schema keyword `anyOf`](http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.27):

**schema.json**

```json
{
  "type": "object",
  "properties": {
    "multipleCheckbox": {
      "type": "array",
      "anyOf": [
        "daily",
        "promotion"
      ]
    }
  }
}
```

## Grouped Radio elements

To group radio elements, use the [JSON Schema keyword `enum`](http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.23):

**schema.json**

```json
{
  "type": "object",
  "properties": {
    "groupedRadio": {
      "type": "string",
      "enum": [
        "daily",
        "promotion"
      ]
    }
  }
}
```

## Array Inputs Elements

To render a [array field](http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4), define your schema like:

**schema.json**

```json
{
  "type": "object",
  "properties": {
    "arrayInput": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

`FormSchema` will render a text input by adding a button to add more inputs.

## Regex Inputs

To render a [regex input](http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.3.3), define your schema like:

**schema.json**

```json
{
  "type": "object",
  "properties": {
    "regexInput": {
      "type": "string",
      "pattern": "[a-e]+"
    }
  }
}
```

## JSON Schema $ref Pointers

To load a JSON Schema with `$ref` pointers, you need to install an additional dependency to resolve them:

```js
import $RefParser from 'json-schema-ref-parser';
import FormSchema from '@formschema/native';
import schemaWithPointers from './schema/with-pointers.json';

export default {
  created () {
    $RefParser.dereference(schemaWithPointers)
      .then((schema) => {
        // `schema` is the resolved schema that contains your entire JSON
        // Schema, including referenced files, combined into a single object
        this.schema = schema;
      });
  },
  components: { FormSchema }
}
```

See [json-schema-ref-parser documentation page](https://www.npmjs.com/package/json-schema-ref-parser) for more details.

## Custom Form Elements

To define custom elements for rendering, you need to use the `Components` class and the `components` prop:

```js
// MyCustomElements.js

import { Components } from '@formschela/native';
import { InputElement } from '@/components/InputElement';
import { ArrayElement } from '@/components/ArrayElement';
import { FieldsetElement } from '@/components/FieldsetElement';
import { ListElement } from '@/components/ListElement';
import { TextareaElement } from '@/components/TextareaElement';
import { StateElement } from '@/components/StateElement';

export const MyCustomElements = new Components();

MyCustomElements.set('array', ArrayElement);
MyCustomElements.set('string', InputElement);
MyCustomElements.set('boolean', StateElement);
MyCustomElements.set('radio', StateElement);
MyCustomElements.set('checkbox', StateElement);
MyCustomElements.set('enum', FieldsetElement);
MyCustomElements.set('number', InputElement);
MyCustomElements.set('integer', InputElement);
MyCustomElements.set('object', FieldsetElement);
MyCustomElements.set('list', ListElement);
MyCustomElements.set('textarea', TextareaElement);
```

See the file [NativeElements.ts](https://gitlab.com/formschema/native/blob/master/src/lib/NativeElements.ts) for an example.

```html
<template>
  <FormSchema v-model="model" :schema="schema" :components="components"/>
</template>

<script>
  import FormSchema, { Components } from '@formschema/native'
  import { MyCustomElements } from './MyCustomElements'

  export default {
    data: () => ({
      schema: { /* ... */ },
      components: MyCustomElements,
      model: {}
    }),
    components: { FormSchema }
  }
</script>
```

[**ElementUI Example**](https://gitlab.com/formschema/components/elementui)

- Definition: https://gitlab.com/formschema/components/elementui/blob/master/lib/ElementUIComponents.js
- Usage: https://gitlab.com/formschema/components/elementui/blob/master/demo/src/components/Subscription.vue

## Contributing

Please see [contributing guide](https://gitlab.com/formschema/native/blob/master/CONTRIBUTING.md).

## License

Under the MIT license. See [LICENSE](https://gitlab.com/formschema/native/blob/master/LICENSE) file for more details.
