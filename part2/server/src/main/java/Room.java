import javax.persistence.*;
import java.util.List;
import java.util.Random;

enum RoomType {
    SINGLE,
    DOUBLE
}

@Entity
@Access(AccessType.FIELD)
public class Room {
    public static Random rand = new Random();

    public Room(RoomType type, int price) {
        this.roomType = type;
        this.price = price;
    }

    public Room() {
        this(rand.nextBoolean() ? RoomType.SINGLE : RoomType.DOUBLE, 100 + rand.nextInt(100));
    }

    @Id
    @GeneratedValue
    public int id;

    @Column
    public int price;

    @Enumerated(EnumType.ORDINAL)
    public RoomType roomType;

    @OneToMany
    @JoinColumn(name = "bookedRoomId")
    public List<User> users;
}
