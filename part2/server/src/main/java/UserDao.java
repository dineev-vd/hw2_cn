import org.hibernate.Session;
import org.hibernate.Transaction;

public class UserDao {
    public void saveUser(Hotel hotel) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(hotel);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    public Protocol.BookHotelResponse BookHotel(Protocol.BookHotel bookHotel) {
        RoomDao roomDao = new RoomDao();
        var getRoomsBuilder = Protocol.GetRoomList.newBuilder();
        getRoomsBuilder.setHotelId(bookHotel.getHotelId());
        getRoomsBuilder.setFromDate(bookHotel.getFromDate());
        getRoomsBuilder.setToDate(bookHotel.getToDate());

        var roomList = roomDao.getRooms(getRoomsBuilder.build());
        if(roomList.isEmpty()) {
            var bookHotelResponseBuilder = Protocol.BookHotelResponse.newBuilder();
            bookHotelResponseBuilder.setMessageStatus(Protocol.BookHotelResponse.MessageStatus.FAIL);
            bookHotelResponseBuilder.setMessage("There were no spare rooms in hotel for specified date.");
            return bookHotelResponseBuilder.build();
        }

        Object[] room = (Object[]) (roomList.get(0));
        Integer roomId = (Integer) room[0];

        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            var transaction = session.beginTransaction();
            var query = session.createNativeQuery("INSERT INTO User (id, cardName, cvv, fromDate, lastName, name, toDate, bookedRoomId) \n" +
                            "VALUES (NULL, :cardNameParam, :cvvParam, :fromDateParam, :lastNameParam, :nameParam, :toDateParam, :bookedRoomId)")
                    .setParameter("cardNameParam",bookHotel.getCardNumber())
                    .setParameter("cvvParam",bookHotel.getCvv())
                    .setParameter("fromDateParam",bookHotel.getFromDate())
                    .setParameter("lastNameParam",bookHotel.getSurname())
                    .setParameter("nameParam", bookHotel.getName())
                    .setParameter("bookedRoomId",roomId)
                    .setParameter("toDateParam",bookHotel.getToDate());

            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            var bookHotelResponseBuilder = Protocol.BookHotelResponse.newBuilder();
            bookHotelResponseBuilder.setMessageStatus(Protocol.BookHotelResponse.MessageStatus.FAIL);
            bookHotelResponseBuilder.setMessage(e.getMessage());

            return bookHotelResponseBuilder.build();
        }


        var bookHotelResponseBuilder = Protocol.BookHotelResponse.newBuilder();
        bookHotelResponseBuilder.setMessageStatus(Protocol.BookHotelResponse.MessageStatus.OK);
        bookHotelResponseBuilder.setMessage("Room was successfully booked!");

        return bookHotelResponseBuilder.build();
    }
}
