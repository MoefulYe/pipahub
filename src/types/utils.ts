export type InferProps<T extends (args: any) => any> = Parameters<T>[0]
export type InferPropsAndOmit<T extends (args: any) => any, K extends keyof InferProps<T>> = Omit<InferProps<T>, K>
