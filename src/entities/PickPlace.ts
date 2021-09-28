import { Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core'
import { Pick, BaseEntity } from 'entities'

export enum CategoryCode {
  MT1 = 'MT1', // 대형마트
  CS2 = 'CS2', // 편의점
  PS3 = 'PS3', // 어린이집, 유치원
  SC4 = 'SC4', // 학교
  AC5 = 'AC5', // 학원
  PK6 = 'PK6', // 주차장
  OL7 = 'OL7', // 주유소, 충전소
  SW8 = 'SW8', // 지하철역
  BK9 = 'BK9', // 은행
  CT1 = 'CT1', // 문화시설
  AG2 = 'AG2', // 중개업소
  PO3 = 'PO3', // 공공기관
  AT4 = 'AT4', // 관광명소
  AD5 = 'AD5', // 숙박
  FD6 = 'FD6', // 음식점
  CE7 = 'CE7', // 카페
  HP8 = 'HP8', // 병원
  PM9 = 'PM9', // 약국
  ETC = 'ETC', // 기타
}

@Entity()
export class PickPlace extends BaseEntity {
  @Property({ nullable: true })
  name: string

  @Property({ nullable: false })
  address_name: string

  @Property({ nullable: true })
  category: string

  @Index()
  @Enum({ items: () => CategoryCode, nullable: false })
  category_code: string

  @Property({ type: 'string' })
  lat: string

  @Property({ type: 'string' })
  lng: string

  @ManyToOne()
  pick: Pick
}
