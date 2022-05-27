import org.hibernate.Session;

import java.util.List;

public class RoomDao {
    public List getRooms(Protocol.GetRoomList getRoomList) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            var query = session.createNativeQuery("SELECT Room.*\n" +
                            "from Room\n" +
                            "         left join User U on Room.id = U.bookedRoomId\n" +
                            "WHERE (Room.roomHotelId = :hotelId) AND (:toParam < U.fromDate OR :fromParam > U.toDate OR U.id IS NULL)\n")
                    .setParameter("hotelId",getRoomList.getHotelId())
                    .setParameter("toParam",getRoomList.getToDate())
                    .setParameter("fromParam",getRoomList.getFromDate());

            return query.list();
        }
    }
}
