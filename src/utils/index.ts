export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0

export const kFormatter = (num: number) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

export const htmlToString = (html: any) => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** React Select Theme Colors
export const selectThemeColors = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const isEmpty = (value: any) => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
