import * as dotenv from 'dotenv';
dotenv.config();
const str = 'issue.repository';
it("/ Chat repository tests", async () => {
    expect(str).toBe(str)
})