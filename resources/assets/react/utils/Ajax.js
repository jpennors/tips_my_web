/**
 * Sends an HTTP request to the API.
 * @param {string} uri - API path
 * @param {Object} data - request params
 * @returns {Promise<Object|null>}
 */

function parseJSON(response) {
    return new Promise((resolve) => response.json()
        .then((json) => resolve({
            status: response.status,
            ok: response.ok,
            json,
        }))
    );
}

async function executeRequest(uri, data = {}) {

    const token = sessionStorage.getItem("token");
    if (data && token){

        if (data.headers){
            data.headers["Authorization"] = token
        } else {
            data.headers = {
                "Authorization" : token
            }
        }
    }

    return new Promise((resolve, reject) => {
        fetch(`/api/${uri}`, data)
          .then(parseJSON)
          .then((response) => {
            if (response.ok) {
              return resolve(response.json);
            }
            return reject(response.json);
          })
          .catch((error) => reject({
            networkError: error.message,
          }));
      });
}

/**
 * Requests the API for all objects at the given path.
 * @param {string} path - API path
 * @returns {Promise<Object>}
 */
function ajaxGet(path) {
	return executeRequest(path);
}

/**
 * Creates a new object in the API at the given path.
 * @param {string} path - API path
 * @param {Object} data - object payload
 * @returns {Promise<Object>}
 */
function ajaxPost(path, data, config={}) {
    let headers = {}
    if (config.length > 0){
        headers = config
    } else {
        headers = { 'Content-Type': 'application/json' }
    }
	return executeRequest(path, {
		headers: headers,
		method: 'POST',
		body: JSON.stringify(data),
	});
}


function ajaxPostImage(path, data){
	return executeRequest(path, {
		method: 'POST',
		body: data
	})
}

/**
 * Updates an API object at the given path.
 * @param {string} path - API path
 * @param {string} id - object id or slug
 * @param {Object} data - object payload
 * @returns {Promise<Object>}
 */
function ajaxPut(path, data) {
	return executeRequest(path, {
		headers: { 'Content-Type': 'application/json' },
		method: 'PUT',
		body: JSON.stringify(data),
	});
}

/**
 * Deletes a API object at the given path.
 * @param {string} path - API path
 * @param {string} id - object id or slug
 * @returns {Promise<null>}
 */
function ajaxDelete(path) {
	return executeRequest(path, {
		method: 'DELETE',
	});
}

/**
 * Uploads a file to the API.
 * @param {File} file - file to be uploaded
 * @returns {Promise<Object>}
 */
function putFile(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			const fileReader = new FileReader();
			fileReader.onload = async e => {
				try {
					const res = await executeRequest('file', {
						method: 'POST',
						headers: {
							'Content-Type': file.type,
							'Content-Length': file.size,
						},
						body: e.target.result,
					});
					resolve(res);
				} catch (e) {
					console.error(e);
					reject();
				}
			};
			fileReader.readAsArrayBuffer(file);
		} else {
			reject();
		}
	});
}

export { ajaxGet, ajaxPost, ajaxPut, ajaxDelete, ajaxPostImage, putFile };
