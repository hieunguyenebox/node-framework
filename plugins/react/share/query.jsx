
import gql from "graphql-tag"

export default {

	
	user_info:  gql`
		userInfo { name email avatar}
	`,
}