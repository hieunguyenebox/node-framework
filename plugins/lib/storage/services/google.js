
import Storage from 'upload-cloud-storage'
import config from 'plugins/lib/config'

const { project_id, key_filem bucket_name } = config.get('storage.google')

const Google = Storage.init({

    type: 'google',
    projectId: project_id,
	keyFilename: key_file,
    bucketName: bucket_name,
})

const store = (filepath, dest) => {

	return Google.upload(filepath, { deleteSource: true, dest})
}

export default { store }