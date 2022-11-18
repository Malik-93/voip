import { IissueRequest } from './../../interfaces/issue/issue.interface';
import { _AuthUser } from '../../types/common/common.type';
import Issue from "../../db/models/issues";
import mongoose from 'mongoose';
class IssueRepository {
    public async issue_repo_find(key: '_id', value: any): Promise<any> {
        try {
            return await Issue.findOne({ [key]: value });
        } catch (error) {
            throw error;
        }
    };
    public async issue_repo_create(_Issue: IissueRequest, auth_user?: _AuthUser): Promise<any> {
        const { title } = _Issue;
        // const { user_id } = auth_user;
        try {
            const new_issue = new Issue({
                _id: new mongoose.Types.ObjectId,
                title
            })
            return await new_issue.save();
        } catch (error) {
            throw error;
        }
    }
    public async issue_repo_update(_Issue: IissueRequest, auth_user?: _AuthUser): Promise<any> {
        const { issue_id, title } = _Issue;
        // const { user_id } = auth_user;
        try {
            const result = await Issue.findByIdAndUpdate({ _id: issue_id }, { $set: { title } }, {});
            return result;
        } catch (error) {
            throw error;
        }
    }
    public async issue_repo_get_all(): Promise<any> {
        try {
            const result = await Issue.find({}).sort({ _id: -1 });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new IssueRepository();