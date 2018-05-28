
export const increment = () => ({type: 'INCREMENT'})
export const decrement = () => ({type: 'DECREMENT'})

export type CounterAction = 
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
