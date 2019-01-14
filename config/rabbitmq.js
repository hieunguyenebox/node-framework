

module.exports = {

	
	channels: [

		{
			name: 'message',
			// prefetch: 100,
			exchange: 'styless',
			type: 'topic',
			options: { durable: true },
			route: 'message',
			queue: 'message',
			// consume: true
		},
	]
}