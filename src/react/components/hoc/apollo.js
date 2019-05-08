
import defaults from './apollo/defaults'
import resolvers from './apollo/resolvers'
import graphqlConfig from 'config/graphql'
import 'whatwg-fetch'
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from 'apollo-link-state';
import { from } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'

const cache = new InMemoryCache();
const stateLink = withClientState({
	defaults,
    cache,
	resolvers
})

const httpLink = createUploadLink({
	uri: graphqlConfig.uri,
	fetch: (uri, options) => {
		return fetch(uri, options);
	}
})

export const client = new ApolloClient({
	link: from([stateLink, httpLink]),
	cache
});
