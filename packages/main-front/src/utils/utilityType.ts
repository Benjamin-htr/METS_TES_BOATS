export type GetElementType<T extends unknown[] | undefined> = T extends (infer U)[] ? U : never;
