import type { Sh } from '../types';

export const use = <T extends Sh>({ __type }: T): T['__type'] => __type;
