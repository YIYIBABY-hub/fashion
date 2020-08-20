function verify() {
	//初始化验证码
	verifyCode = new GVerify({
		id: "picyzm",
		type: "blend"
	});
}

function clearPhone() {
	span_phone.innerHTML = '';
	span_ver.innerHTML = '';
	span_password.innerHTML = '';
	span_btn.innerHTML = '';
}

function checkPhone() {
	let _phone = input_phone.value;
	//正则表达式验证手机号码格式第一位1 第二位3-9 后九位0-9
	let reg = /^1[3456789]\d{9}$/;
	if (!_phone) {
		span_phone.innerHTML = '手机号码不能为空';
		return;
	} else if (!reg.test(_phone)) {
		span_phone.innerHTML = '手机号码格式错误';
		return;
	}
}

function clearPassword() {
	span_phone.innerHTML = '';
	span_ver.innerHTML = '';
	span_password.innerHTML = '';
	span_btn.innerHTML = '';
}

function checkPassword() {
	let _password = input_password.value;
	if (!_password) {
		span_password.innerHTML = '密码不能为空';
		return;
	} else if (_password.length > 12 || _password.length < 6) {
		span_password.innerHTML = '密码长度6-12位';
		return;
	}
}

function checkReg() {
	//点击按钮验证
	var res = verifyCode.validate(input_security.value);
	if (!res) {
		span_btn.innerHTML = '验证码错误';
		return;
	}
}

function checkBoxcheck() {
	if (!check_box.checked) {
		span_btn.innerHTML = '注册需勾选同意用户协议';
		return;
	}
}

function selectPhone(_phone) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let r = xhr.responseText;
			//判断用户是否存在
			if (r == 1) {
				span_phone.innerHTML = '手机号码已存在';
				input_password.value='';
				input_security.value='';
			} else {
				// span_phone.style.display = 'none';
				span_phone.innerHTML = '√';
			}
		}
	}
	xhr.open('get', `/ajax/v1/regN/${_phone}`, true);
	xhr.send();
}

function register() {
	let _phone = input_phone.value;
	let _spanphone = span_phone.innerHTML;
	checkPhone();
	checkPassword();
	checkReg();
	checkBoxcheck();
	selectPhone(_phone);
	if (span_phone.innerHTML == '√') {
		userReg();
	}
	span_phone.innerHTML = '';
	span_ver.innerHTML = '';
	span_password.innerHTML = '';
	span_btn.innerHTML = '';
}

function getTime() {
	let d = new Date();
	var m = d.getMonth() + 1;
	var dd = d.getDate();
	var h = d.getHours();
	var mm = d.getMinutes();
	var s = d.getSeconds();
	let result = '';
	if (m < 10) {
		m = '0' + m;
	}
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (h < 10) {
		h = '0' + h;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	if (s < 10) {
		s = '0' + s;
	}
	return result = d.getFullYear() + '-' + m + '-' + dd + ' ' + h + ':' + mm + ':' + s;
}

function userReg() {
	let _phone = input_phone.value;
	let _password = input_password.value;
	let _regtime = getTime();
	console.log(_regtime);
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let r = xhr.responseText;
			if (r == 1) {
				alert('注册成功');
				location.href = 'login.html';
			} else {
				alert('注册失败');
			}
		}
	}
	xhr.open('post', '/ajax/reg', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	let formdata = `phone=${_phone}&password=${_password}&uname=${_phone}&reg_time=${_regtime}`;
	xhr.send(formdata);
}
