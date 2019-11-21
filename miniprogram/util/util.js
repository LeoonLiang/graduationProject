const formatTime = day => {
	var days = new Date();
	//getTime()返回 1970 年 1 月 1 日至今的毫秒数。
	var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
	//setTime()以毫秒设置 Date 对象。
	days.setTime(gettimes);
	var year = days.getFullYear();
	var month = days.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var today = days.getDate();
	if (today < 10) {
		today = "0" + today;
	}
	return year + "-" + month + "-" + today;
}


module.exports = {
	formatTime: formatTime
}
