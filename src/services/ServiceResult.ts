import {
  IInteractiveServiceDescriptor,
  InteractiveServices,
} from './IInteractiveServiceDescriptor';

type Intersect<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;
export type ExtractInteractiveService<
  T extends any
> = T extends IInteractiveServiceDescriptor<infer Result> ? Result : never;
// export type ServiceResult<T extends  IInteractiveServiceDescriptor<any>[]> = T extends (IInteractiveServiceDescriptor<infer Result>)[]? Intersect<Result> : never;
export type ServiceResult<
  T extends InteractiveServices
> = T extends (infer Result)[]
  ? Intersect<ExtractInteractiveService<Result>>
  : never;
