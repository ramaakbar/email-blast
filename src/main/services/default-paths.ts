import { join } from "path";

/**
 * The two directories the app creates and works in: the templates folder
 * (source DOCX/image templates) and the output folder (generated PDFs).
 * Spec decision 7: `~/Documents/EmailBlast/templates` and
 * `~/Documents/EmailBlast/output`.
 */
export interface DefaultPaths {
  readonly templatesDir: string;
  readonly outputDir: string;
}

export function defaultPathsForHome(homeDir: string): DefaultPaths {
  return {
    templatesDir: join(homeDir, "Documents", "EmailBlast", "templates"),
    outputDir: join(homeDir, "Documents", "EmailBlast", "output"),
  };
}
