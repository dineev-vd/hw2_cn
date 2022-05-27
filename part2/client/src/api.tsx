import {
  AnyMessage,
  BookHotel,
  BookHotelResponse,
  GetHotelList,
  GetHotelListResponse,
  GetRoomList,
  GetRoomListResponse,
} from "./protocol";

export class Api {
  private ws!: WebSocket;
  private onHotels: undefined | ((hotelList: GetHotelListResponse) => void);
  private onRooms: undefined | ((roomList: GetRoomListResponse) => void);
  private onBooking: undefined | ((bookingRes: BookHotelResponse) => void);

  constructor() {
    this.ws = new WebSocket("ws://localhost:8080");
    this.ws.onmessage = this.onMessage;
  }

  setOnHotels(onHotels: ((hotelList: GetHotelListResponse) => void)) {
    this.onHotels = onHotels;
    this.ws.onmessage = this.onMessage;
  }

  setOnRooms(onRooms: ((roomList: GetRoomListResponse) => void)) {
    this.onRooms = onRooms;
    this.ws.onmessage = this.onMessage;
  }

  setOnBooking(onBooking: ((bookingRes: BookHotelResponse) => void)) {
    this.onBooking = onBooking;
    this.ws.onmessage = this.onMessage;
  }

  private onMessage = async (msg: MessageEvent) => {
    if (!(msg.data instanceof Blob)) return;

    const parsedMessage = AnyMessage.decode(new Uint8Array(await msg.data.arrayBuffer()));
    console.log(this.onHotels)

    if (parsedMessage.bookHotelResponse && this.onBooking) {
      this.onBooking(parsedMessage.bookHotelResponse);
      return;
    }

    if (parsedMessage.hotelListReponse && this.onHotels) {
      this.onHotels(parsedMessage.hotelListReponse);
      return;
    }

    if (parsedMessage.roomListResponse && this.onRooms) {
      this.onRooms(parsedMessage.roomListResponse);
      return;
    }
  }

  getAllHotels(params: GetHotelList) {
    const anyRequest = AnyMessage.fromPartial({ hotelList: params });
    this.ws.send(AnyMessage.encode(anyRequest).finish());
  }

  getRooms(params: GetRoomList) {
    const anyRequest = AnyMessage.fromPartial({ roomList: params });
    this.ws.send(AnyMessage.encode(anyRequest).finish());
  }

  bookRoom(params: BookHotel) {
    const anyRequest = AnyMessage.fromPartial({ bookHotel: params });
    this.ws.send(AnyMessage.encode(anyRequest).finish());
  }
}
