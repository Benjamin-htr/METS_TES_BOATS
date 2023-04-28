export type GetElementType<T extends any[] | undefined> = T extends (infer U)[] ? U : never;
