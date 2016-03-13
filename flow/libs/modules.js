declare module 'lodash' {
  declare function capitalize(str: string): string;
}

declare module 'ramda' {
  declare function pipe(...Fn: any): any;
  declare function replace(reg: RegExp | string, str: string): string;
  declare function propEq(_: any): any;
  declare function findIndex(_: any): any;
  declare function update(_: any): any;
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
