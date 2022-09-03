const User = require('../models/User.js');

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const formData = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await User.findOne({where: {email: formData.email}});
        
        if(!user){
            req.flash('message', 'Este usuário é inexistente.');
            res.render('auth/login')

            return
        
        }

        const passwordMatch = bcrypt.compareSync(formData.password, user.password);
        
        if(!passwordMatch){
            req.flash('message', 'As senhas não conferem.');
            res.render('auth/login')
        }else{
            req.session.userid = user.id;
            req.flash('message', 'Usuário logado com sucesso!');
            req.session.save(()=>{
                res.redirect('/')
            })

        }

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
                req.session.userid = createdUser.id;
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