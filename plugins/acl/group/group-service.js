
import BackendGroup from './group-model'
import logger from 'plugins/lib/logger'
import BaseService from 'plugins/base-service'
import lang from 'plugins/lib/lang'
import config from 'plugins/lib/config'
import BackendUser from 'plugins/acl/user/models/user-model'
import 'babel-polyfill'

const ErrorCodes = config.get('error_codes')

class GroupService extends BaseService {

    model = BackendGroup
    duplicateFields = ['name']
    searchFields = ['name', 'desc']
    updateFields = ['name', 'desc', 'permissions']

    async update (data, user) {

    	return BackendGroup.findOne({_id: data.id}).then(g => {

    		if (g.isDefault)
    			delete data.name

    		return super.update(data, user)
    	})
    }

    delete (id, user) {

        return BackendUser.findOne({groups: id}).then(async total => {

            const group = await this.model.findOne({_id: id})

            if (group && group.isDefault)
                return {ok: 0, msg: lang('errors.default_group') }

            if (total)
                return { ok: 0, msg: lang('errors.not_empty_group') }

            return super.delete(id, user)
        })
    }
}

export default new GroupService