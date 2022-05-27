import React, { useEffect, useState } from "react";
import { Api } from "./api";
import {
  BookHotelResponse,
  BookHotelResponse_MessageStatus
} from "./protocol";
import "./HotelsComponent.css";

const BookingComponent: React.FC<{ api: Api }> = ({ api }) => {
  const [res, setRes] = useState<BookHotelResponse>();

  const [hotelId, setHotelId] = useState<number>(0);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cvv, setCvv] = useState<number>(0);

  useEffect(() => {
    console.log(api);
    api.setOnBooking((bookingRes) => {
      setRes(bookingRes);
    });
  }, []);

  function getRooms(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.bookRoom({
      hotelId: hotelId,
      fromDate: fromDate.valueOf(),
      toDate: toDate.valueOf(),
      name: name,
      surname: lastName,
      cardNumber: cardNumber,
      cvv: cvv,
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
          <input
            type={"number"}
            onChange={(e) => setHotelId(Number(e.target.value))}
          ></input>
          Name:
          <input
            onChange={(e) => setName(e.target.value)}
          ></input>
          Surname:
          <input
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          Card number:
          <input
            onChange={(e) => setCardNumber(e.target.value)}
          ></input>
          CVV:
          <input
            type={"number"}
            onChange={(e) => setCvv(Number(e.target.value))}
          ></input>
          <button type="submit">Find</button>
        </form>
      </div>
      <div className="hotel-list">
        {res && (
          <div>
            <div>
              {res.messageStatus == BookHotelResponse_MessageStatus.FAIL
                ? "Ошибка при попытке забронировать комнату"
                : "Комната забронирована успешно!"}
            </div>
            <div>{res.message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
