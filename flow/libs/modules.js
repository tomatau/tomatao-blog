declare module 'lodash' {
  declare function capitalize(str: string): string;
  declare function mapKeys(_: any): any;
}

declare module 'ramda' {
  declare function pipe(...Fn: any): any;
  declare function replace(reg: RegExp | string, str: string): Function;
  declare function propEq(_: any): any;
  declare function findIndex(_: any): any;
  declare function update(_: any): any;
  declare function intersperse(_: any): any;
  declare function split(_: any): any;
  declare function trim(_: any): any;
  declare function map(_: any): any;
  declare function noop(_: any): any;
  declare function isEmpty(_: any): boolean;
  declare function addIndex(_: any): boolean;
  declare function filter(_: any): boolean;
  declare function identity(_: any): boolean;
}

declare module 'redial' {
  declare function provideHooks(): any;
}

declare module 'react-redux' {
  declare function connect(): any;
}

declare module 'meta-marked' {
  declare function exports(args: any): any;
}

declare module 'classnames' {
  declare function exports(...args: any): string;
}

declare module 'react-document-meta' {
  declare function exports(...args: any): any;
}

declare module 'CSSModule' {
  declare var exports: { [key: string]: string };
}

declare module 'prismjs' {
  declare function highlightAll(args: any): any;
}
