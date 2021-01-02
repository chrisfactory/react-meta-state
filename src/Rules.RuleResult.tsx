export type Data = string; // ReactNode | ReactNodeArray;
export type Datas = Data[]; // |((value:any)=>Data[]);
export interface RuleResult {
  datas: Datas;
}
