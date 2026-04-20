import { type } from "../type";

describe("Helper: sv (StateValue)", () => {
  describe("#01 => sv.const usage", () => {
    const result = type(({ sv }) => ({
      state: sv.const,
    }));

    test("#01 => value.state is undefined", () =>
      expect(result.value.state).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));

    test("#03 => validate() captures the value", () =>
      expect(result["~standard"].validate("any")).toEqual({
        value: { state: undefined },
      }));
  });

  describe("#02 => sv.type usage in nested object", () => {
    const result = type(({ sv }) => ({
      machine: {
        currentState: sv.type,
      },
    }));

    test("#01 => value.machine.currentState is undefined", () =>
      expect(result.value.machine.currentState).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });

  describe("#03 => multiple sv", () => {
    const result = type(({ sv }) => ({
      state1: sv.type,
      state2: sv.type,
    }));

    test("#01 => value.state1 is undefined", () =>
      expect(result.value.state1).toBeUndefined());

    test("#02 => value.state2 is undefined", () =>
      expect(result.value.state2).toBeUndefined());
  });

  describe("#04 => sv() call", () => {
    const result = type(({ sv }) => ({
      state: sv(),
    }));

    test("#01 => value.state is undefined", () =>
      expect(result.value.state).toBeUndefined());

    test("#02 => ~standard.version is 1", () =>
      expect(result["~standard"].version).toBe(1));
  });
});
