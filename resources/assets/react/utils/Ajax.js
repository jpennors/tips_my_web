/**
 * Sends an HTTP request to the API.
 * @param {string} uri - API path
 * @param {Object} data - request params
 * @returns {Promise<Object|null>}
 */


const API_URL = "http://localhost:8000"

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

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/api/${uri}`, data)
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
function ajaxPost(path, data) {
	return executeRequest(path, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify(data),
	});
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

export { ajaxGet, ajaxPost, ajaxPut, ajaxDelete, putFile };