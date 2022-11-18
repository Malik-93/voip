import { CODES } from './../../constants/voip.constants';
import { _MongoError, _MongooseError } from './../../types/common/common.type';
import { generate_jwt } from './../../helpers/jwt/token.helper';
import { controller_catch_error } from './../../helpers/error/error.helper';
import CompanyRepo from '../../repositories/company';
import { IRegisterCompanyRequest, ICompanyResponse, ILoginCompanyRequest, ICompanyLoginResponse } from '../../interfaces/company/company.interface';
import { Post, Tags, Route, Body, Example } from "tsoa";
const { API } = CODES;
const { company_repo_create_update, company_repo_login, company_repo_find } = CompanyRepo;
@Tags("Companies")
@Route("/api/v1/companies")
class CompanyController {
    @Post("/register")
    public async register_company(@Body() body: IRegisterCompanyRequest): Promise<ICompanyResponse> {
        try {
            let result: any = {};
            const isExist = await company_repo_find(body.email);
            if (isExist) {
                result = {
                    message: `Company having email ${body.email} already exist!!`,
                    statusCode: API.STATUS_BAD_REQUEST
                }
            } else {
                const data = await company_repo_create_update(body);
                const authToken = generate_jwt(data, `${process.env.COMPANY_JWT_SECRET}`, `${process.env.COMPANY_JWT_EXPIRES_IN}`)
                result = {
                    message: `Company created successfully!!`,
                    authToken,
                    company_id: data.company_id,
                    namespace: data.namespace,
                    statusCode: API.STATUS_RECORD_CREATED
                };
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Post("/login")
    @Example<ILoginCompanyRequest>({
        email: "cubefunder@gmail.com",
        password: "1234"
    })
    public async login_company(@Body() body: ILoginCompanyRequest): Promise<ICompanyResponse> {
        try {
            const { company_id, namespace, isMatched, _id }: ICompanyLoginResponse = await company_repo_login(body);
            let result = {};
            if (!company_id) {
                result = {
                    message: `Company not found!!`,
                    statusCode: API.STATUS_NOT_FOUND,
                };
            }
            else if (!isMatched) {
                result = {
                    message: `Incorrect email or password!!`,
                    statusCode: API.STATUS_BAD_REQUEST,
                };
            } else {
                const authToken = generate_jwt({ company_id, namespace, _id }, `${process.env.COMPANY_JWT_SECRET}`, `${process.env.COMPANY_JWT_EXPIRES_IN}`)
                result = {
                    message: `Company logged in successfully!!`,
                    authToken,
                    company_id,
                    namespace,
                    statusCode: API.STATUS_SUCCESS,

                };
            }
            return result
        } catch (error) {
            throw controller_catch_error(error);
        }
    }
}

export default new CompanyController();