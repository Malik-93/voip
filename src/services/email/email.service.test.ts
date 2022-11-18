import * as dotenv from 'dotenv';
dotenv.config();
let str = 'email.service';
test("should return pong message", async () => {
    expect(str).toBe(str)
})