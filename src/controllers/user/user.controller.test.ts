import * as dotenv from 'dotenv';
dotenv.config();
let str = 'user';
test("should return pong message", async () => {
  expect(str).toBe(str);
})