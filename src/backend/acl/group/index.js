
import GroupService from './group-service'
import BaseValue from 'plugins/base-service/base-value'
import permissions from 'plugins/acl/permissions'

export const Query = `
	
	backendGroups(pagination: Pagination): ListBackendGroup
	backendPermissions: JSON
`

export const Mutation = `
	
	createBackendGroup(backendGroup: BackendGroupInput): Response
	updateBackendGroup(backendGroup: BackendGroupInput): Response
	deleteBackendGroup(id: String!): Response
	lockGroup(id: String!): Response
`

export const Type = `
	
	type ListBackendGroup {
		total: Int
		page: Int
		limit: Int
		list: [BackendGroup]
	}

	type BackendGroup {
		id: String!
		name: String
		desc: String
		permissions: [String]
		status: String
	}

	input BackendGroupInput {
		id: String
		name: String
		permissions: [String]
		status: String
		desc: String
	}
`
export const Value = {
	
}
