import * as dotenv from 'dotenv';
dotenv.config();
const str = 'user.repository';
it("should return pong message", async () => {
    expect(str).toBe(str)
})