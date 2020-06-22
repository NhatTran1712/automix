export const fill = <T extends Record<string, unknown>>(target: T, input: Partial<T>): T => ({
  ...target,
  ...input,
})
