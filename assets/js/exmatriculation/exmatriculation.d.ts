/* tslint:disable */
/* eslint-disable */
/**
*/
export class PreparedDocument {
  free(): void;
/**
* @param {Uint8Array} font
*/
  constructor(font: Uint8Array);
/**
* @param {string} firstname
* @param {string} lastname
* @returns {Uint8Array}
*/
  personalize_pdf(firstname: string, lastname: string): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_prepareddocument_free: (a: number) => void;
  readonly prepareddocument_from: (a: number, b: number) => number;
  readonly prepareddocument_personalize_pdf: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
