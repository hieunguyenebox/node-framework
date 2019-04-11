
import 'babel-polyfill'

const replaceOrderValues = (orders) => {

	for (let key in orders) {

		let sortType = 1

		if (orders[key] === 'desc')
			sortType = -1

		orders[key] = sortType
	}

	return orders
}

const checkOrders = (orders) => {

	if (!orders || !Object.keys(orders).length)
		orders = { createdAt: 'desc' }

	return replaceOrderValues(orders)
}

const checkPage = (page) => {

	if (isNaN(page) || page < 1)
		page = 1

	return page
}

const checkLimit = (limit) => {

	if (isNaN(limit) || limit > 1000 || limit < 1)
		limit = 10

	return limit
}

export const createListAndDetail = (model, selectedFields = 'id') => {

	const detail = (args, req) => {

		if (!args.refID) return {};

		return model.findOne({refID: args.refID})
	}

	const list = async (args, req) => {

		let { page, limit, orders, conditions } = args.filter || {}

		limit = checkLimit(limit)
		page = checkPage(page)

		const total = model.count(conditions)

		return model
				.find(conditions)
				.sort(checkOrders(orders))
				.skip((page - 1) * limit)
				.limit(limit)
				.select(selectedFields)
				.then(list => {

					return {

						total,
						list
					}
				})
	}

	return { detail, list }
}


