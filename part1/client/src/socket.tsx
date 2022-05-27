export class ImgSocket {
  private socket: WebSocket;

  constructor(
    onMessage: (msg: MessageEvent) => void,
    onConnected: (event: Event) => void
  ) {
    this.socket = new WebSocket("ws://localhost:8080");

    this.socket.onmessage = onMessage;
    this.socket.onopen = onConnected;
    this.socket.onerror = onConnected;
    this.socket.onclose = onConnected;
  }

  public sendImageRequest(imageName: string) {
    this.socket.send(imageName);
  }
}
