import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;

public class ProtoHandler {
    public static void Handle(byte[] msg, ChannelHandlerContext ctx) {
        try {
            Protocol.AnyMessage parsedMessage = Protocol.AnyMessage.parseFrom(msg);


            if (parsedMessage.hasBookHotel()) {
                handleBookHotel(parsedMessage.getBookHotel(), ctx);
                return;
            }

            if (parsedMessage.hasHotelList()) {
                handleHotelList(parsedMessage.getHotelList(), ctx);
                return;
            }

            if (parsedMessage.hasRoomList()) {
                handleRoomList(parsedMessage.getRoomList(), ctx);
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void handleBookHotel(Protocol.BookHotel bookHotel, ChannelHandlerContext ctx) {
        var userDao = new UserDao();
        var resultList = userDao.BookHotel(bookHotel);

        var anyResponseBuilder = Protocol.AnyMessage.newBuilder();
        anyResponseBuilder.setBookHotelResponse(resultList);

        ctx.write(new BinaryWebSocketFrame(Unpooled.wrappedBuffer(anyResponseBuilder.build().toByteArray())));
        ctx.flush();
    }

    public static void handleRoomList(Protocol.GetRoomList getRoomList, ChannelHandlerContext ctx) {
        var roomDao = new RoomDao();
        var resultList = roomDao.getRooms(getRoomList);
        var builder = Protocol.GetRoomListResponse.newBuilder();

        for (var room :
                resultList) {
            var roomToSend = Protocol.Room.newBuilder();
            var object = (Object[]) room;

            roomToSend.setRoomId((Integer) object[0]);
            roomToSend.setPricePerNight((Integer) object[1]);
            roomToSend.setRoomTypeValue((Integer) object[2]);

            builder.addRoomList(roomToSend);
        }

        var anyResponseBuilder = Protocol.AnyMessage.newBuilder();
        anyResponseBuilder.setRoomListResponse(builder);

        ctx.write(new BinaryWebSocketFrame(Unpooled.wrappedBuffer(anyResponseBuilder.build().toByteArray())));
        ctx.flush();
    }


    public static void handleHotelList(Protocol.GetHotelList getHotelList, ChannelHandlerContext ctx) {
        var hotelDao = new HotelDao();
        var resultList = hotelDao.getHotels(getHotelList);
        var builder = Protocol.GetHotelListResponse.newBuilder();

        for (var hotel :
                resultList) {
            var hotelToSend = Protocol.Hotel.newBuilder();
            var object = (Object[]) hotel;

            hotelToSend.setHotelId((Integer) object[0]);
            hotelToSend.setCity((String) object[2]);
            hotelToSend.setBreakfast((Boolean) object[1]);
            hotelToSend.setMaxPrice((Integer) object[6]);
            hotelToSend.setMinPrice((Integer) object[5]);
            hotelToSend.setWifi((Boolean) object[4]);
            hotelToSend.setName((String) object[3]);

            builder.addHotelList(hotelToSend);
        }

        var anyResponseBuilder = Protocol.AnyMessage.newBuilder();
        anyResponseBuilder.setHotelListReponse(builder);

        ctx.write(new BinaryWebSocketFrame(Unpooled.wrappedBuffer(anyResponseBuilder.build().toByteArray())));
        ctx.flush();
    }

    public static void handleRoomList(Protocol.GetRoomList getRoomList) {

    }

    public static void handleBookHotel(Protocol.BookHotel bookHotel) {

    }
}
