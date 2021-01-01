// function MergeBuilder<TFrom,T1>(from :TFrom,s1: T1):TFrom & T1;
// function MergeBuilder<TFrom,T1, T2>(from :TFrom,s1: T1, s2: T2):TFrom & T1 & T2;
// function MergeBuilder<T1, T2, T3>(s1: T1, s2: T2, s3: T3): T1 & T2 & T3;
// function MergeBuilder<T1, T2, T3, T4>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
// ): T1 & T2 & T3 & T4;
// function MergeBuilder<T1, T2, T3, T4, T5>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
// ): T1 & T2 & T3 & T4 & T5;
// function MergeBuilder<T1, T2, T3, T4, T5, T6>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
//   s6: T6,
// ): T1 & T2 & T3 & T4 & T5 & T6;
// function MergeBuilder<T1, T2, T3, T4, T5, T6, T7>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
//   s6: T6,
//   s7: T7,
// ): T1 & T2 & T3 & T4 & T5 & T6 & T7;
// function MergeBuilder<T1, T2, T3, T4, T5, T6, T7, T8>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
//   s6: T6,
//   s7: T7,
//   s8: T8,
// ): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8;
// function MergeBuilder<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
//   s6: T6,
//   s7: T7,
//   s8: T8,
//   s9: T9,
// ): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9;
// function MergeBuilder<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
//   s1: T1,
//   s2: T2,
//   s3: T3,
//   s4: T4,
//   s5: T5,
//   s6: T6,
//   s7: T7,
//   s8: T8,
//   s9: T9,
//   s10: T10,
// ): T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10;

function MergeBuilder(datas: any[]) {
  let resut: any;
  datas.forEach((element) => {
    resut = { ...resut, ...element };
  });
  return resut;
}

export { MergeBuilder as default };
