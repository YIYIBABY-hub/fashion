const express=require('express');
//引用连接池
const pool=require('../pool.js');
//创建路由器对象
const ru=express.Router();
//1.用户注册(post /reg)
ru.post('/reg',(req,res)=>{
	//获取post请求的数据req.body
	let obj=req.body;
	//判断每一项是否为空
	if(!obj.phone){
		res.json({code:401,msg:'phone required'});
		return;
	}
  let sql='INSERT INTO fs_user(uid,phone) VALUES(?,?)';
	pool.query(sql,[,obj.phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRow==0){
			res.json({code:-1,msg:'register 失败'});
		}else{
			res.json({code:1,msg:'register 成功'});
		}
	});
})

ru.get('/update',(req,res)=>{
	let obj=req.query;
	let i=400;
	for(let key in obj){
		i++;
		if(!obj[key]){
			res.json({code:i,msg:key+'required'});
		}
	};
	let genderTobool=0;
	if(obj.gender=='a'){
		obj.gender=0;
	}else{
		obj.gender=1;
	}
	let sql='UPDATE fs_user SET uname=?,gender=?,email=?,birthday=? WHERE phone=?';
	pool.query(sql,[obj.uname,obj.gender,obj.email,obj.birthday,'11111111111'],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows==0){
			res.json({code:-1,msg:'update 失败'});
		}else{
			res.json({code:1,msg:'update 成功'});
		}
	});
});
module.exports=ru;