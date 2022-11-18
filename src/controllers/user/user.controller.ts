import { CODES } from './../../constants/voip.constants';
import { _AuthCompany, _AuthUser } from './../../types/common/common.type';
import { _MongoError, _MongooseError } from '../../types/common/common.type';
import { generate_jwt } from '../../helpers/jwt/token.helper';
import { controller_catch_error } from '../../helpers/error/error.helper';
import { ILoginUserRequest, IRegisterUserRequest, IUser, IUserLoginResponse, IUserProfileRequest, IUserResponse } from '../../interfaces/user/user.interface';
import { Post, Tags, Route, Body, Security, Request, Example } from "tsoa";
import UserRepo from '../../repositories/user';
const { user_repo_register, user_repo_find, user_repo_login, user_repo_update_profile } = UserRepo;
@Tags("Users")
@Route("/api/v1/users")
class CompanyController {
    @Security("api_key")
    @Post("/register")

    public async register_user(@Body() body: IRegisterUserRequest, @Request() auth_company: _AuthCompany): Promise<IUserResponse> {
        try {
            let result: IUserResponse = {};
            const isExist = await user_repo_find('email', body.email);
            if (isExist) {
                result = {
                    message: `User having email ${body.email} already exist!!`,
                    statusCode: CODES.API.STATUS_BAD_REQUEST,
                }
            } else {
                const data = await user_repo_register({ ...body, auth_company });
                const authToken = generate_jwt(data, `${process.env.USER_JWT_SECRET}`, `${process.env.USER_JWT_EXPIRES_IN}`)
                result = {
                    message: `User created successfully!!`,
                    user_id: data.user_id,
                    authToken,
                    statusCode: CODES.API.STATUS_RECORD_CREATED,

                };
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Post("/login")
    @Example<ILoginUserRequest>({
        email: "customeruser@gmail.com",
        password: "1234"
    })
    public async login_user(@Body() body: ILoginUserRequest): Promise<IUserResponse> {
        try {
            const userData = <IUser & IUserLoginResponse>await user_repo_login(body)
            const { user_name, first_name, last_name, email, _id, namespace, isMatched, socket_id, company_id } = userData;
            let result = {};
            const user_id = _id;
            if (!user_id) {
                result = {
                    message: `User not found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                };
            }
            else if (!isMatched) {
                result = {
                    message: `Incorrect email or password!!`,
                    statusCode: CODES.API.STATUS_BAD_REQUEST,
                };
            } else {
                const authToken = generate_jwt({ user_id, namespace, user_name, first_name, last_name, email, socket_id, company_id }, `${process.env.USER_JWT_SECRET}`, `${process.env.USER_JWT_EXPIRES_IN}`)
                result = {
                    message: `User logged in successfully!!`,
                    authToken,
                    user_id,
                    namespace

                };
            }
            return result
        } catch (error) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Post("/profile_update")
    @Example<IUserProfileRequest>({
        email: "customer@gmail.com",
        first_name: "Customer",
        last_name: "Portal",
        user_name: "Customer"
    })
    public async update_user_profile(@Body() body: IUserProfileRequest, @Request() auth_user: _AuthUser): Promise<IUserResponse> {
        try {
            let result: IUserResponse = {};
            const isUserExist = await user_repo_find("_id", auth_user.user_id);
            if (!isUserExist) {
                result = {
                    message: `User not found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                };
            } else {
                await user_repo_update_profile(body, auth_user);
                result = {
                    message: `User updated successfully!!`,
                    statusCode: CODES.API.STATUS_SUCCESS,
                };
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
}

export default new CompanyController();