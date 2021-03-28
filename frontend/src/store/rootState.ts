export default interface RootState {
  messages: Array<{
    text: string;
    id: string;
  }>;
}
