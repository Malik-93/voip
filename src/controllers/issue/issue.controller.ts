import { Iissue, IissueRequest, IissueResponse } from './../../interfaces/issue/issue.interface';
import { CODES } from '../../constants/voip.constants';
import { _AuthUser, _MongoError, _MongooseError } from '../../types/common/common.type';
import { controller_catch_error } from '../../helpers/error/error.helper';
import { Post, Tags, Route, Body, Request, Security, Example, Get } from "tsoa";
import IssueRepo from '../../repositories/issue';
@Tags("Issues")
@Route("/api/v1/issues")
class IssueController {
    @Security("api_key")
    @Post("/create_update")
    @Example<IissueRequest>({
        "issue_id": 0,
        "title": 'I have an issue',

    })
    public async create_update(@Body() _issue: IissueRequest, @Request() auth_user: _AuthUser): Promise<IissueResponse> {
        try {
            let result: any = {};
            if (_issue.issue_id) {
                const db_issue = <Iissue>await IssueRepo.issue_repo_find("_id", _issue.issue_id);
                if (!db_issue) {
                    result = {
                        message: `Issue having id as ${_issue.issue_id} not found!!`,
                        statusCode: CODES.API.STATUS_NOT_FOUND,
                    }
                } else {
                    await IssueRepo.issue_repo_update(_issue, auth_user);
                    result = {
                        message: `Issue having id as ${_issue.issue_id} updated!!`,
                        statusCode: CODES.API.STATUS_SUCCESS,
                    }
                }
            } else {
                const Issue = await IssueRepo.issue_repo_create(_issue, auth_user);
                result = {
                    message: `Issue created successfully!!`,
                    issue_id: Issue._id,
                    statusCode: CODES.API.STATUS_RECORD_CREATED,
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
    @Security("api_key")
    @Get("/get_active")
    public async get_active(): Promise<IissueResponse> {
        try {
            let result: any = {};
            const issues = await IssueRepo.issue_repo_get_all();
            if (!issues.length) {
                result = {
                    message: `No Record found!!`,
                    statusCode: CODES.API.STATUS_NOT_FOUND,
                }
            } else {
                result = {
                    message: `Success!!`,
                    statusCode: CODES.API.STATUS_SUCCESS,
                    issues
                }
            }
            return result;
        } catch (error: any) {
            throw controller_catch_error(error);
        }
    }
}

export default new IssueController();