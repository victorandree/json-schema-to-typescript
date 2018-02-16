import { readFileSync } from 'fs'
import { endsWith, merge } from 'lodash'
import { dirname } from 'path'
import { Options as PrettierOptions } from 'prettier'
import { format } from './formatter'
import { generate } from './generator'
import { normalize } from './normalizer'
import { optimize } from './optimizer'
import { parse } from './parser'
import { dereference } from './resolver'
import { JSONSchema } from './types/JSONSchema'
import { error, stripExtension, Try } from './utils'
import { validate } from './validator'

export { EnumJSONSchema, JSONSchema, NamedEnumJSONSchema } from './types/JSONSchema'

export interface Options {
  bannerComment: string
  cwd: string
  declareExternallyReferenced: boolean
  enableConstEnums: boolean
  style: PrettierOptions
  unreachableDefinitions: boolean
}

export const DEFAULT_OPTIONS: Options = {
  bannerComment: `/**
* This file was automatically generated by json-schema-to-typescript.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run json-schema-to-typescript to regenerate this file.
*/`,
  cwd: process.cwd(),
  declareExternallyReferenced: true,
  enableConstEnums: true, // by default, avoid generating code
  style: {
    bracketSpacing: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false
  },
  unreachableDefinitions: false
}

export function compileFromFile(
  filename: string,
  options: Partial<Options> = DEFAULT_OPTIONS
): Promise<string> {
  const contents = Try(
    () => readFileSync(filename),
    () => { throw new ReferenceError(`Unable to read file "${filename}"`) }
  )
  const schema = Try<JSONSchema>(
    () => JSON.parse(contents.toString()),
    () => { throw new TypeError(`Error parsing JSON in file "${filename}"`) }
  )
  return compile(
    schema,
    stripExtension(filename),
    { cwd: dirname(filename), ...options }
  )
}

export async function compile(
  schema: JSONSchema,
  name: string,
  options: Partial<Options> = {}
): Promise<string> {

  const _options = merge({}, DEFAULT_OPTIONS, options)

  const errors = validate(schema, name)
  if (errors.length) {
    errors.forEach(_ => error(_))
    throw new ValidationError
  }

  // normalize options
  if (!endsWith(_options.cwd, '/')) {
    _options.cwd += '/'
  }

  return format(generate(
    optimize(
      parse(await dereference(normalize(schema, name), _options.cwd), _options)
    ),
    _options
  ), _options)
}

export class ValidationError extends Error { }
