import supertest from "supertest";
import app from "../app";

describe("post", () => {
  describe("get post route", () => {
    describe("given the post does not exist", () => {
      it("should return 404", async () => {
        const postId = "post-1234";
        await supertest(app).get(`/api/post${postId}`).expect(404);
      });
    });
  });
});
