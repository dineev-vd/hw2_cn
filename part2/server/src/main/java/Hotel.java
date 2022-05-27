import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Access(AccessType.FIELD)
public class Hotel {

    public Hotel(String name, boolean wifi, boolean breakfast, String city) {
        this.name = name;
        this.wifi = wifi;
        this.breakfast = breakfast;
        this.rooms = new ArrayList<>();
        this.city = city;
    }

    public Hotel() {
        this("Hotel Name", false, false, "");
    }

    @Id
    @GeneratedValue
    public int id;

    @Column
    public String name;

    @Column
    public boolean wifi;

    @Column
    public boolean breakfast;

    @Column
    public String city;

    @OneToMany
    @JoinColumn(name = "roomHotelId")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    public List<Room> rooms;

    @Transient
    public int maxPrice;

    @Transient
    public int minPrice;
}
