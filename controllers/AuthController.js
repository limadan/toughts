const User = require('../models/User.js');

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }
    
    static logout(req, res){
        req.session.destroy();
        res.redirect('/login')
    }
    static register(req, res){
        res.render('auth/register');
    }

    static async registerPost(req, res){
        const formData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        const checkIfUserExists = await User.findOne({where: {email: formData.email}})

        if(formData.password !== formData.confirm_password){
            req.flash('message', 'As senhas não conferem. Tente novamente.');
            res.render('auth/register');
            return;
        }else if(checkIfUserExists){
            req.flash('message', 'O e-mail já está em uso.');
            res.render('auth/register');
            return;
        }else{
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(formData.password, salt);
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
            try{
                const createdUser = await User.create(user);
                req.session.userid = createdUser;
                req.flash('message', 'Cadastro realizado com sucesso!');
                req.session.save(()=>{
                    res.redirect('/');
                })
                
                
            }catch(err){
                req.flash('message', 'Houve algum erro ao cadastrar o usuário.');
                console.log(err)
                res.redirect('/register');
            }
        }
    }

}