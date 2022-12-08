import * as dotenv from 'dotenv';
dotenv.config();
const str = 'shared';
it("should return pong message", async () => {
    expect(str).toBe(str)
})