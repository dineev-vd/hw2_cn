import React, { useEffect, useState } from "react";
import { Api } from "./api";
import { GetHotelListResponse, GetRoomListResponse, Room_RoomType } from "./protocol";
import "./HotelsComponent.css";

const RoomComponent: React.FC<{ api: Api }> = ({ api }) => {
  const [rooms, setRooms] = useState<GetRoomListResponse>();

  const [hotelId, setHotelId] = useState<number>(0);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(api);
    api.setOnRooms((roomList) => {
      setRooms(roomList);
    });
    console.log(api);
  }, []);

  function getRooms(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.getRooms({
      hotelId: hotelId,
      fromDate: fromDate.valueOf(),
      toDate: toDate.valueOf(),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: "1 1 auto", width: "100%" }}>
        <form
          onSubmit={(e) => getRooms(e)}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "200px",
          }}
        >
          From:
          <input
            type={"date"}
            onChange={(e) => setFromDate(new Date(e.target.value))}
          ></input>
          To:
          <input
            type={"date"}
            onChange={(e) => setToDate(new Date(e.target.value))}
          ></input>
          Hotel ID:
          <input type={'number'} onChange={(e) => setHotelId(Number(e.target.value))}></input>
          <button type="submit">Find</button>
        </form>
      </div>
      <div className="hotel-list">
        {rooms &&
          rooms.roomList &&
          rooms.roomList.length > 0 &&
          rooms.roomList.map((room) => (
            <div>
              <div>
                Id
                <div>{room.roomId}</div>
              </div>
              <div>
                Name:
                <div>{room.roomType == Room_RoomType.DOUBLE ? "Double bed" : "Single bed"}</div>
              </div>
              <div>
                Price:
                <div>{room.pricePerNight + '$'}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomComponent;
