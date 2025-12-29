import { PARTIAL } from '../constants';
import type { ObjectS, PartialCustom } from '../types';

const partial = <T extends ObjectS>(value: T): T & PartialCustom => {
  const entries = Object.entries(value).filter(([key]) => key !== PARTIAL);
  const out: any = {};

  entries.forEach(([key, value]) => {
    out[key] = value;
  });

  return out;
};

export default partial;
