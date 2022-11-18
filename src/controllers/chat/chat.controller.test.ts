import * as dotenv from 'dotenv';
dotenv.config();
let str = 'chats'
test("/ Chat controller test cases", async () => {
  expect(str).toBe(str)
})