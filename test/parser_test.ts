import { parseToString } from "../src/parser.ts";
import { assertEquals } from "https://deno.land/std@0.123.0/testing/asserts.ts";

Deno.test("parser on spec/hello-world.nx", async () => {
  const result = await parseToString("spec/hello-world.nx");

  assertEquals(
    result,
    `extern void puts(const char*);
unsafe! $puts($"Hello, world!")
`,
  );
});

Deno.test("parser on spec/basic.nx", async () => {
  const result = await parseToString("spec/basic.nx");

  assertEquals(
    result,
    `extern _Noreturn exit(int exit_code);

builtin def sum(a : Int32, b : Int32) : Int32
builtin def eq?(a : Int32, b : Int32) : Bool

if eq?(sum(1, 2), 3) {
  unsafe! $exit(exit_code: 0)
} else {
  unsafe! $exit(1)
}
`,
  );
});

Deno.test("parser on spec/assert.nx", async () => {
  const result = await parseToString("spec/assert.nx");

  assertEquals(
    result,
    `extern void puts(const char*);
extern _Noreturn exit(int exit_code);

def assert(expr : Bool, message : $\`const char\`*) : void {
  if (eq?(expr, false)) {
    unsafe! {
      $puts(message)
      $exit(1)
    }
  }
}

assert(true, $"Shall not be output")
`,
  );
});