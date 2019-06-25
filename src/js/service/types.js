/* eslint-disable */
// @flow
export type TypeShareVoide = {
  n:string, // 姓名
  ph:string, // 電話
  em:string, // email
  gd:string, // 性別
  addr:string, // 住址
  md:number, // 車款 [1,PRIUS] ,[2,PRIUS c] ,[3,PRIUS α] ,[4,PRIUS PHV] ,[5,CAMRY HV] ,[6,RAV4 HV] (傳入代碼)
  cn:string, //  車牌
  sb:string, // 投稿類型 [1,動力操控] ,[2,環保節能] ,[3,乘坐感受] ,[4,保養維修] ,[5,油電科技] ,[6,整體滿意度] (傳入代碼) 多選已’,’隔開
  t:string, // 標題
  c:string, // 內容
  p1:?string, // 照片1
  p2:?string, // 照片2
  p3:?string, // 照片3
}

export type GetMarquee = {
  t:string,
  md:string,
  n:string,
}

export type ListQuery = {
  // k => 關鍵字
  k: ?string,
  // md => 車款 [1,PRIUS] ,[2,PRIUS c] ,[3,PRIUS α] ,[4,PRIUS PHV] ,[5,CAMRY HV] ,[6,RAV4 HV] (傳入代碼) 多選已’,’隔開
  md: ?string,
  // st => 投稿類型 [1,動力操控] ,[2,環保節能] ,[3,乘坐感受] ,[4,保養維修] ,[5,TOYOTA油電科技] (傳入代碼) 多選已’,’隔開
  st: ?string,
  // l => 列表數量
  l: ?number,
  // p => 頁數
  p: ?number
}

export type TypeLabelValue = {
  label:string,
  value:string,
}

export type TypeListResponse = {
  total_num:number,
  total_page:number,
  list: TypeListItem[],
}

export type TypeListItem = {
  id:string,
  ht:string,
  md:string,
  c:string,
  hts: ?string[],
  p1: ?string,
  p2: ?string,
  p3: ?string,
}

export type TypeDetail = {
  id:string,
  ht:string,
  md:string,
  sb:string,
  t:string,
  c:string,
  p1: ?string,
  p2: ?string,
  p3: ?string,
}
