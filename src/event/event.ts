import { createEvent } from 'watch-state'

export function event <This, Args extends any[], Result = unknown> (
  target: (this: This, ...args: Args) => Result,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>
)
export function event <This, Args extends any[]> (
  target: (this: This, value: Args[0]) => void,
  context: ClassSetterDecoratorContext<This, Args[0]>
)
export function event <This, Args extends any[], Result = unknown> (
  target: undefined,
  context: ClassFieldDecoratorContext<This, (...args: Args) => Result>
)
export function event <This, Args extends any[], Result = unknown> (
  target: ((this: This, ...args: Args) => Result) | ((this: This, value: Args[0]) => Result) | undefined,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>
  | ClassSetterDecoratorContext<This, Args[0]>
  | ClassFieldDecoratorContext<This, (this: This, ...args: Args) => Result>,
) {
  return context.kind === 'field' ? createEvent : createEvent(target)
}
