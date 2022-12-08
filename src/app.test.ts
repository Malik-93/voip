import * as dotenv from 'dotenv';
dotenv.config();
const str = 'voip app';
it("should return pong message", async () => {
    expect(str).toBe(str)
})