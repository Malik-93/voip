import { _AuthCompany, _AuthUser, _FilterUserUnion } from './../../types/common/common.type';
import User from "../../db/models/user";
import { ILoginUserRequest, IRegisterUserRequest, IUser, IUserLoginResponse, IUserProfileRequest, IUserResponse, IUserFilter } from '../../interfaces/user/user.interface';
import { hash_password, compare_password } from '../../helpers/jwt/token.helper';
import { unique_id_generator } from '../../helpers/common/common.helper';
import mongoose from 'mongoose';
class UserRepository {
    public async user_repo_find(key: IUserFilter[_FilterUserUnion] = 'email', value: any): Promise<IUserResponse | any> {
        let _key: string = typeof key === 'string' ? key : '';
        try {
            const user = await User.findOne({ [_key]: value });
            return user;
        } catch (error) {
            throw error;
        }
    };
    public async user_repo_find_many(filter: Array<{ [key: string]: any }>): Promise<IUserResponse | any> {
        try {
            const users_list = await User.find({ $or: filter });;
            return users_list;
        } catch (error) {
            throw error;
        }
    };
    public async user_repo_register(user: IRegisterUserRequest): Promise<IUserResponse | any> {
        const { first_name, last_name, user_name, email, password } = user;
        const { _id, company_id, namespace } = <_AuthCompany>user.auth_company;
        try {
            const new_user = new User({
                _id: new mongoose.Types.ObjectId(),
                user_id: unique_id_generator(),
                first_name,
                last_name,
                user_name,
                email,
                password: await hash_password(password),
                namespace,
                company_id,
                _company_ref: _id

            });
            const user = await new_user.save();
            return {
                _id: user._id,
                user_id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                namespace: user.namespace,
                company_id: user.company_id,
                socket_id: user.socket_id,
            };

        } catch (error) {
            throw error;
        }
    };
    public async user_repo_login(_user: ILoginUserRequest): Promise<IUserLoginResponse | any> {
        const { email, password } = _user;
        try {
            let isMatched: boolean = true, user: IUser | any = null;
            user = await User.findOne({ email });
            isMatched = await compare_password(`${password}`, `${user?.password}`)
            return {
                _id: user._id,
                user_id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                namespace: user.namespace,
                company_id: user.company_id,
                socket_id: user.socket_id,
                isMatched
            };
        } catch (error) {
            throw error;
        }
    }
    public async user_repo_generic_login(_user: any): Promise<IUserLoginResponse | any> {
        console.log('__[_user]__', _user);
        const { fname, lname, email, username, namespace, company_id } = _user;
        try {
            let user: IUser | any = null;
            user = await User.findOne({
                $or: [
                    { "user_name": username },
                    { "first_name": fname },
                    { "last_name": lname },
                    { "email": email },
                ]
            });
            if (user) {
                user = {
                    _id: user._id,
                    user_id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    namespace: user.namespace,
                    company_id: user.company_id,
                    socket_id: user.socket_id,
                }
            } else {
                const new_user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    user_id: unique_id_generator(),
                    first_name: fname,
                    last_name: lname,
                    user_name: username,
                    email,
                    namespace: "0140887-cubefunder-166780",
                    company_id: 1667800143551,
                    password: "asdlfj897sd9f87080",
                    _company_ref: "63689c0261bd259d310f2688"

                });
                const _user = await new_user.save();
                user = {
                    _id: _user._id,
                    user_id: _user._id,
                    email: _user.email,
                    first_name: _user.first_name,
                    last_name: _user.last_name,
                    user_name: _user.user_name,
                    namespace: _user.namespace,
                    company_id: _user.company_id,
                    socket_id: _user.socket_id,
                }
            }
            return user;
        } catch (error) {
            throw error;
        }
    };
    public async user_repo_update_profile(_user: IUserProfileRequest, auth_user: _AuthUser): Promise<IUserLoginResponse | any> {
        const { email, first_name, last_name, socket_id, user_name } = _user;
        const { user_id } = auth_user;
        try {
            const result = await User.findOneAndUpdate({ _id: user_id }, { $set: { user_name, first_name, last_name, email, socket_id } }, {});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();