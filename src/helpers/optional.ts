import { OPTIONAL } from '../constants';
import type { __ObjectS, AnyArray, ArrayCustom, Optional } from '../types';

const optional = <T extends __ObjectS | ArrayCustom | AnyArray<__ObjectS>>(
  value?: T,
) =>
  ({
    [OPTIONAL]: value,
  }) as Optional<T>;

export default optional;
