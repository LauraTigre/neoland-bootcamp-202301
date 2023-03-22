const { User, Nanny,Availability } = require('../data/models')
const { validateUserId, validateUserNannyId, validateNewMondayMorningSelected,
    validateNewMondayAfternoonSelected,
    validateNewMondayEveningSelected,
    validateNewTuesdayMorningSelected,
    validateNewTuesdayAfternoonSelected,
    validateNewTuesdayEveningSelected,
    validateNewWendsdayMorningSelected,
    validateNewWendsdayAfternoonSelected,
    validateNewWendsdayEveningSelected,
    validateNewThursdayMorningSelected,
    validateNewThursdayAfternoonSelected,
    validateNewThursdayEveningSelected,
    validateNewFridayMorningSelected,
    validateNewFridayAfternoonSelected,
    validateNewFridayEveningSelected,
    validateNewSaturdayMorningSelected,
    validateNewSaturdayAfternoonSelected,
    validateNewSaturdayEveningSelected,
    validateNewSundayMorningSelected,
    validateNewSundayAfternoonSelected,
    validateNewSundayEveningSelected,
    ExistenceError
} = require('com')

function updateAvailabilities(userId, nannyId,
    newMondayMorningSelected,
    newMondayAfternoonSelected,
    newMondayEveningSelected,
    newTuesdayMorningSelected, newTuesdayAfternoonSelected, newTuesdayEveningSelected, newWendsdayMorningSelected, newWendsdayAfternoonSelected, newWendsdayEveningSelected, newThursdayMorningSelected, newThursdayAfternoonSelected, newThursdayEveningSelected, newFridayMorningSelected, newFridayAfternoonSelected, newFridayEveningSelected, newSaturdayMorningSelected, newSaturdayAfternoonSelected, newSaturdayEveningSelected, newSundayMorningSelected, newSundayAfternoonSelected, newSundayEveningSelected,) {
    validateUserId(userId)
    validateUserNannyId(nannyId)
    if (newMondayMorningSelected !== undefined) validateNewMondayMorningSelected(newMondayMorningSelected)
    if (newMondayAfternoonSelected !== undefined) validateNewMondayAfternoonSelected(newMondayAfternoonSelected)
    if (newMondayEveningSelected !== undefined) validateNewMondayEveningSelected(newMondayEveningSelected)
    if (newTuesdayMorningSelected !== undefined) validateNewTuesdayMorningSelected(newTuesdayMorningSelected)
    if (newTuesdayAfternoonSelected !== undefined) validateNewTuesdayAfternoonSelected(newTuesdayAfternoonSelected)
    if (newTuesdayEveningSelected !== undefined) validateNewTuesdayEveningSelected(newTuesdayEveningSelected)
    if (newWendsdayMorningSelected !== undefined) validateNewWendsdayMorningSelected(newWendsdayMorningSelected)
    if (newWendsdayAfternoonSelected !== undefined) validateNewWendsdayAfternoonSelected(newWendsdayAfternoonSelected)
    if (newWendsdayEveningSelected !== undefined) validateNewWendsdayEveningSelected(newWendsdayEveningSelected)
    if (newThursdayMorningSelected !== undefined) validateNewThursdayMorningSelected(newThursdayMorningSelected)
    if (newThursdayAfternoonSelected !== undefined) validateNewThursdayAfternoonSelected(newThursdayAfternoonSelected)
    if (newThursdayEveningSelected !== undefined) validateNewThursdayEveningSelected(newThursdayEveningSelected)
    if (newFridayMorningSelected !== undefined) validateNewFridayMorningSelected(newFridayMorningSelected)
    if (newFridayAfternoonSelected !== undefined) validateNewFridayAfternoonSelected(newFridayAfternoonSelected)
    if (newFridayEveningSelected !== undefined) validateNewFridayEveningSelected(newFridayEveningSelected)
    if (newSaturdayMorningSelected !== undefined) validateNewSaturdayMorningSelected(newSaturdayMorningSelected)
    if (newSaturdayAfternoonSelected !== undefined) validateNewSaturdayAfternoonSelected(newSaturdayAfternoonSelected)
    if (newSaturdayEveningSelected !== undefined) validateNewSaturdayEveningSelected(newSaturdayEveningSelected)
    if (newSundayMorningSelected !== undefined) validateNewSundayMorningSelected(newSundayMorningSelected)
    if (newSundayAfternoonSelected !== undefined) validateNewSundayAfternoonSelected(newSundayAfternoonSelected)
    if (newSundayEveningSelected !== undefined) validateNewSundayEveningSelected(newSundayEveningSelected)


    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)
            return Nanny.findById(nannyId)
        })
        .then(nanny => {
            if (!nanny) throw new ExistenceError(`nanny with id ${nannyId} not found`)

            const availabilities = []

            if (newMondayMorningSelected || newMondayAfternoonSelected || newMondayEveningSelected) {
                const availability = new Availability({ day: 'Monday' })

                if (newMondayMorningSelected) availability.times.push('Morning')
                if (newMondayAfternoonSelected) availability.times.push('Afternoon')
                if (newMondayEveningSelected) availability.times.push('Evening')

                availabilities.push(availability)
            }

            if (newTuesdayMorningSelected || newTuesdayAfternoonSelected || newTuesdayEveningSelected) {
                const availability = new Availability({ day: 'Tuesday' })

                if (newTuesdayMorningSelected) availability.times.push('Morning')
                if (newTuesdayAfternoonSelected) availability.times.push('Afternoon')
                if (newTuesdayEveningSelected) availability.times.push('Evening')

                availabilities.push(availability)
            }

            nanny.availabilities = availabilities

            nanny.id = nanny._id.toString()
            nanny.user.id = nanny.user._id.toString()
            nanny.availabilities.forEach(availability => {
                availability.id = availability._id.toString()
                delete availability._id
            })
            delete nanny._id
            delete nanny.user._id
            return nanny.save()

        })
}
module.exports = updateAvailabilities