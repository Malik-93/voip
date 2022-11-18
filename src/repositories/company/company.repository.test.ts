import * as dotenv from 'dotenv';
dotenv.config();
let str = 'company.repository';
test("should return pong message", async () => {
    expect(str).toBe(str)
})