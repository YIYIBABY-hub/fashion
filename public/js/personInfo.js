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
	showAddInfo(_phone);
}
function showAddInfo(_phone){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var r=xhr.responseText;
			if(r==0){
				div_table_add.innerHTML=`
				<table class="info_site">
					<tr class="tr_border">
						<th>收货人</th>
						<th>所在区</th>
						<th>详细地址</th>
						<th>电话/手机</th>
						<th>操作</th>
					</tr>
					</table>
				`;
			}else{
				var arr=JSON.parse(r);
				var str='';
				str=`
				<table class="info_site">
					<tr class="tr_border">
						<th>收货人</th>
						<th>所在区</th>
						<th>详细地址</th>
						<th>电话/手机</th>
						<th>操作</th>
					</tr>
				`;
				for(var i=0;i<arr.length;i++){
					var reg=/(\d{3})\d{4}(\d{4})/;
					var page_phone=arr[i].add_phone.replace(reg,'$1****$2');
					str+=`
					<tr>
						<td>${arr[i].user_name}</td>
						<td>${arr[i].district}</td>
						<td>${arr[i].detail}</td>
						<td>${page_phone}</td>
						<td>
							<button>修改</button>
							<button>删除</button>
							<button>默认地址</button>
						</td>
					</tr>
					`;
				}
				str+=`</table>`;
				div_table_add.innerHTML=str;
			}
		}
	}
	xhr.open('GET',`/ajax/select_add/${_phone}`,true);
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
function addInfoSite(){
	var obj=new URLSearchParams(location.search);
	var _phone=obj.get('phone');
	var _addusername=input_add_username.value;
	var _addaddphone=input_add_addphone.value;
	var _adddistrict=input_add_district.value;
	var _adddetail=input_add_detail.value;
	if(!_addusername){
		add_label1.innerHTML='姓名不能为空';
		return;
	}
	if(!_addaddphone){
		add_label2.innerHTML='电话不能为空';
		return;
	}
	if(!_adddistrict){
		add_label3.innerHTML='省市区不能为空';
		return;
	}
	if(!_adddetail){
		add_label4.innerHTML='街道不能为空';
		return;
	}
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var r=xhr.responseText;
			if(r==0){
				alert('新增失败');
			}else{
				alert('新增成功');
			}
		}
	}
	xhr.open('POST','/ajax/add_site',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	var formdata=`user_name=${_addusername}&district=${_adddistrict}&detail=${_adddetail}&add_phone=${_addaddphone}&phone=${_phone}`;
	xhr.send(formdata);
}