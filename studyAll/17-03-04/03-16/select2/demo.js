$("#merchantName").select2({
	minimumInputLength : 1,
	multiple : false,
	closeOnSelect : false,
	ajax : {
		url : '${path}' + '/serialNumber/getMacrName',
		dataType : 'json',
		delay : 250,
		data : function(term, page) {
			return {
				queryParam : term, //search term
				pagesize : 30,
				page : page - 1// page number
			};
		},
		results : function(data, params) {
			var more = (params.page * 30) < data.length;
			var merchantnameList = new Array();
			for (var i = 0; i < data.length; i++) {
				merchantnameList.push({
					id : data[i].ltlMerchno,
					merchantname : data[i].merchantname
				});
			}
			return {
				results : merchantnameList,
				more : more
			};
		},
		cache : true
	},
	initSelection : function(element, callback) {

	},
	//输出值
	formatResult : function(repo) {
		return repo.merchantname;
	},
	formatSelection : function(repo) {
		return repo.merchantname;
	},
	dropdownCssClass : "bigdrop",
	escapeMarkup : function(m) {
		return m;
	}
});


<input id="merchantName" name="merchantName" type="text" class="input-small" value="${resultData.entity.merchantName}" style="width: 180px;"/>