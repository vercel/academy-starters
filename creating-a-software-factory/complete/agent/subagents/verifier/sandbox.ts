import { defineSandbox } from "eve/sandbox";
import {
  createRepoEnvironment,
  openRepoSandbox,
} from "../../lib/github/repo-sandbox.js";

export const environment = createRepoEnvironment();

export default defineSandbox(() => openRepoSandbox(environment));
