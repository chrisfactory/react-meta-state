import { IServiceDescriptor } from './IServiceDescriptor';

export type ServiceResult<TService> = TService extends IServiceDescriptor<
  infer Result,
  infer Interact
>
  ? Result & Interact
  : never;
