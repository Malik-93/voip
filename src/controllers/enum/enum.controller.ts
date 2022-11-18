import { UserRoles } from './../../enums';
import { _MongoError, _MongooseError } from '../../types/common/common.type';
import { controller_catch_error } from '../../helpers/error/error.helper';
import { Get, Tags, Route } from "tsoa";
@Tags("Enums")
@Route("/api/v1")
class EnumController {
    @Get("/enums")
    public get_enums() {
        try {
            let result: Array<any> = [];
            const length = Object.keys(UserRoles).length;
            for (let index = 1; index <= length / 2; index++) {
                const element = UserRoles[index];
                result.push({
                    text: element,
                    value: index
                })
            }
            return { result };
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
}

export default new EnumController();