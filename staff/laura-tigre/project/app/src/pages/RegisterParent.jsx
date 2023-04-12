import { useState } from 'react'
import registerParent from '../logic/register-parent'
import Button from '../library/Button'
import Container from '../library/Container'
import { Link, useNavigate } from 'react-router-dom'

function Parents(props) {
    console.log('Register -> render')

    const navigate = useNavigate()
    const [feedback, setFeedback] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const city = event.target.city.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerParent(name, city,email, password)
            .then(()=> navigate('/login'))
            .catch(error => setFeedback({
                message: error.message,
                level: 'error'
            })) 

            
        } catch (error) {
            setFeedback(error.message)
        }
    }
    return <Container className="justify-center font-['Poppins'] h-screen">
        <main className='h-max'  >
            <h2 className="text-center text-2xl font-bold text-[#fb923c]">FAMILIES KANGAROO</h2>

            <Container TagName="form" className="sm: 1/2 gap-4 bg-[#fed7aa] mt-10 p-1 rounded-lg w-277 drop-shadow-md" onSubmit={handleSubmit}>
                <img className="h-10 w-10 mt-3 " src="images/kangaroo.png" alt="kangaroo" />

                <Container className="justify-center gap-2">
                   
                    <input className="bg-[transparent] text-center focus:outline-none " type="text" id="name" placeholder="Your name" required />

                    <input className="bg-[transparent] text-center focus:outline-none " type="text" id="city" placeholder="Your city" required />
                    
                    <input className="bg-[transparent] text-center focus:outline-none " type="email" id="email" placeholder="Your email" required />
                   
                    <input className=" bg-[transparent] text-center focus:outline-none " type="password" id="password" placeholder="Your password" required />
                </Container>
                <div>
                    <Button type='submit'>REGISTER</Button>
                </div>

            </Container>
            <p className="flex items-center justify-center gap-2 text-[#dc2626] text-2xl">{feedback}</p>
            <p className="flex items-center justify-center gap-4 mt-3">
                or
                <Link to="/login" className="text-xl font-bold text-[#fb923c]" >Login</Link>
            </p>
        </main>
    </Container>

}
export default Parents