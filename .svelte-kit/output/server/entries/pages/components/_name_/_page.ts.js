import { error, redirect } from "@sveltejs/kit";
import { c as componentsCatalog } from "../../../../chunks/components-catalog.js";
function allComponents() {
  return [
    ...componentsCatalog.atoms,
    ...componentsCatalog.molecules,
    ...componentsCatalog.organisms
  ];
}
const load = ({ params }) => {
  const list = allComponents();
  const found = list.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );
  if (!found) {
    error(404, `Unknown component: ${params.name}`);
  }
  if (params.name !== found.name) {
    redirect(301, `/components/${found.name}`);
  }
  return { component: found };
};
export {
  load
};
