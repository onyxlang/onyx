export default new TextDecoder().decode(
  await Deno.readFile("spec/builtin/int.nx"),
);