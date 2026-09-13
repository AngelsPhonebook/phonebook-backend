export const makeUpdateFields = (data: object) => {
  return Object.entries(data).reduce<{statements: string[], values: unknown[]}>((acc, [key, value], index) => {
    if(value === undefined) {
      return acc
    }

    acc.statements.push(`${key} = $${index + 1}`)
    acc.values.push(value)

    return acc
  }, {
    statements: [],
    values: []
  })
}