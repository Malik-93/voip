import * as dotenv from 'dotenv';
dotenv.config();
const str = 'user.repository';
it("/ Chat repository tests", async () => {
    expect(str).toBe(str)
})