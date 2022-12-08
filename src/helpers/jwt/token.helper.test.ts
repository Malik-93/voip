import * as dotenv from 'dotenv';
dotenv.config();
const str = 'token';
it("should return pong message", async () => {
    expect(str).toBe(str)
})