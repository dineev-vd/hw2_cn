import javax.persistence.*;
import java.util.Date;

@Entity
public class User {
    public User(String name, String lastName, String cardName, int cvv, Date fromDate, Date toDate, Room bookedRoom) {
        this.bookedRoom = bookedRoom;
        this.fromDate = fromDate;
        this.cvv = cvv;
        this.cardName = cardName;
        this.name = name;
        this.lastName = lastName;
        this.toDate = toDate;
    }

    public User() {

    }


    @Id
    @GeneratedValue
    public int id;

    @Column
    public String name;

    @Column
    public String lastName;

    @Column
    public String cardName;

    @Column
    public int cvv;

    @Column(columnDefinition="DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    public Date fromDate;

    @Column(columnDefinition="DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    public Date toDate;

    @ManyToOne
    public Room bookedRoom;
}
