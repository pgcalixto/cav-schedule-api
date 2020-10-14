import request from "supertest";
import server from "../../index";
import { disconnect as disconnectDb } from "../../src/infra/mongoDB";
import { StatusCodes } from "http-status-codes";

test("GET /schedules should return all schedules", async () => {
  await request(server)
    .get("/cavs")
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);
});

test.each(["2019-07-17", "2019-07-18"])(
  "GET /schedules/:date should return schedules by date",
  async (date) => {
    // act
    const response = await request(server)
      .get(`/schedules/${date}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);

    // assert
    expect(response.body).toMatchObject({ date });
  }
);

test.each([
  { date: "2019-07-17", cav: "Botafogo" },
  { date: "2019-07-18", cav: "Barra da Tijuca" },
])(
  "GET /schedules/:date/:cav should return schedules by date and CAV",
  async ({ date, cav }) => {
    // act
    const response = await request(server)
      .get(`/schedules/${date}/${cav}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);

    // assert
    expect(response.body).toMatchObject({
      date,
      cav: { [cav]: expect.any(Object) },
    });
  }
);

test.each([
  { date: "2019-07-17", cav: "Botafogo", eventType: "inspection" },
  { date: "2019-07-18", cav: "Barra da Tijuca", eventType: "visit" },
])(
  "GET /schedules/:date/:cav/:eventType should return schedules by date, CAV and event type",
  async ({ date, cav, eventType }) => {
    // act
    const response = await request(server)
      .get(`/schedules/${date}/${cav}/${eventType}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);

    // assert
    expect(response.body).toMatchObject({
      date,
      cav: {
        [cav]: {
          [eventType]: expect.any(Object),
        },
      },
    });
  }
);

test.each([
  { date: "2019-07-17", cav: "Botafogo", eventType: "inspection", hour: 11 },
  { date: "2019-07-18", cav: "Barra da Tijuca", eventType: "visit", hour: 17 },
])(
  "GET /schedules/:date/:cav/:eventType/:hour should return schedules by date, CAV, event type and hour",
  async ({ date, cav, eventType, hour }) => {
    // act
    const response = await request(server)
      .get(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);

    // assert
    expect(response.body).toMatchObject({
      date,
      cav: {
        [cav]: {
          [eventType]: {
            [hour]: expect.any(Object),
          },
        },
      },
    });
  }
);

test.each([
  {
    date: "2019-07-17",
    cav: "Botafogo",
    eventType: "inspection",
    hour: 11,
    carId: 1,
  },
  {
    date: "2019-07-18",
    cav: "Barra da Tijuca",
    eventType: "visit",
    hour: 17,
    carId: 3,
  },
])(
  "PUT /schedules/:date/:cav/:eventType/:hour should schedule hour",
  async ({ date, cav, eventType, hour, carId }) => {
    await request(server)
      .put(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .send({ car: carId })
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);
  }
);

test.each([
  {
    date: "2019-07-17",
    cav: "Cosme Velho",
    eventType: "inspection",
    hour: 11,
    carId: 1,
  },
  {
    date: "2019-07-18",
    cav: "Laranjeira",
    eventType: "visit",
    hour: 17,
    carId: 3,
  },
])(
  "PUT /schedules/:date/:cav/:eventType/:hour should return not found when CAV does not exist",
  async ({ date, cav, eventType, hour, carId }) => {
    await request(server)
      .put(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .send({ car: carId })
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.NOT_FOUND);
  }
);

test.each([
  {
    date: "2019-07-17",
    cav: "Botafogo",
    eventType: "inspection",
    hour: 11,
    carId: 98,
  },
  {
    date: "2019-07-18",
    cav: "Barra da Tijuca",
    eventType: "visit",
    hour: 17,
    carId: 98,
  },
])(
  "PUT /schedules/:date/:cav/:eventType/:hour should return not found when CAV does not exist",
  async ({ date, cav, eventType, hour, carId }) => {
    await request(server)
      .put(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .send({ car: carId })
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.NOT_FOUND);
  }
);

test.each([
  {
    date: "2019-07-17",
    cav: "Botafogo",
    eventType: "inspection",
    hour: 11,
    carId: 4,
  },
  {
    date: "2019-07-18",
    cav: "Barra da Tijuca",
    eventType: "visit",
    hour: 17,
    carId: 2,
  },
])(
  "PUT /schedules/:date/:cav/:eventType/:hour should return not found when car is not associated to the CAV",
  async ({ date, cav, eventType, hour, carId }) => {
    await request(server)
      .put(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .send({ car: carId })
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.CONFLICT);
  }
);

test.each([
  {
    date: "2019-07-17",
    cav: "Cosme Velho",
    eventType: "inspection",
    hour: 11,
  },
  {
    date: "2019-07-18",
    cav: "Laranjeira",
    eventType: "visit",
    hour: 17,
  },
])(
  "DELETE /schedules/:date/:cav/:eventType/:hour should clear schedule",
  async ({ date, cav, eventType, hour }) => {
    await request(server)
      .delete(`/schedules/${date}/${cav}/${eventType}/${hour}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);
  }
);

afterAll(async () => {
  await server.close();
  await disconnectDb();
});
