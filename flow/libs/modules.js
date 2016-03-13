declare module 'lodash' {
  declare function capitalize(str: string): string;
}

declare module 'ramda' {
  declare function pipe(...Fn: any): any;
  declare function replace(reg: RegExp | string, str: string): string;
}

declare module 'redial' {
  declare function provideHooks(): any;
}

declare module 'react-redux' {
  declare function connect(): any;
}
