import * as dotenv from 'dotenv';
dotenv.config();
let str = 'issue.repository';
test("/ Chat repository tests", async () => {
    expect(str).toBe(str)
})