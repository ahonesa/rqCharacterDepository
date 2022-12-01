export const isNumber = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const isRequired = value => value ? undefined : 'Required'

export const isString = value => typeof value === "string" && value.length > 1 ? undefined : 'Must be string'