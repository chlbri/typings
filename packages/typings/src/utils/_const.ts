import type { ObjectT } from '../types';

export const _const = <T extends ObjectT>(value?: T) => value as T;
