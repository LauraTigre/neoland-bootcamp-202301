const { User, Nanny } = require('../data/models')
const { validateName, validateCity, validateExperience, validateEmail, validatePassword, CoherenceError, } = require('com')

function registerNanny(name, city, experience, email, password) {
    validateName(name)
    validateCity(city)
    validateExperience(experience)
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email })
        .then(user => {
            if (user) throw new CoherenceError('user already exists')

            user = new User({
                name,
                email,
                password,
                role: 'nanny'
            })

            return user.save()
                .then(user => {
                    const nanny = new Nanny({
                        city,
                        experience,
                    })

                    nanny.user = user._id

                    return nanny.save()
                })
        })
}
module.exports = registerNanny