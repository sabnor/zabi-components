import { redirect } from "@sveltejs/kit";
import { c as componentsCatalog } from "../../../chunks/components-catalog.js";
const load = () => {
  const first = componentsCatalog.atoms[0] ?? componentsCatalog.molecules[0] ?? componentsCatalog.organisms[0];
  const name = first?.name ?? "Button";
  redirect(302, `/components/${name}`);
};
export {
  load
};
