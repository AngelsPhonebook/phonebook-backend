export type QueryObject = {
  select: string[]
  from: string
  filter: FilterField[]
  groupBy: string[]
  sort: string[]
}

export type FilterField = string | {
  filter: string,
  or?: boolean
}