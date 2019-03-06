//比较数组是否相同
function compArray(array1, array2) {
	if ((array1 && typeof array1 === "object" && array1.constructor === Array)
			&& (array2 && typeof array2 === "object" && array2.constructor === Array)) {
		if (array1.length == array2.length) {
			for ( var i = 0; i < array1.length; i++) {
				var ggg = compObj(array1[i], array2[i]);
				if (!ggg) {
					return false;
				}
			}
		} else {
			return false;
		}
	} else {
		throw new Error("argunment is  error ;");
	}
	return true;
};

//比较两个对象是否相等，不包含原形上的属性计较
function compObj(obj1, obj2) {
	if ((obj1 && typeof obj1 === "object") && ((obj2 && typeof obj2 === "object"))) {
		var count1 = propertyLength(obj1);
		var count2 = propertyLength(obj2);
		if (count1 == count2) {
			for ( var ob in obj1) {
				if (obj1.hasOwnProperty(ob) && obj2.hasOwnProperty(ob)) {
					if (obj1[ob].constructor == Array && obj2[ob].constructor == Array) {//如果属性是数组
						if (!compArray(obj1[ob], obj2[ob])) {
							return false;
						}
					} else if (typeof obj1[ob] === "string" && typeof obj2[ob] === "string") { //纯属性
						if (obj1[ob] !== obj2[ob]) {
							return false;
						}
					} else if (typeof obj1[ob] === "object" && typeof obj2[ob] === "object") {//属性是对象
						if (!compObj(obj1[ob], obj2[ob])) {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
	return true;
};

// 获得对象上的属性个数，不包含对象原形上的属性
function propertyLength(obj) {
	var count = 0;
	if (obj && typeof obj === "object") {
		for ( var ooo in obj) {
			if (obj.hasOwnProperty(ooo)) {
				count++;
			}
		}
		return count;
	} else {
		throw new Error("argunment can not be null;");
	}
};

