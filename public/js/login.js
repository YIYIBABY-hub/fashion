function verify() {
	//初始化验证码
	verifyCode = new GVerify({
		id: "picyzm",
		type: "blend"
	});
}
function login(){
			var _phone=input_phone.value;
			var _password=input_password.value;
			if(!_phone){
				span_phone.innerHTML='请输入手机号码';
				return;
			}
			if(!_password){
				span_password.innerHTML='请输入密码';
				return;
			}	
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4 && xhr.status==200){
					var r=xhr.responseText;
					if(r==1){
						alert('登陆成功');
						location.href=`../personInfo.html?phone=${_phone}`;
					}else{
						alert('登录失败');
					}
				}
			}
			xhr.open('get',`/ajax/login/${_phone}&${_password}`,true);
			xhr.send();
}
