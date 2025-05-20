export interface imageProps {
  item: {
    [key: string]: any
  }
  imagetemplate: string | undefined
}

export function useImageTemplate({ item, imagetemplate }: imageProps) {
  // regex is checking on ${} in the template and searching for it in the item
  return imagetemplate?.replace(/\$\{(.*?)\}/g, (_, match) => {
    return item?.[match] ?? ''
  })
}
