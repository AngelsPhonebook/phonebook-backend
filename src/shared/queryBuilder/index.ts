import { INITIAL_QUERY } from "./constants";
import { FilterField, QueryObject } from "./types";

export class Query {
  private query: QueryObject = INITIAL_QUERY;
  private params: unknown[] = []

  constructor(table: string) {
    this.query.from = table
  }

  addSelect(field: string, alias?: string) {
    this.query.select.push((alias ? [field, alias] : [field]).join(' as '))

    return this
  }

  addFilter(filter: FilterField, ...params: unknown[]) {
    this.query.filter.push(filter)

    this.params.push(...params)

    return this
  }

  addSort(field: string, direction?: 'ASC' | 'DESC') {
    this.query.sort.push(`${field} ${direction}`)

    return this
  }

  addGroupBy(groupBy: string) {
    this.query.groupBy.push(groupBy)

    return this
  }

  getQuery() {
    let query = [`FROM ${this.query.from}`]

    if (this.query.select.length) {
      query.push(`SELECT ${this.query.select.join()}`)
    }

    if (this.query.filter.length) {
      query.push(`WHERE ${this.query.filter.join('AND')}`)
    }

    if (this.query.groupBy.length) {
      query.push(`GROUP BY ${this.query.groupBy.join()}`)
    }

    if (this.query.sort.length) {
      query.push(`SORT ${this.query.sort.join()}`)
    }

    return {
      queryString: query.join(' '),
      params: this.params
    }
  }
}