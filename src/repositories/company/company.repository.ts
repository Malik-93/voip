import Company from "../../db/models/company";
import { IRegisterCompanyRequest, ILoginCompanyRequest, ICompany, ICompanyResponse, ICompanyLoginResponse } from '../../interfaces/company/company.interface';
import { hash_password, compare_password } from '../../helpers/jwt/token.helper';
import { company_namespace_generator, unique_id_generator } from '../../helpers/common/common.helper';
import mongoose from 'mongoose';
class CompanyRepositroy {
    public async company_repo_find(email: ICompany['email']): Promise<ICompanyResponse | any> {
        try {
            return await Company.findOne({ email });
        } catch (error) {
            throw error;
        }
    };
    public async company_repo_get_all(): Promise<any> {
        try {
            return await Company.find({});
        } catch (error) {
            throw error;
        }
    };
    public async company_repo_create_update(company: IRegisterCompanyRequest): Promise<ICompanyResponse | any> {
        const { company_id, name, email, password, } = company;
        try {
            // UPDATE CASE
            if (company_id) {
                await Company.findOneAndUpdate({ company_id }, { name, email }, {}, (err, result) => {
                    if (err) throw err;
                    return result;
                });
            } else {
                const new_company = new Company({
                    _id: new mongoose.Types.ObjectId(),
                    company_id: unique_id_generator(),
                    name,
                    email,
                    namespace: company_namespace_generator(name),
                    password: await hash_password(password),
                    work_timings: []
                });
                const company = await new_company.save();
                return {
                    company_id: company.company_id,
                    _id: company._id,
                    namespace: company.namespace
                };
            }
        } catch (error) {
            throw error;
        }
    };
    public async company_repo_login(_company: ILoginCompanyRequest): Promise<ICompanyLoginResponse | any> {
        const { email, password } = _company;
        try {
            let isMatched: boolean = true, company: ICompany | any = null;
            company = await Company.findOne({ email });
            isMatched = await compare_password(`${password}`, `${company?.password}`)
            return {
                ...company._doc,
                isMatched
            };
        } catch (error) {
            throw error;
        }
    }
}

export default new CompanyRepositroy();