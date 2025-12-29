import type { ObjectS } from '../types';

const any = <T extends ObjectS = ObjectS>(value?: T) => value as T;
export default any;
