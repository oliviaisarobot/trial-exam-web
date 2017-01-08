var Ajax = function (){

	this.APIEndpoint = 'http://localhost:3004/';

	this.getAllDecoded = function(callback) {
		this.open('GET', 'decode/all', false, callback);
	}

	this.postText = function(data, callback) {
		this.open('POST', 'decode', data, callback);
	}

  this.getResult = function(callback) {
    this.open('GET', 'decode', false, callback);
  }

	this.open = function(method, resource, data, callback) {
		var xhr = new XMLHttpRequest();
		data = (data) ? data : null;
		xhr.open( method, this.APIEndpoint + resource )

		if( method !== 'DELETE' ) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}

		xhr.send( JSON.stringify(data) );
		xhr.onreadystatechange = function (rsp) {
			if( xhr.readyState === XMLHttpRequest.DONE ) {
				callback( JSON.parse(xhr.response) );
			}
		}
	}
}
