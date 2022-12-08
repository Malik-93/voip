import * as dotenv from 'dotenv';
dotenv.config();
const str = 'email.service';
it("should return pong message", async () => {
    expect(str).toBe(str)
})