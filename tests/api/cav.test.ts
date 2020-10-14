import request from "supertest";
import server from "../../index";
import { disconnect as disconnectDb } from "../../src/infra/mongoDB";
import { StatusCodes } from "http-status-codes";

test("GET /cavs should return all CAVs", async () => {
  await request(server)
    .get("/cavs")
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);
});

test.each(["Copacabana", "Vidigal", "Madureira"])(
  "POST /cavs should create a new CAV",
  async (name) => {
    // arrange
    const cav = { name };

    // act
    const response = await request(server)
      .post("/cavs")
      .send(cav)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.CREATED);

    // assert
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name,
    });
  }
);

test.each([undefined, {}, { name: 1 }])(
  "POST /cavs should return bad request when parameter is wrong",
  async (cav) => {
    // act
    await request(server)
      .post("/cavs")
      .send(cav)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.BAD_REQUEST);
  }
);

test.each(["Barra da Tijuca", "Botafogo", "Norte Shopping"])(
  "GET /cavs/:name should return CAV by name",
  async (name) => {
    // act
    const response = await request(server)
      .get(`/cavs/${name}`)
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.OK);

    // assert
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name,
    });
  }
);

test("GET /cavs/:name should return not found when CAV does not exist", async () => {
  // arrange
  const name = "Glória";

  // act
  await request(server)
    .get(`/cavs/${name}`)
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.NOT_FOUND);
});

test("PUT /cavs/:id should update an existent CAV", async () => {
  const oldName = "Barra da Tijuca";
  const newName = "Barra";

  // act
  const response = await request(server)
    .put(`/cavs/${oldName}`)
    .send({ name: newName })
    .expect("Content-Type", "application/json")
    .expect(StatusCodes.OK);

  // assert
  expect(response.body).toMatchObject({
    id: expect.any(Number),
    name: oldName,
  });
});

test.each([
  { oldName: "Catete", newName: "Leblon" },
  { oldName: "Centro", newName: "Leblon" },
  { oldName: "Lapa", newName: "Leblon" },
])(
  "PUT /cavs/:id should return not found when updating inexistent car",
  async ({ oldName, newName }) => {
    // act
    await request(server)
      .put(`/cavs/${oldName}`)
      .send({ name: newName })
      .expect("Content-Type", "application/json")
      .expect(StatusCodes.NOT_FOUND);
  }
);

afterAll(async () => {
  await server.close();
  await disconnectDb();
});
