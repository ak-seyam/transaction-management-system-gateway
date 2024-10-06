export default interface PSPRouterService<T> {
  acceptEvent(rawBody: Buffer, event: T): Promise<void>;
}
