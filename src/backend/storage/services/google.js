
import Storage from 'upload-cloud-storage'
import StorageAPI from './storage'
import config from 'backend/config'

const { project_id, key_file, bucket_name } = config.get('storage.google')

const Google = Storage.init({

    type: 'google',
    projectId: project_id,
	keyFilename: key_file,
    bucketName: bucket_name,
})


class GoogleStorage extends StorageAPI {

	config = config.get('storage.google')

	upload = (filepath, dest) => {
	
		dest = dest.substr(0, dest.lastIndexOf('/'))

		return Google.upload(filepath, { deleteSource: true, dest}).then(url => console.log(url))

	}
}

export default new GoogleStorage