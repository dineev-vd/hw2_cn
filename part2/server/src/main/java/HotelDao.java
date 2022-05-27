import org.hibernate.Session;

import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.hibernate.type.IntegerType;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public class HotelDao {
    public void saveHotel(Hotel hotel) {
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

    public List getHotels(Protocol.GetHotelList getHotelList) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            var query = session.createNativeQuery("SELECT Hotel.*, MAX(price) as maxPrice, MIN(price) as minPrice\n" +
                            "from Hotel\n" +
                            "         left join Room R on Hotel.id = R.roomHotelId\n" +
                            "         left join User U on R.id = U.bookedRoomId\n" +
                            "WHERE (Hotel.city LIKE :cityParam) AND (:toParam < U.fromDate OR :fromParam > U.toDate OR U.id IS NULL)\n" +
                            "GROUP BY Hotel.id\n" +
                            "HAVING (maxPrice <= :maxPriceParam OR :maxPriceParam = 0)")
                    .setParameter("maxPriceParam", getHotelList.getMaxPrice())
                    .setParameter("toParam", getHotelList.getToDate())
                    .setParameter("fromParam", getHotelList.getFromDate())
                    .setParameter("cityParam", '%' + getHotelList.getCity() + '%');

            return query.list();
        }
    }
}
