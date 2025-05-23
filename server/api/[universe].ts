export default defineEventHandler<Promise<any>>(async (event) => {
  const config = useRuntimeConfig(event)

  const universe = getRouterParam(event, 'universe') as keyof typeof config.public.universe | null
  const endpoint = universe ? config.public.universe[universe] : null
  if (!endpoint) {
    throw new Error('Endpoint is null or undefined')
  }
  try {
    // do something before the route handler
    const response: any = await $fetch(endpoint)
    // do something after the route handler
    return response
  }
  catch (err) {
    // Error handling
    return err
  }
})
