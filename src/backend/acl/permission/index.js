
import im from 'immutable'

const permissions = []

const basic = ['create', 'update', 'list', 'delete', 'read']

const permissionsConfig = [
	{
		name: '',
		actions: basic
	}
]

for (let config of permissionsConfig) {

	permissions.concat(config.actions.map(action => `${config.name}_${action}`))
}


export default permissions