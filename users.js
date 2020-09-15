var mongoose = require('./db')



var user = new mongoose.Schema
    (
        {
            country:

            {
                type: String,
                require: true,
                default: 'null'
            }
            ,
            fname:
            {
                type: String,
                require: true,
                default: 'null'
            },
            sname:
            {
                type: String,
                default: 'null'
            },
            email:

            {
                type: String,
                require: true,
                default: 'null'
            },
            password:

            {
                type: String,
                require: true,
                set(param) {
                    return param;
                },
                default: 'null'
            },
            compassword:

            {
                type: String,
                require: true,
                default: 'null'
            },
            adress1:
            {
                type: String,
                require: true,
                default: 'null'
            },
            adress2:
            {
                type: String,
                require: true,
                default: 'null'
            },
            city:

            {
                type: String,
                require: true,
                default: 'null'
            },
            state:

            {
                type: String,
                require: true,
                default: 'null'
            },
            post:

            {
                type: String,
                require: true,
                default: 'null'
            },
            mobile:

            {
                type: Number,
                require: true,
                default: 0
            }
        }
        
    )



user.statics.findbyemail = function (edata, compa) {
    this.find(
        {
            "email": edata

        },
        function (err, ret) {

            compa(err, ret)
        }
        )
}



var user = mongoose.model('Users', user)
module.exports = user;
/*var admin = new user(
    {
        username: 'bimin',
        password: '123456',
        email: '2222@111.com'
    }

)
admin.save(function (err, ret) {
    if (err) {
        console.log('wrong')
    }
    else {
        console.log('success��')
        console.log(ret)

    }
}
)
*/
//���ӣ�
/*var admin = new user(
    {
        username: 'bimin',
        password: '123456',
        email:'2222@111.com'
    }

)
admin.save(function (err, ret)
{
    if (err) {
        console.log('wrong')
    }
    else {
        console.log('success��')
        console.log(ret)

    }
}
)


//��ѯ����

user.find(function (err, ret) {
    if (err) {
        console.log('!')
    }
    else {
        console.log(ret)
    }

})

//��������
user.find(
    { username:'bimin'},
    function (err, ret) {
    if (err) {
        console.log('!')
    }
    else {
        console.log(ret)
    }

    }
)
//ֻ��ƥ��ĵ�һ��
user.findOne(
    { username: 'bimin' },
    function (err, ret) {
        if (err) {
            console.log('!')
        }
        else {
            console.log(ret)
        }

    }
)*/

//ɾ��@
/*
user.remove(
    { username: 'bimin' },
    function (err, ret) {
        if (err) {
            console.log('!')
        }
        else {
            console.log(ret)
        }

    }
)

*/

/*
user.findByIdAndUpdate(
    '5f38da23ab8f363f809f2a2c',
    {
        password:99999
    },
    function (err, ret) {
        if (err) {
            console.log('!')
        }
        else {
            console.log(ret)
            console.log("///")
        }

    }
)
*/