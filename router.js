var fs = require('fs')
var bcrypt = require('bcrypt')
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var stu = require('./users')
var salt = bcrypt.genSaltSync(10);
var https = require("https")
var task = require('./task')
var nodemailer = require('nodemailer')
const { EDESTADDRREQ } = require('constants')
var temp=require('./randoms')
var resetpath="/"+temp

router.get('/',function (req, res) {
        stu.find(function (err, students) {

            if (err) {
                return res.status(404).send("wrong")
            }
        
            console.log("click render")



            return     res.render('click.html')
        }
        )

    }
)

router.get('/indexpage', function (req, res) {

    console.log("indexpage render")
    return     res.render('indexpage.html')
}
)

router.post('/indexpage', function (req, res) {
    var hash = bcrypt.hashSync(req.body.password, salt)

    var emailadd = req.body.email

    var fn = req.body.fname
    var sn = req.body.sname

    const apikey = "731cc837a798fdbdcf78ccff444e6426-us17"

    const listid = "f39301ef35" 

    const url =  "https://us17.api.mailchimp.com/3.0/lists/f39301ef35"

    const data = {
        members: [{
            email_address: emailadd,
            status: "subscribed",
            merge_fields:
            {
                FNAME: fn,
                LNAME: sn
            }

        }]

    }

    var jsonData = JSON.stringify(data)

    const options = {
        method: "POST",
        auth: "ks:731cc837a798fdbdcf78ccff444e6426-us17"

    }

    const request = https.request(url, options, (response) => {

        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })

    })



    var admin = new stu(
        {
            country: req.body.country
            ,
            fname: req.body.fname
            ,
            sname: req.body.sname
            ,
            email: req.body.email
            ,
            password:

           hash
            ,
            compassword: req.body.compassword
            ,
            adress1: req.body.adress1
            ,
            adress2: req.body.adress2
            ,
            city: req.body.city
            ,
            state: req.body.state
            ,
            post: req.body.post
            ,
            mobile: req.body.mobile
        }

    )




    admin.save(function (err, ret) {
        if (err) {
            console.log('wrong')
        }
        else {
            console.log('regist successfully the user information:')
            console.log(ret)

           return  res.redirect("/login")
        }
    }
    )

    request.end()

});

router.get('/login', function (req, res) {
    

console.log(resetpath)
    console.log("login render")



  
  
   if(req.session.stu)
   {
       
       return res.redirect("/task")
   }
 return res.render('login.html')

}
)



router.get('/wpass', function (req, res) {

    console.log("error password render")
    return     res.render('wpass.html')
}
)
router.get('/wemail', function (req, res) {
  
    console.log("error email  render")
    return   res.render('wemail.html')
}
)


router.post('/login', function (req, res) {

    var email = req.body.email
    var password = req.body.password
    var re =req.body.rememberme

 stu.findOne(

        {

            email: email,
        },
        function (err, ret) {

            if (err)
            {

                console.log('err')
            } 
            if (!ret) {
                console.log("error email ")
               
               return  res.redirect("/wemail")
            }
            if (ret) {
                console.log("email checked ")
                var ad = stu.findOne(

                    {

                        email: email,
                    },
                    function (err, ret) {

                        if (err) {
                            console.log('err')
                        } else {



                          
                            p = ret.password
                           let r = bcrypt.compareSync(password, p)
                         
                            console.log("password checked")

                            console.log(p)
                            console.log(password)
                            console.log(ret)

                            if (r) {

                                if(re=="rememberme")
                                {
                                      req.session.stu=ret
                     
                                }
                         
                                console.log(re)
                                console.log("going to task page.......")
                               return res.redirect("/task")
                            }
                            else {
                               return res.redirect("/wpass")
                            }
                        }
                    }

                )

            }
            }
      

    )



    






});




router.get('/task', function (req, res) {
 
   
    console.log("show all the task")
    stu.find(
       (err, ret) => {
        if (err) {
          return res.send('wrong')
         
        }
        else {
          
           res.send(ret)  
           // return  res.render('task.html')
        }
    
        }
    )
  
}
)

router.post('/task',function(req,res)
{
    console.log("add a new task")
    
    var hash = bcrypt.hashSync(req.body.password, salt)

    var newuser = new stu(
        {
            
            country: req.body.country
            ,
            fname: req.body.fname
            ,
            sname: req.body.sname
            ,
            email: req.body.email
            ,
            password:

            hash
            ,
            compassword: req.body.compassword
            ,
            adress1: req.body.adress1
            ,
            adress2: req.body.adress2
            ,
            city: req.body.city
            ,
            state: req.body.state
            ,
            post: req.body.post
            ,
            mobile: req.body.mobile
        
        }

    )

    newuser.save(function (err, ret) {
        if (err) {
            return res.send('wrong')
          
        }
        else {

          return res.send(ret)
        

        }
       
    }
    )

   
    
})

router.delete('/task',function(req,res)
{
    console.log("delete all task")
    stu.deleteMany(function(err)
    {
        if(err)
        {
            console.log("!")
        }
        else
        {
            res.send("the data has been removed")
        }
    })
})


router.route('/task/:email').get(
    function(req,res)
    {
        stu.findOne({
            email:req.params.email
        },
        function(err,ret){
if(err)
{
    res.send("worng")
}
else{
    res.send(ret)

}
        })
    }
)
.put(function(req,res)
   { 
   // var hash = bcrypt.hashSync(req.body.password, salt)
    stu.findOneAndUpdate(   
    {email:req.params.email},
    {
        email:req.body.email,
        country: req.body.country
        ,
        fname: req.body.fname
        ,
        sname: req.body.sname
        ,
        email: req.body.email
        ,
        password:

        req.body.password
        ,
        compassword: req.body.compassword
        ,
        adress1: req.body.adress1
        ,
        adress2: req.body.adress2
        ,
        city: req.body.city
        ,
        state: req.body.state
        ,
        post: req.body.post
        ,
        mobile: req.body.mobile

    
    },
  
    function(err,ret)
    {
        if(err)
        {
            res.send("!")
        }
        else{
            res.send("yep")
        }
    }
    )
}
)
.delete(function(req,res)
{
    stu.remove(
        {email:req.params.email
        },function(err)
        {
            if(err)
            {
                res.send("!")
            }
            else{
                res.send("delete")
            }
        }
    )
})



router.get('/reset',function (req, res) {

    return   res.render('reset.html')
}
)


router.post('/reset',function (req, res) {
var resetemail = req.body.email;

let transporter = nodemailer.createTransport(
    {
        host: 'smtp.qq.com',
        secureConnection: true,  //use SSL
        port: 465,
        secure: true,  //secure: true for port 465, secure:false for port 587
        auth:
        {
            user:'1443591904@qq.com',
            pass:'aplniixhgcdxghjb'
        }
    }
)
console.log(resetpath)
var mail = {
    from:'.<1443591904@qq.com>',
    subject:'reset the password',
    to:resetemail,
    text:'Please click the link below to reset your PASSWORD ! http://localhost:25000'+resetpath
}
transporter.sendMail(mail,function(err,res)
{
    if(err)
    {
        console.log(err)

    }

    else
    {
        console.log(res)
       
    } 

})
console.log(resetpath)
res.redirect('./login')
}
)




router.get(resetpath,function (req, res) {

 
    return   res.render('setpassword.html')
}
)


router.post(resetpath,function (req, res) {

var email = req.body.email
var password = req.body.password
console.log(password)
console.log(req.body.email)
stu.findOneAndUpdate(

{
    email:email
}
,
{
    password: bcrypt.hashSync(req.body.password, salt)
}
,
function(err,ret){
if(err)
{
    console.log("password update faied!")
}
else
{
   // console.log(ret)
  //  var hash = bcrypt.hashSync(req.body.password, salt)

    console.log(req.body.password)
    console.log(ret)
    res.redirect('./login')
}
}
)

}


)


module.exports = router