export const input = {
  title: 'Const',
  type: 'object',
  properties: {
    stringConst: {
      type: 'string',
      const: 'a'
    },
    impliedStringConst: {
      const: 'a'
    },
    booleanConst: {
      type: 'boolean',
      const: true
    },
    impliedBooleanConst: {
      const: true
    },
    integerConst: {
      type: 'integer',
      const: 1
    },
    impliedIntegerConst: {
      const: 1
    },
    numberConst: {
      type: 'number',
      const: 1.2
    },
    namedIntegerConst: {
      type: 'integer',
      const: 2,
      tsEnumNames: ['One']
    },
    impliedNamedIntegerConst: {
      const: 4,
      tsEnumNames: ['Four']
    },
    namedIntegerConstTitle: {
      type: 'integer',
      const: 1,
      title: 'NamedInteger',
      tsEnumNames: ['One']
    },
    impliedNamedIntegerConstTitle: {
      const: 4,
      title: 'ImpliedNamedInteger',
      tsEnumNames: ['Four']
    }
  },
  required: [
    'stringConst',
    'impliedStringConst',
    'booleanConst',
    'impliedBooleanConst',
    'integerConst',
    'impliedIntegerConst',
    'impliedNamedIntegerConst',
    'namedIntegerConstTitle',
    'impliedNamedIntegerConstTitle'
  ],
  additionalProperties: false
}
