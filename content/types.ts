interface UniverseName {
  universe: string
}

export interface UniverseSettings extends UniverseName {
  // Image endpoint with ${property} within item to use for image
  css_colormode: string
  // API endpoint (wanted this to be a ENV variable)
  endpoint: string
  // Image endpoint with ${property} within item  to use for image
  imagetemplate: string
}

export interface UniverseDetails extends UniverseName {
  // SEO title of the page
  title: string
  // SEO description of the page
  description: string
  // Title of the List
  label: string
}
