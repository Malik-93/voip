import * as dotenv from 'dotenv';
dotenv.config();
let str = 'user.repository';
test("/ Chat repository tests", async () => {
    expect(str).toBe(str)
})