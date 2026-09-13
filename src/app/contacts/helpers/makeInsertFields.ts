export const makeInsertFields = (data: object) => {
  let nonNullableValues: unknown[] = [];

  const keys = Object.entries(data).reduce<string[]>((acc, [key, value]) => {
    if (value === undefined) {
      return acc
    }

    acc.push(key)
    nonNullableValues.push(value)

    return acc
  }, [])

  const placeholders = keys.map((_, index) => `$${index + 1}`)

  return {
    keys: keys.join(),
    placeholders: placeholders.join(),
    values: nonNullableValues
  }
}