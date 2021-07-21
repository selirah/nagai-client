import { Selector } from 'redux/selector-dispatch'

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0

export const kFormatter = (num: number) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num

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

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export const deleteConfirmMessage = (item: string) => {
  const payload: any = {
    title: `Are you sure you want to delete this ${item}?`,
    text: 'Any data associated with this action will be deleted forever',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1'
    },
    cancelButtonText: 'No, cancel',
    buttonsStyling: false
  }
  return payload
}

export const deleteDone = (item: string) => {
  const payload: any = {
    title: 'Deleted!',
    text: `${item} has been deleted successfully`,
    icon: 'success',
    customClass: {
      confirmButton: 'btn btn-success'
    }
  }
  return payload
}

export const getInitials = (str: string) => {
  const results: string[] = []
  const wordArray = str.split(' ')
  wordArray.forEach((e) => {
    results.push(e[0])
  })
  return results.join('').substr(0, 2)
}

export const getCategory = (id: number) => {
  const { categories } = Selector((state) => state.categories)
  const category = categories.find((c) => c.id === id)
  return category !== undefined ? category : null
}
