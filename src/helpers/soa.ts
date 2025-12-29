import { SOA } from '../constants';
import type { NotReadonly, ObjectS, SoaCustom } from '../types';

const soa = <const T extends ObjectS>(value: T) => {
  type Out = SoaCustom<Extract<NotReadonly<T>, ObjectS>>;
  return { [SOA]: value } as Out;
};

export default soa;
