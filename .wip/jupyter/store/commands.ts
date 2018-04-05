
import { log, reactFactory, INSPECTOR_URI } from "../services/utils";


import {Store} from "./index";

export function toggleInspector(store: Store) {
  const { editor, kernel } = store;
  if (!editor || !kernel) {
    console.log("No kernel running!");
    return;
  }


}
