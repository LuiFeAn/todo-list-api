export interface IBaseUseCase<I, T> {
  execute(dto: I): Promise<T>;
}
