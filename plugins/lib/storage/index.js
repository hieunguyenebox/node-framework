
import Local from './storages/local'
import AWS from './storages/s3'
import Google from './storages/google'

const Storage = name => {

	switch (name) {

		case 'local': return Local

		case 's3': return AWS

		case 'google': return Google
	}
}

export default Storage