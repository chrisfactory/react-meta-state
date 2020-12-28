export interface MetaService {
  name: string;
  OnValueChanging<S>(value: S);
}
export type StoreMetaService = Array<MetaService>;
