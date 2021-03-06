import { create, reduce, set, SORTED_MAP_INTERNAL } from './sorted-map';

describe('[Other] sortedMap', () => {
  describe('create', () => {
    test('should get the same sequence', () => {
      const comparator = (a, b) => a - b;

      expect(
        create(
          [
            ['a', 0],
            ['b', 1],
            ['c', 2]
          ],
          comparator
        )
      ).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should get correct sequence', () => {
      const comparator = (a, b) => a - b;

      expect(
        create(
          [
            ['c', 2],
            ['a', 0],
            ['b', 1]
          ],
          comparator
        )
      ).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should get sequence by desc', () => {
      const comparator = (a, b) => b - a;

      expect(
        create(
          [
            ['a', 0],
            ['c', 2],
            ['b', 1]
          ],
          comparator
        )
      ).toEqual(
        new Map([
          ['c', 2],
          ['b', 1],
          ['a', 0],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should sort chars by asc', () => {
      const comparator = (a, b) => a - b;

      expect(
        create(
          [
            ['first', 'b'],
            ['second', 'c'],
            ['third', 'a']
          ],
          comparator
        )
      ).toEqual(
        new Map([
          ['third', 'a'],
          ['first', 'b'],
          ['second', 'c'],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should sort by booleans', () => {
      const comparator = a => (Boolean(a) ? -1 : 1);

      expect(
        create(
          [
            ['a', true],
            ['b', false],
            ['c', true],
            ['d', false]
          ],
          comparator
        )
      ).toEqual(
        new Map([
          ['a', true],
          ['c', true],
          ['b', false],
          ['d', false],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });
  });

  describe('set', () => {
    test('should return the same map when key is internal property', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ],
        comparator
      );
      const updatedMap = set(map, SORTED_MAP_INTERNAL, 100);

      expect(updatedMap).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should set in the beginning', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['b', 1],
          ['c', 2]
        ],
        comparator
      );
      const updatedMap = set(map, 'a', 0);

      expect(updatedMap).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should set in the middle', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['c', 2]
        ],
        comparator
      );
      const updatedMap = set(map, 'b', 1);

      expect(updatedMap).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should set in the end', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['b', 1]
        ],
        comparator
      );
      const updatedMap = set(map, 'c', 2);

      expect(updatedMap).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });
  });

  describe('reduce', () => {
    test('should reduce to the new map but with the same [K,V]', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ],
        comparator
      );
      const reducedMap = reduce(
        map,
        (m, v, k) => {
          m.set(k, v);
          return m;
        },
        new Map()
      );

      expect(reducedMap).toEqual(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should reduce all key values by -1', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ],
        comparator
      );
      const reducedMap = reduce(
        map,
        (m, v, k) => {
          if (k === SORTED_MAP_INTERNAL) {
            m.set(k, v);
          } else {
            m.set(k, v - 1);
          }
          return m;
        },
        new Map()
      );

      expect(reducedMap).toEqual(
        new Map([
          ['a', -1],
          ['b', 0],
          ['c', 1],
          [SORTED_MAP_INTERNAL, { comparator }]
        ])
      );
    });

    test('should return sum of all values', () => {
      const comparator = (a, b) => a - b;
      const map = create(
        [
          ['a', 0],
          ['b', 1],
          ['c', 2]
        ],
        comparator
      );
      const reducedMap = reduce(
        map,
        (acc, v, k) => (k === SORTED_MAP_INTERNAL ? acc : acc + v),
        0
      );

      expect(reducedMap).toBe(3);
    });
  });
});
