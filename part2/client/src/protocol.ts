/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Hotel {
  hotelId: number;
  name: string;
  maxPrice: number;
  minPrice: number;
  wifi: boolean;
  breakfast: boolean;
  city: string;
}

export interface Room {
  roomId: number;
  roomType: Room_RoomType;
  pricePerNight: number;
}

export enum Room_RoomType {
  SINGLE = 0,
  DOUBLE = 1,
  UNRECOGNIZED = -1,
}

export function room_RoomTypeFromJSON(object: any): Room_RoomType {
  switch (object) {
    case 0:
    case "SINGLE":
      return Room_RoomType.SINGLE;
    case 1:
    case "DOUBLE":
      return Room_RoomType.DOUBLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Room_RoomType.UNRECOGNIZED;
  }
}

export function room_RoomTypeToJSON(object: Room_RoomType): string {
  switch (object) {
    case Room_RoomType.SINGLE:
      return "SINGLE";
    case Room_RoomType.DOUBLE:
      return "DOUBLE";
    case Room_RoomType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetHotelList {
  fromDate: number;
  toDate: number;
  city: string;
  maxPrice: number;
}

export interface GetHotelListResponse {
  hotelList: Hotel[];
}

export interface GetRoomList {
  fromDate: number;
  toDate: number;
  hotelId: number;
}

export interface GetRoomListResponse {
  roomList: Room[];
}

export interface BookHotel {
  hotelId: number;
  fromDate: number;
  toDate: number;
  name: string;
  surname: string;
  cardNumber: string;
  cvv: number;
}

export interface BookHotelResponse {
  messageStatus: BookHotelResponse_MessageStatus;
  message: string;
}

export enum BookHotelResponse_MessageStatus {
  OK = 0,
  FAIL = 1,
  UNRECOGNIZED = -1,
}

export function bookHotelResponse_MessageStatusFromJSON(
  object: any
): BookHotelResponse_MessageStatus {
  switch (object) {
    case 0:
    case "OK":
      return BookHotelResponse_MessageStatus.OK;
    case 1:
    case "FAIL":
      return BookHotelResponse_MessageStatus.FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BookHotelResponse_MessageStatus.UNRECOGNIZED;
  }
}

export function bookHotelResponse_MessageStatusToJSON(
  object: BookHotelResponse_MessageStatus
): string {
  switch (object) {
    case BookHotelResponse_MessageStatus.OK:
      return "OK";
    case BookHotelResponse_MessageStatus.FAIL:
      return "FAIL";
    case BookHotelResponse_MessageStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AnyMessage {
  hotelList?: GetHotelList | undefined;
  roomList?: GetRoomList | undefined;
  bookHotel?: BookHotel | undefined;
  hotelListReponse?: GetHotelListResponse | undefined;
  roomListResponse?: GetRoomListResponse | undefined;
  bookHotelResponse?: BookHotelResponse | undefined;
}

function createBaseHotel(): Hotel {
  return {
    hotelId: 0,
    name: "",
    maxPrice: 0,
    minPrice: 0,
    wifi: false,
    breakfast: false,
    city: "",
  };
}

export const Hotel = {
  encode(message: Hotel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hotelId !== 0) {
      writer.uint32(8).int32(message.hotelId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.maxPrice !== 0) {
      writer.uint32(24).int32(message.maxPrice);
    }
    if (message.minPrice !== 0) {
      writer.uint32(32).int32(message.minPrice);
    }
    if (message.wifi === true) {
      writer.uint32(40).bool(message.wifi);
    }
    if (message.breakfast === true) {
      writer.uint32(48).bool(message.breakfast);
    }
    if (message.city !== "") {
      writer.uint32(58).string(message.city);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hotel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHotel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hotelId = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.maxPrice = reader.int32();
          break;
        case 4:
          message.minPrice = reader.int32();
          break;
        case 5:
          message.wifi = reader.bool();
          break;
        case 6:
          message.breakfast = reader.bool();
          break;
        case 7:
          message.city = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Hotel {
    return {
      hotelId: isSet(object.hotelId) ? Number(object.hotelId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      maxPrice: isSet(object.maxPrice) ? Number(object.maxPrice) : 0,
      minPrice: isSet(object.minPrice) ? Number(object.minPrice) : 0,
      wifi: isSet(object.wifi) ? Boolean(object.wifi) : false,
      breakfast: isSet(object.breakfast) ? Boolean(object.breakfast) : false,
      city: isSet(object.city) ? String(object.city) : "",
    };
  },

  toJSON(message: Hotel): unknown {
    const obj: any = {};
    message.hotelId !== undefined &&
      (obj.hotelId = Math.round(message.hotelId));
    message.name !== undefined && (obj.name = message.name);
    message.maxPrice !== undefined &&
      (obj.maxPrice = Math.round(message.maxPrice));
    message.minPrice !== undefined &&
      (obj.minPrice = Math.round(message.minPrice));
    message.wifi !== undefined && (obj.wifi = message.wifi);
    message.breakfast !== undefined && (obj.breakfast = message.breakfast);
    message.city !== undefined && (obj.city = message.city);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Hotel>, I>>(object: I): Hotel {
    const message = createBaseHotel();
    message.hotelId = object.hotelId ?? 0;
    message.name = object.name ?? "";
    message.maxPrice = object.maxPrice ?? 0;
    message.minPrice = object.minPrice ?? 0;
    message.wifi = object.wifi ?? false;
    message.breakfast = object.breakfast ?? false;
    message.city = object.city ?? "";
    return message;
  },
};

function createBaseRoom(): Room {
  return { roomId: 0, roomType: 0, pricePerNight: 0 };
}

export const Room = {
  encode(message: Room, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.roomId !== 0) {
      writer.uint32(8).int32(message.roomId);
    }
    if (message.roomType !== 0) {
      writer.uint32(16).int32(message.roomType);
    }
    if (message.pricePerNight !== 0) {
      writer.uint32(24).int32(message.pricePerNight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Room {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roomId = reader.int32();
          break;
        case 2:
          message.roomType = reader.int32() as any;
          break;
        case 3:
          message.pricePerNight = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Room {
    return {
      roomId: isSet(object.roomId) ? Number(object.roomId) : 0,
      roomType: isSet(object.roomType)
        ? room_RoomTypeFromJSON(object.roomType)
        : 0,
      pricePerNight: isSet(object.pricePerNight)
        ? Number(object.pricePerNight)
        : 0,
    };
  },

  toJSON(message: Room): unknown {
    const obj: any = {};
    message.roomId !== undefined && (obj.roomId = Math.round(message.roomId));
    message.roomType !== undefined &&
      (obj.roomType = room_RoomTypeToJSON(message.roomType));
    message.pricePerNight !== undefined &&
      (obj.pricePerNight = Math.round(message.pricePerNight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Room>, I>>(object: I): Room {
    const message = createBaseRoom();
    message.roomId = object.roomId ?? 0;
    message.roomType = object.roomType ?? 0;
    message.pricePerNight = object.pricePerNight ?? 0;
    return message;
  },
};

function createBaseGetHotelList(): GetHotelList {
  return { fromDate: 0, toDate: 0, city: "", maxPrice: 0 };
}

export const GetHotelList = {
  encode(
    message: GetHotelList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fromDate !== 0) {
      writer.uint32(8).int64(message.fromDate);
    }
    if (message.toDate !== 0) {
      writer.uint32(16).int64(message.toDate);
    }
    if (message.city !== "") {
      writer.uint32(26).string(message.city);
    }
    if (message.maxPrice !== 0) {
      writer.uint32(32).int32(message.maxPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHotelList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHotelList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromDate = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.toDate = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.city = reader.string();
          break;
        case 4:
          message.maxPrice = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetHotelList {
    return {
      fromDate: isSet(object.fromDate) ? Number(object.fromDate) : 0,
      toDate: isSet(object.toDate) ? Number(object.toDate) : 0,
      city: isSet(object.city) ? String(object.city) : "",
      maxPrice: isSet(object.maxPrice) ? Number(object.maxPrice) : 0,
    };
  },

  toJSON(message: GetHotelList): unknown {
    const obj: any = {};
    message.fromDate !== undefined &&
      (obj.fromDate = Math.round(message.fromDate));
    message.toDate !== undefined && (obj.toDate = Math.round(message.toDate));
    message.city !== undefined && (obj.city = message.city);
    message.maxPrice !== undefined &&
      (obj.maxPrice = Math.round(message.maxPrice));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetHotelList>, I>>(
    object: I
  ): GetHotelList {
    const message = createBaseGetHotelList();
    message.fromDate = object.fromDate ?? 0;
    message.toDate = object.toDate ?? 0;
    message.city = object.city ?? "";
    message.maxPrice = object.maxPrice ?? 0;
    return message;
  },
};

function createBaseGetHotelListResponse(): GetHotelListResponse {
  return { hotelList: [] };
}

export const GetHotelListResponse = {
  encode(
    message: GetHotelListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.hotelList) {
      Hotel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetHotelListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHotelListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hotelList.push(Hotel.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetHotelListResponse {
    return {
      hotelList: Array.isArray(object?.hotelList)
        ? object.hotelList.map((e: any) => Hotel.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetHotelListResponse): unknown {
    const obj: any = {};
    if (message.hotelList) {
      obj.hotelList = message.hotelList.map((e) =>
        e ? Hotel.toJSON(e) : undefined
      );
    } else {
      obj.hotelList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetHotelListResponse>, I>>(
    object: I
  ): GetHotelListResponse {
    const message = createBaseGetHotelListResponse();
    message.hotelList =
      object.hotelList?.map((e) => Hotel.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetRoomList(): GetRoomList {
  return { fromDate: 0, toDate: 0, hotelId: 0 };
}

export const GetRoomList = {
  encode(
    message: GetRoomList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fromDate !== 0) {
      writer.uint32(8).int64(message.fromDate);
    }
    if (message.toDate !== 0) {
      writer.uint32(16).int64(message.toDate);
    }
    if (message.hotelId !== 0) {
      writer.uint32(24).int32(message.hotelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRoomList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRoomList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromDate = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.toDate = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.hotelId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRoomList {
    return {
      fromDate: isSet(object.fromDate) ? Number(object.fromDate) : 0,
      toDate: isSet(object.toDate) ? Number(object.toDate) : 0,
      hotelId: isSet(object.hotelId) ? Number(object.hotelId) : 0,
    };
  },

  toJSON(message: GetRoomList): unknown {
    const obj: any = {};
    message.fromDate !== undefined &&
      (obj.fromDate = Math.round(message.fromDate));
    message.toDate !== undefined && (obj.toDate = Math.round(message.toDate));
    message.hotelId !== undefined &&
      (obj.hotelId = Math.round(message.hotelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRoomList>, I>>(
    object: I
  ): GetRoomList {
    const message = createBaseGetRoomList();
    message.fromDate = object.fromDate ?? 0;
    message.toDate = object.toDate ?? 0;
    message.hotelId = object.hotelId ?? 0;
    return message;
  },
};

function createBaseGetRoomListResponse(): GetRoomListResponse {
  return { roomList: [] };
}

export const GetRoomListResponse = {
  encode(
    message: GetRoomListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.roomList) {
      Room.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRoomListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRoomListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roomList.push(Room.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRoomListResponse {
    return {
      roomList: Array.isArray(object?.roomList)
        ? object.roomList.map((e: any) => Room.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetRoomListResponse): unknown {
    const obj: any = {};
    if (message.roomList) {
      obj.roomList = message.roomList.map((e) =>
        e ? Room.toJSON(e) : undefined
      );
    } else {
      obj.roomList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetRoomListResponse>, I>>(
    object: I
  ): GetRoomListResponse {
    const message = createBaseGetRoomListResponse();
    message.roomList = object.roomList?.map((e) => Room.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBookHotel(): BookHotel {
  return {
    hotelId: 0,
    fromDate: 0,
    toDate: 0,
    name: "",
    surname: "",
    cardNumber: "",
    cvv: 0,
  };
}

export const BookHotel = {
  encode(
    message: BookHotel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hotelId !== 0) {
      writer.uint32(8).int32(message.hotelId);
    }
    if (message.fromDate !== 0) {
      writer.uint32(16).int64(message.fromDate);
    }
    if (message.toDate !== 0) {
      writer.uint32(24).int64(message.toDate);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.surname !== "") {
      writer.uint32(42).string(message.surname);
    }
    if (message.cardNumber !== "") {
      writer.uint32(50).string(message.cardNumber);
    }
    if (message.cvv !== 0) {
      writer.uint32(56).int32(message.cvv);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookHotel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookHotel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hotelId = reader.int32();
          break;
        case 2:
          message.fromDate = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.toDate = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.surname = reader.string();
          break;
        case 6:
          message.cardNumber = reader.string();
          break;
        case 7:
          message.cvv = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookHotel {
    return {
      hotelId: isSet(object.hotelId) ? Number(object.hotelId) : 0,
      fromDate: isSet(object.fromDate) ? Number(object.fromDate) : 0,
      toDate: isSet(object.toDate) ? Number(object.toDate) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      surname: isSet(object.surname) ? String(object.surname) : "",
      cardNumber: isSet(object.cardNumber) ? String(object.cardNumber) : "",
      cvv: isSet(object.cvv) ? Number(object.cvv) : 0,
    };
  },

  toJSON(message: BookHotel): unknown {
    const obj: any = {};
    message.hotelId !== undefined &&
      (obj.hotelId = Math.round(message.hotelId));
    message.fromDate !== undefined &&
      (obj.fromDate = Math.round(message.fromDate));
    message.toDate !== undefined && (obj.toDate = Math.round(message.toDate));
    message.name !== undefined && (obj.name = message.name);
    message.surname !== undefined && (obj.surname = message.surname);
    message.cardNumber !== undefined && (obj.cardNumber = message.cardNumber);
    message.cvv !== undefined && (obj.cvv = Math.round(message.cvv));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookHotel>, I>>(
    object: I
  ): BookHotel {
    const message = createBaseBookHotel();
    message.hotelId = object.hotelId ?? 0;
    message.fromDate = object.fromDate ?? 0;
    message.toDate = object.toDate ?? 0;
    message.name = object.name ?? "";
    message.surname = object.surname ?? "";
    message.cardNumber = object.cardNumber ?? "";
    message.cvv = object.cvv ?? 0;
    return message;
  },
};

function createBaseBookHotelResponse(): BookHotelResponse {
  return { messageStatus: 0, message: "" };
}

export const BookHotelResponse = {
  encode(
    message: BookHotelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageStatus !== 0) {
      writer.uint32(8).int32(message.messageStatus);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookHotelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBookHotelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageStatus = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BookHotelResponse {
    return {
      messageStatus: isSet(object.messageStatus)
        ? bookHotelResponse_MessageStatusFromJSON(object.messageStatus)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: BookHotelResponse): unknown {
    const obj: any = {};
    message.messageStatus !== undefined &&
      (obj.messageStatus = bookHotelResponse_MessageStatusToJSON(
        message.messageStatus
      ));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BookHotelResponse>, I>>(
    object: I
  ): BookHotelResponse {
    const message = createBaseBookHotelResponse();
    message.messageStatus = object.messageStatus ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseAnyMessage(): AnyMessage {
  return {
    hotelList: undefined,
    roomList: undefined,
    bookHotel: undefined,
    hotelListReponse: undefined,
    roomListResponse: undefined,
    bookHotelResponse: undefined,
  };
}

export const AnyMessage = {
  encode(
    message: AnyMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hotelList !== undefined) {
      GetHotelList.encode(message.hotelList, writer.uint32(10).fork()).ldelim();
    }
    if (message.roomList !== undefined) {
      GetRoomList.encode(message.roomList, writer.uint32(18).fork()).ldelim();
    }
    if (message.bookHotel !== undefined) {
      BookHotel.encode(message.bookHotel, writer.uint32(26).fork()).ldelim();
    }
    if (message.hotelListReponse !== undefined) {
      GetHotelListResponse.encode(
        message.hotelListReponse,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.roomListResponse !== undefined) {
      GetRoomListResponse.encode(
        message.roomListResponse,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.bookHotelResponse !== undefined) {
      BookHotelResponse.encode(
        message.bookHotelResponse,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnyMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hotelList = GetHotelList.decode(reader, reader.uint32());
          break;
        case 2:
          message.roomList = GetRoomList.decode(reader, reader.uint32());
          break;
        case 3:
          message.bookHotel = BookHotel.decode(reader, reader.uint32());
          break;
        case 4:
          message.hotelListReponse = GetHotelListResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.roomListResponse = GetRoomListResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.bookHotelResponse = BookHotelResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnyMessage {
    return {
      hotelList: isSet(object.hotelList)
        ? GetHotelList.fromJSON(object.hotelList)
        : undefined,
      roomList: isSet(object.roomList)
        ? GetRoomList.fromJSON(object.roomList)
        : undefined,
      bookHotel: isSet(object.bookHotel)
        ? BookHotel.fromJSON(object.bookHotel)
        : undefined,
      hotelListReponse: isSet(object.hotelListReponse)
        ? GetHotelListResponse.fromJSON(object.hotelListReponse)
        : undefined,
      roomListResponse: isSet(object.roomListResponse)
        ? GetRoomListResponse.fromJSON(object.roomListResponse)
        : undefined,
      bookHotelResponse: isSet(object.bookHotelResponse)
        ? BookHotelResponse.fromJSON(object.bookHotelResponse)
        : undefined,
    };
  },

  toJSON(message: AnyMessage): unknown {
    const obj: any = {};
    message.hotelList !== undefined &&
      (obj.hotelList = message.hotelList
        ? GetHotelList.toJSON(message.hotelList)
        : undefined);
    message.roomList !== undefined &&
      (obj.roomList = message.roomList
        ? GetRoomList.toJSON(message.roomList)
        : undefined);
    message.bookHotel !== undefined &&
      (obj.bookHotel = message.bookHotel
        ? BookHotel.toJSON(message.bookHotel)
        : undefined);
    message.hotelListReponse !== undefined &&
      (obj.hotelListReponse = message.hotelListReponse
        ? GetHotelListResponse.toJSON(message.hotelListReponse)
        : undefined);
    message.roomListResponse !== undefined &&
      (obj.roomListResponse = message.roomListResponse
        ? GetRoomListResponse.toJSON(message.roomListResponse)
        : undefined);
    message.bookHotelResponse !== undefined &&
      (obj.bookHotelResponse = message.bookHotelResponse
        ? BookHotelResponse.toJSON(message.bookHotelResponse)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AnyMessage>, I>>(
    object: I
  ): AnyMessage {
    const message = createBaseAnyMessage();
    message.hotelList =
      object.hotelList !== undefined && object.hotelList !== null
        ? GetHotelList.fromPartial(object.hotelList)
        : undefined;
    message.roomList =
      object.roomList !== undefined && object.roomList !== null
        ? GetRoomList.fromPartial(object.roomList)
        : undefined;
    message.bookHotel =
      object.bookHotel !== undefined && object.bookHotel !== null
        ? BookHotel.fromPartial(object.bookHotel)
        : undefined;
    message.hotelListReponse =
      object.hotelListReponse !== undefined && object.hotelListReponse !== null
        ? GetHotelListResponse.fromPartial(object.hotelListReponse)
        : undefined;
    message.roomListResponse =
      object.roomListResponse !== undefined && object.roomListResponse !== null
        ? GetRoomListResponse.fromPartial(object.roomListResponse)
        : undefined;
    message.bookHotelResponse =
      object.bookHotelResponse !== undefined &&
      object.bookHotelResponse !== null
        ? BookHotelResponse.fromPartial(object.bookHotelResponse)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
