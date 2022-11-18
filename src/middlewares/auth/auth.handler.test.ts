import { CustomResponse as CustomError } from '../../models/response/Response';
import * as dotenv from 'dotenv';
dotenv.config();
test("should return error response", async () => {
    const err = new CustomError('Ooops, Something went wrong!!');
    expect(err).toBe(err)
})