import request from "supertest";
import server from "../../index";
import { disconnect as disconnectDb } from "../../src/infra/mongoDB";
import { StatusCodes } from "http-status-codes";

test("GET /cars should return all cars", async () => {
  await request(server)
    .get("/cars")
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);
});

test("POST /cars should create a new car", async () => {
  // arrange
  const car = {
    brand: "VW",
    model: "Kombi",
    cav: "Barra da Tijuca",
  };

  // act
  const response = await request(server)
    .post("/cars")
    .send(car)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.CREATED);

  // assert
  expect(response.body).toMatchObject(car);
});

test.each([
  { brand: "Ford", model: "Focus" },
  { brand: "Ford", cav: "Botafogo" },
  { model: "Focus", cav: "Botafogo" },
])(
  "POST /cars should return bad request when a parameter is missing",
  async (car) => {
    // act
    await request(server)
      .post("/cars")
      .send(car)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.BAD_REQUEST);
  }
);

test("POST /cars should return bad request when a parameter is missing", async () => {
  // arrange
  const car = {
    brand: "VW",
    model: "Celta",
    cav: "Glória",
  };

  // act
  await request(server)
    .post("/cars")
    .send(car)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.NOT_FOUND);
});

test("GET /cars/:id should return car by ID", async () => {
  // arrange
  const expectedCar = {
    id: 1,
    brand: "VW",
    model: "Golf",
    cav: "Botafogo",
  };

  // act
  const response = await request(server)
    .get("/cars/1")
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);

  // assert
  expect(response.body).toMatchObject(expectedCar);
});

test("GET /cars/:id should return not found when car does not exist", async () => {
  // act
  await request(server)
    .get("/cars/999")
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.NOT_FOUND);
});

test.each([
  { brand: "VW", model: "Celta", cav: "Barra da Tijuca" },
  { brand: "Fiat", model: "Uno", cav: "Botafogo" },
  { brand: "VW", model: "Ônix", cav: "Norte Shopping" },
])("PUT /cars/:id should update an existent car", async (car) => {
  // act
  const response = await request(server)
    .put("/cars/1")
    .send(car)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);

  // assert
  expect(response.body).toMatchObject({
    id: 1,
    brand: expect.any(String),
    cav: expect.any(String),
    model: expect.any(String),
  });
});

test("PUT /cars/:id should return not found when updating inexistent car", async () => {
  // arrange
  const car = {
    brand: "Fiat",
    model: "Uno",
    cav: "Botafogo",
  };

  // act
  await request(server)
    .put("/cars/999")
    .send(car)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.NOT_FOUND);
});

test("PUT /cars/:id should return not found when cav does not exist", async () => {
  // arrange
  const car = {
    brand: "Fiat",
    model: "Uno",
    cav: "Glória",
  };

  // act
  await request(server)
    .put("/cars/1")
    .send(car)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.NOT_FOUND);
});

afterAll(async () => {
  await server.close();
  await disconnectDb();
});
