import * as dotenv from 'dotenv';
dotenv.config();
const str = 'company.repository';
it("should return pong message", () => {
    expect(str).toBe(str)
})