
export const goTo = (route: string) => ({
  type: 'GOTO',
  payload: {
    route: route
  }
})

export type RoutingAction =
  | ReturnType<typeof goTo>
