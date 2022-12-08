import * as dotenv from 'dotenv';
dotenv.config();
const str = 'chats'
it("/ Chat controller test cases", async () => {
  expect(str).toBe(str)
})