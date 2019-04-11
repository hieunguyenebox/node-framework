
import Local from './services/local'
import AWS from './services/s3'
import Google from './services/google'

const Storage = name => {

	switch (name) {

		case 'local': return Local

		case 's3': return AWS

		case 'google': return Google
	}
}

export default Storage