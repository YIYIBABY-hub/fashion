function showInfo(){
	var obj=new URLSearchParams(location.search);
	var _phone=obj.get('phone');
	//console.log(_phone);
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var r=xhr.responseText;
			//console.log(r);
			if(r==0){
				alert('用户不存在');
			}else{
				var arr=JSON.parse(r);
				var sex='保密';
				//把电话号码中间四位变为*号
				var reg=/(\d{3})\d{4}(\d{4})/;
				var page_phone=arr[0].phone.replace(reg,'$1****$2');
				//显示个人信息
				info_span_phone.innerHTML=page_phone;
				//隐藏的div里的个人信息
				modyfi_display_phone.innerHTML=page_phone;
				if(arr[0].gender==0){
					sex='男';
					nan_modify.checked=true;
				}else if(arr[0].gender==1){
					sex='女';
					nv_modify.checked=true;
				}
				info_span_gender.innerHTML=sex;
				modyfi_display_gender.innerHTML=sex;
				//如果查询出数据库的用户名为空, 则在前台显示为''
				if(!arr[0].uname){
					info_span_uname.innerHTML='';
					modyfi_display_uname.innerHTML='';
				}else{
					info_span_uname.innerHTML=arr[0].uname;
					modyfi_display_uname.innerHTML=arr[0].uname;
				}
				if(!arr[0].email){
					info_span_email.innerHTML='';
					modyfi_display_email.innerHTML='';
				}else{
					info_span_email.innerHTML=arr[0].email;
					modyfi_display_email.innerHTML=arr[0].email;
				}
				if(!arr[0].birthday){
					info_span_birthday.innerHTML='';
					modyfi_display_birthday.innerHTML='';
				}else{
					info_span_birthday.innerHTML=arr[0].birthday;
					modyfi_display_birthday.innerHTML=arr[0].birthday;
				}
			}
		}
	}
	console.log(`/ajax/info/${_phone}`);
	xhr.open('get',`/ajax/info/${_phone}`,true);
	xhr.send();
}
function saveModify(){
	var obj=new URLSearchParams(location.search);
	var _phone=obj.get('phone');
	var _uname='';
	var _email='';
	var _birthday='';
	//如果input里面没有填写用户名,那么取值为span标签里的内容
	if(!modyfi_info_uname.value){
		_uname=modyfi_display_uname.innerHTML;
	}else{
	 _uname=modyfi_info_uname.value;
	}
	//根据选择了哪个单选按钮判断,插入数据库的值是0还是1
	var sex=-1;
	if(nan_modify.checked){
		sex=0;
	}else if(nv_modify.checked){
		sex=1;
	}else{
		sex=-1;
	}
	//如果input里面没有填写邮箱,那么取值为span标签里的内容
	if(!modyfi_info_email.value){
		_email=modyfi_display_email.innerHTML;
	}else{
		_email=modyfi_info_email.value;
	}
	//如果input里面没有填写生日,那么取值为span里的内容
	if(!modyfi_info_birthday.value){
		_birthday=modyfi_display_birthday.innerHTML;
	}else{
	  _birthday=modyfi_info_birthday.value;
	}
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var r=xhr.responseText;
			if(r==0){
				alert('修改失败');
			}else{
				alert('修改成功');
			}
		}
	}
	xhr.open('PUT','/ajax/modify',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	var formdata=`phone=${_phone}&uname=${_uname}&gender=${sex}&email=${_email}&birthday=${_birthday}`;
	xhr.send(formdata);
}