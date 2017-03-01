export var storage = {
  fetch: function (dataType, index) {
    let data = JSON.parse(localStorage.getItem(dataType) || '[]');

    if(data.length > 0 && index != null && data[index] != undefined)
    	return data[index];

    else if(index == null && data.length > 0)
    	return data;
	else
		return [];
  },
  save: function (dataType, index, data) {

  	if(index == null) {
  		localStorage.setItem(dataType, JSON.stringify(data));
  		return;
  	}

  	let temp = JSON.parse(localStorage.getItem(dataType) || '[]');

  	temp.splice(index, 1, data);

    localStorage.setItem(dataType, JSON.stringify(temp));
  }
}