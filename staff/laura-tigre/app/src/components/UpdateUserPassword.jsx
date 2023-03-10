import{useState} from 'react'
import updateUserPassword from '../logic/update-user-password'
import Button from '../library/Button'
import Container from '../library/Container'
import Feedback from './Feedback'

function UpdateUserPassword(){
console.log('UpdateUserPassword -> render')

const [feedback, setFeedback] = useState()
  const handleSubmit = (event) => {
    event.preventDefault()

    const currentPassword = event.target.currentPassword.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
      updateUserPassword(sessionStorage.token, currentPassword, newPassword, newPasswordConfirm, error => {
        if (error) {
          setFeedback({
            message: error.message,
            level: 'error'
          })

          return
        }
        event.target.reset()
        setFeedback({
          message: 'password update successfully',
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

  return <Container>
    <Container TagName="form" onSubmit={handleSubmit} className="gap-4 bg-[#d1d5db] mt-10 p-3 rounded-lg">
    <legend className="text-xl">CHANGE PASSWORD</legend>
      <input
        className="bg-[#d6d3d1] border-4 hover:border-[#facc15] "
        type="password"
        name="currentPassword"
        placeholder="current password"
      />
      <input
        className="bg-[#d6d3d1] border-4 hover:border-[#facc15] "
        type="password"
        name="newPassword"
        placeholder="new password"
      />
      <input
        className="bg-[#d6d3d1] border-4 hover:border-[#facc15] "
        type="password"
        name="newPasswordConfirm"
        placeholder="confirm new password"
      />
      {/* <button className=" bg-[#facc15] h-7 w-40" type="submit">Update password</button> */}
      <Button type= "submit">Update password</Button>
    </Container>
    {feedback && <Feedback message={feedback.message} level={feedback.level} />}


  </Container>
}

export default UpdateUserPassword