import { useState, useEffect} from "react"
import updateNannyAvailabilities from "../logic/update-nanny-availabilities"
import updateDescriptionNanny from "../logic/update-nanny-description"
import updateExtrasNanny from "../logic/update-nanny-extras"
import updateExperience from "../logic/update-nanny-experience"
import unregisterNanny from "../logic/unregister-nanny"
import retrieveNanny from "../logic/retrieve-nanny-profile"
import Button from '../library/Button'
import Container from '../library/Container'
import Feedback from './Feedback'
import updatePhotoNanny from "../logic/update-photo-nanny"



function ProfileUserNanny({onUnregisterNanny, listUpdateStamp}) {
  console.log('Profile -> render')
  console.log('UpdateUserPassword -> render')

  const [feedback, setFeedback] = useState()
  const [nanny, setNanny] = useState()

  const loadList = () => {

    try {

      retrieveNanny(sessionStorage.token, (error, nanny) => {
        if (error) {
          alert(error)
          return
        }
        setNanny(nanny)
      })

    } catch (error) {
      alert(error.message)
    }

  }
  const handleSubmitPhoto = (event) => {
    event.preventDefault()
    const newPhoto = event.target.newPhoto.value
      
    try {
      updatePhotoNanny(sessionStorage.token, newPhoto, error => {
        if (error) {
          setFeedback({
            message: error.message,
            level: 'error'
          })
          return
        }
        event.target.reset()
        loadList()
        setFeedback({
          message: 'photo updated successfully',
          level: 'success'
        })
      })
    } catch (error) {
      setFeedback({
        message: error.message,
        level: 'error'
      })
    }

  }

  const handleSubmitAvailability = (event) => {
    event.preventDefault()

    const newMondayMorningSelected = event.target.newMondayMorningSelected.checked
    const newMondayAfternoonSelected = event.target.newMondayAfternoonSelected.checked
    const newMondayEveningSelected = event.target.newMondayEveningSelected.checked
    const newTuesdayMorningSelected = event.target.newTuesdayMorningSelected.checked
    const newTuesdayAfternoonSelected = event.target.newTuesdayAfternoonSelected.checked
    const newTuesdayEveningSelected = event.target.newTuesdayEveningSelected.checked
    const newWendsdayMorningSelected = event.target.newWendsdayMorningSelected.checked
    const newWendsdayAfternoonSelected = event.target.newWendsdayAfternoonSelected.checked
    const newWendsdayEveningSelected = event.target.newWendsdayEveningSelected.checked
    const newThursdayMorningSelected = event.target.newThursdayMorningSelected.checked
    const newThursdayAfternoonSelected = event.target.newThursdayAfternoonSelected.checked
    const newThursdayEveningSelected = event.target.newThursdayEveningSelected.checked
    const newFridayMorningSelected = event.target.newFridayMorningSelected.checked
    const newFridayAfternoonSelected = event.target.newFridayAfternoonSelected.checked
    const newFridayEveningSelected = event.target.newFridayEveningSelected.checked
    const newSaturdayMorningSelected = event.target.newSaturdayMorningSelected.checked
    const newSaturdayAfternoonSelected = event.target.newSaturdayAfternoonSelected.checked
    const newSaturdayEveningSelected = event.target.newSaturdayEveningSelected.checked
    const newSundayMorningSelected = event.target.newSundayMorningSelected.checked
    const newSundayAfternoonSelected = event.target.newSundayAfternoonSelected.checked
    const newSundayEveningSelected = event.target.newSundayEveningSelected.checked

    try {
      updateNannyAvailabilities(sessionStorage.token,newMondayMorningSelected,
        newMondayAfternoonSelected,
        newMondayEveningSelected,
        newTuesdayMorningSelected, newTuesdayAfternoonSelected, newTuesdayEveningSelected, newWendsdayMorningSelected, newWendsdayAfternoonSelected, newWendsdayEveningSelected, newThursdayMorningSelected, newThursdayAfternoonSelected, newThursdayEveningSelected, newFridayMorningSelected, newFridayAfternoonSelected, newFridayEveningSelected, newSaturdayMorningSelected, newSaturdayAfternoonSelected, newSaturdayEveningSelected, newSundayMorningSelected, newSundayAfternoonSelected, newSundayEveningSelected,error => {
          if (error) {
            setFeedback({
              message: error.message,
              level: 'error'
            })
            return
          }
         
          event.target.reset()
          setFeedback({
            message: 'availability updated successfully',
            level: 'success'
          })
        })
      } catch (error) {
        setFeedback({
          message: error.message,
          level: 'error'
        })
      }
      
  }
  useEffect(() => {

    loadList()
  }, [listUpdateStamp])
  const handleSubmitExperience = (event) => {
    event.preventDefault()
    const newExperience =parseInt(event.target.newExperience.value)
    try {
      updateExperience(sessionStorage.token,newExperience,error => {
        if (error) {
          setFeedback({
            message: error.message,
            level: 'error'
          })
          return
        }
       
        event.target.reset()
        loadList()
        setFeedback({
          message: 'experience updated successfully',
          level: 'success'
        })
      })
    } catch (error) {
      setFeedback({
        message: error.message,
        level: 'error'
      })
    }
    
  }
  const handleSubmitDescription = (event) => {
    event.preventDefault()
    const newDescription = event.target.newDescription.value
    try {
      updateDescriptionNanny(sessionStorage.token,newDescription,error => {
        if (error) {
          setFeedback({
            message: error.message,
            level: 'error'
          })
          return
        }
        event.target.reset()
        loadList()
        setFeedback({
          message: 'description updated successfully',
          level: 'success'
        })
      })
    } catch (error) {
      setFeedback({
        message: error.message,
        level: 'error'
      })
    }
    
  }
  const handleSubmitExtras = (event) => {
    event.preventDefault()
    const newExtras = event.target.newExtras.value
    try {
      updateExtrasNanny(sessionStorage.token,newExtras,error => {
        if (error) {
          setFeedback({
            message: error.message,
            level: 'error'
          })
          return
        }
        event.target.reset()
        loadList()
        setFeedback({
          message: 'new extras updated successfully',
          level: 'success'
        })
      })
    } catch (error) {
      setFeedback({
        message: error.message,
        level: 'error'
      })
    }
    
  }
  const handleSubmitUnregister = (event) => {
    event.preventDefault()

    const password = event.target.password.value
    try {
        unregisterNanny(sessionStorage.token, password, error => {
            if (error) {

                setFeedback({
                    message: error.message,
                    level: 'error'
                })
                return
            }
            onUnregisterNanny()
        })
    } catch (error) {
        setFeedback({
            message: error.message,
            level: 'error'
        })

    }
}


 

  return <Container className="sm: items-center justify-center h-full w-full mb-20">
    <Container TagName="form" onSubmit={handleSubmitPhoto} className="sm: w-1/2 gap-4 p-3 rounded-lg">
      <fieldset className='sm: w-1/2 flex flex-col items-center justify-center  p-5 border-solid border-2 border-[#fb923c] rounded-md'>
        <legend>{nanny?.user?.name}</legend>
        <img src={nanny?.photo} />
        <input
          className="sm: bg-transparent border-[#fb923c] mb-2"
          type="text"
          name="newPhoto"
          placeholder="new photo"></input>

        <Button type="submit">New photo</Button>
      </fieldset>
    </Container>
  
    <Container TagName="form" className='sm:items-center justify-center p-5' onSubmit={handleSubmitAvailability}>
    <fieldset className='sm: flex flex-col items-center justify-center p-5 border-solid border-2 border-[#fb923c] rounded-md'>
      <legend>Availability</legend>
      <table className='sm:text-center table table-fixed p-2 m-5'>
        <thead >
          <tr className='sm:text-center my-2'>
            <th className='sm:py-1'>Day</th>
            <th className='sm:py-1'>Morning</th>
            <th className='sm:py-1'>Afternoon</th>
            <th className='sm:py-1'>Evening</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-200 text-center">
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Monday</th>
            <td><input type="checkbox" id='newMondayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newMondayAfternoonSelected' name='newMondayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newMondayEveningSelected' name='newMondayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Tuesday</th>
            <td><input type="checkbox" id='newTuesdayMorningSelected' name='newTuesdayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newTuesdayAfternoonSelected' name='newTuesdayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newTuesdayEveningSelected' name='newTuesdayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Wendsday</th>
            <td><input type="checkbox" id='newWendsdayMorningSelected' name='newWendsdayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newWendsdayAfternoonSelected' name='newWendsdayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newWendsdayEveningSelected' name='newWendsdayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Thursday</th>
            <td><input type="checkbox" id='newThursdayMorningSelected' name='newThursdayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newThursdayAfternoonSelected' name='newThursdayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newThursdayEveningSelected' name='newThursdayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Friday</th>
            <td><input type="checkbox" id='newFridayMorningSelected' name='newFridayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newFridayAfternoonSelected' name='newFridayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newFridayEveningSelected' name='newFridayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Saturday</th>
            <td><input type="checkbox" id= 'newSaturdayMorningSelected' name= 'newSaturdayMorningSelected' ></input></td>
            <td><input type="checkbox" id= 'newSaturdayAfternoonSelected' name= 'newSaturdayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id= 'newSaturdayEveningSelected' name= 'newSaturdayEveningSelected' ></input></td>

          </tr>
          <tr className='sm:text-center my-2'>
            <th className='sm:px-2 py-1'>Sunday</th>
            <td><input type="checkbox" id='newSundayMorningSelected' name='newSundayMorningSelected' ></input></td>
            <td><input type="checkbox" id='newSundayAfternoonSelected' name='newSundayAfternoonSelected' ></input></td>
            <td><input type="checkbox" id='newSundayEveningSelected' name='newSundayEveningSelected' ></input></td>

          </tr>
        </tbody>
      </table>

    <Button type="submit">New Availability</Button>
    </fieldset>
  </Container>
   
    <Container TagName="form" onSubmit={handleSubmitExperience} className="sm: w-1/2 flex flex-col items-center justify-center gap-4 mt-10 p-3 rounded-lg">
      <fieldset className='sm: w-1/2 flex flex-col items-center justify-center  p-5 border-solid border-2 border-orange-500 rounded-md'>
        <legend >Experience</legend>
        <p>{nanny?.experience} years </p>
        <input
          className="sm:bg-transparent pb-2 "
          type="number"
          name="newExperience"
          placeholder=" new experience" />

        <Button type='submit'> New Experience</Button>

      </fieldset>
   
    </Container>

    <Container TagName="form" onSubmit={handleSubmitDescription} className="sm: w-1/2
    flex flex-col items-center justify-center gap-4 mt-10 p-3 rounded-lg">
      <fieldset className='sm: w-1/2 flex flex-col items-center justify-center  p-5 border-solid border-2 border-orange-500 rounded-md'>
        <legend >Description</legend>
        <p>{nanny?.description}</p>
        <input
          className="sm: bg-transparent pb-2"
          type="text"
          name="newDescription"
          placeholder=" new description" />

        <Button type="submit">New description</Button>

      </fieldset>

   
    </Container>
    <Container TagName="form" onSubmit={handleSubmitExtras} className="sm: w-1/2
    flex flex-col items-center justify-center gap-4 mt-10 p-3 rounded-lg">
      <fieldset className='sm: w-1/2  flex flex-col items-center justify-center p-5 border-solid border-2 border-orange-500 rounded-md'>
        <legend >Extras</legend>
        <p>{nanny?.extras}</p>
        <input
          className="sm: bg-transparent pb-2 "
          type="text"
          name="newExtras"
          placeholder=" new extras" />

        <Button type="submit">New extras</Button>

      </fieldset>

   
    </Container>

    <Container TagName="form" onSubmit={handleSubmitUnregister} className="sm: w-1/2 flex flex-col items-center justify-center gap-4 mt-10 p-3 rounded-lg">
      <fieldset className='sm: w-1/2 flex flex-col items-center justify-center  p-5 border-solid border-2 border-orange-500 rounded-md'>
        <legend>Unregister User</legend>
       
        <input
          className="sm: bg-transparent pb-2 "
          type="password"
          name="password"
          placeholder=" your password" />
        <Button type="submit">Unregister user</Button>

      </fieldset>

    {feedback && <Feedback message={feedback.message} level={feedback.level} />}
    </Container>


  </Container>

}
export default ProfileUserNanny
