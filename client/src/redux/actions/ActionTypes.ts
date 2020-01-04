export interface IActionType<T extends string, P> {
  type: T
  payload: P
}