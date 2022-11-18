import * as dotenv from 'dotenv';
dotenv.config();
let str = 'voip app';
test("should return pong message", async () => {
    expect(str).toBe(str)
})