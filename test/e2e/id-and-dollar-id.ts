export const input = {
  $id: 'DollarSchema',
  title: 'Dollar Schema',
  type: 'object',
  properties: {
    dollarId: {
      $id: 'id',
      type: 'string'
    },
    legacyId: {
      id: 'justId',
      type: 'string'
    }
  },
  required: ['dollarId', 'legacyId']
}
