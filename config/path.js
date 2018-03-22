let path

module.exports = function(root){
	if (path)
		return path

	path = {}

	path.public = `${root}/public`
	path.view = `${root}/view`
	path.data = `${root}/data`

	return path
}