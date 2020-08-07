const express=require('express');
//引用连接池
const pool=require('../pool.js');
//创建路由器对象
const ru=express.Router();
//用户登录
ru.get('/login/:phone&:password',(req,res)=>{
	let _phone=req.params.phone;
	let _password=req.params.password;
	let sql='SELECT * FROM fs_user WHERE phone=? AND password=?';
	pool.query(sql,[_phone,_password],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.length==0){
			res.send('0');
		}else{
			res.send('1');
		}
	});
});
//查询手机号是否占用
ru.get('/v1/regN/:phone',(req,res)=>{
	let _phone=req.params.phone;
	let sql='SELECT * FROM fs_user WHERE phone=?';
	pool.query(sql,[_phone],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	})
})
//用户注册
ru.post('/reg',(req,res)=>{
	let obj=req.body;
	let sql='INSERT INTO fs_user SET ?';
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	})
});
//用户个人信息,根据手机号查询用户信息
ru.get('/info/:phone',(req,res)=>{
	let _phone=req.params.phone;
	let sql='SELECT * FROM fs_user WHERE phone=?';
	pool.query(sql,[_phone],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.length==0){
			res.send('0');
		}else{
			res.send(result);
			}
	})
});
//修改信息
ru.put('/modify',(req,res)=>{
	let obj=req.body;
	let sql='UPDATE fs_user SET ? WHERE phone=?';
	pool.query(sql,[obj,obj.phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==0){
			res.send('0');
		}else{
			res.send('1');
		}
	})
})
module.exports=ru;