import { transform } from '../transform';

const complex1 = transform(({ array, maybe, intersection }) => ({
  nodes: maybe(
    array(
      intersection(
        {
          position: {
            x: 'number',
            y: 'number',
          },
          data: {
            label: maybe('string'),
            content: 'string',
          },
          input: 'boolean',
        },
        { id: 'string' },
      ),
    ),
  ),
}));

expectTypeOf(complex1).toEqualTypeOf<{
  nodes?: Array<{
    position: { x: number; y: number };
    data: { label?: string; content: string };
    input: boolean;
    id: string;
  }>;
}>();
