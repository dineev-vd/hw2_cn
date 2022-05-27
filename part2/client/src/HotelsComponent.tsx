import React, { useEffect, useState } from "react";
import { Api } from "./api";
import { GetHotelListResponse } from "./protocol";
import "./HotelsComponent.css";

const HotelsComponent: React.FC<{ api: Api }> = ({ api }) => {
  const [hotels, setHotels] = useState<GetHotelListResponse>();

  const [city, setCity] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    console.log(api)
    api.setOnHotels((hotelList) => {
      console.log(hotelList)
      setHotels(hotelList);
    });
    console.log(api)

  }, []);

  function getAllHotels(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api.getAllHotels({
      city: city,
      fromDate: fromDate.valueOf(),
      maxPrice: maxPrice,
      toDate: toDate.valueOf(),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{flex: "1 1 auto", width:"100%"}}>
        <form onSubmit={(e) => getAllHotels(e)} style={{display: "flex", flexDirection: "column", maxWidth: "200px"}}>
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
          City:
          <input onChange={(e) => setCity(e.target.value)}></input>
          Max price:
          <input type={'number'} onChange={(e) => setMaxPrice(Number(e.target.value))}></input>
          <button type="submit">Find</button>
        </form>
      </div>
      <div className="hotel-list">
        {hotels &&
          hotels.hotelList &&
          hotels.hotelList.length > 0 &&
          hotels.hotelList.map((hotel) => (
            <div>
              <div>
                Id
                <div>{hotel.hotelId}</div>
              </div>
              <div>
                Name:
                <div>{hotel.name}</div>
              </div>
              <div>
                City:
                <div>{hotel.city}</div>
              </div>
              <div>
                Max price:
                <div>{hotel.maxPrice}</div>
              </div>
              <div>
                Min price:
                <div>{hotel.minPrice}</div>
              </div>
              <div>
                Wifi:
                <div>{hotel.wifi ? "Yes" : "No"}</div>
              </div>
              <div>
                Breakfast
                <div>{hotel.breakfast ? "Yes" : "No"}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelsComponent;
