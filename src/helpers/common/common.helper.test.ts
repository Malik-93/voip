import * as dotenv from 'dotenv';
dotenv.config();
let str = 'shared';
test("should return pong message", async () => {
    expect(str).toBe(str)
})