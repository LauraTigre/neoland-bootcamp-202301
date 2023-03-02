import { useState, useEffect } from 'react'
import retrieveMyStickies from '../logic/retrieve-my-stickies'
import updateStickyText from '../logic/update-sticky-text'
import deleteSticky from '../logic/delete-sticky'
import updateStickyVisibility from '../logic/update-sticky-visibility'
import toggleLikeSticky from '../logic/toggle-like-sticky'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import Container from '../library/Container'
import changeStickyColor from '../logic/change-sticky-color'

function MyList({ listUpdateStamp }) {


    const [stickies, setStickies] = useState([])
    const loadlist = () => {

        try {
            retrieveMyStickies(sessionStorage.userId, (error, stickies) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setStickies(stickies.reverse())

            })

        } catch (error) {
            alert(error.message)
        }


    }

    useEffect(() => {
        loadlist()

    }, [listUpdateStamp])


    const handleEditText = event => {
        try {
            updateStickyText(sessionStorage.userId, event.target.id, event.target.innerText, error => {
                if (error) {
                    alert(error.message)
                    return
                }
            })

        } catch (error) {
            alert(error.message)

        }
    }

    const handleDelete = event => {
        try {
            deleteSticky(sessionStorage.userId, event.target.id, error => {
                if (error) {
                    alert(error.message)
                    return
                }
                loadlist()

            })

        } catch (error) {
            alert(error.message)
        }
    }
    const handleUpdateVisibility = event => {
        try {
            updateStickyVisibility(sessionStorage.userId, event.target.id, event.target.dataset.visibility === 'private' ? 'public' : 'private', error => {
                if (error) {
                    alert(error.message)
                    return
                }
                loadlist()

            })
        } catch (error) {
            alert(error.message)
        }
    }
    const handleLike = event => {
        try {
            toggleLikeSticky(sessionStorage.userId, event.currentTarget.id, error => {
                if (error) {
                    alert(error.message)
                    return
                }

                loadlist()
            })
        } catch (error) {
            alert(error.message)

        }
    }
    const handleChangeColor= event=>{

        try {
          changeStickyColor(sessionStorage.userId, event.target.id,event.target.value, error=>{
            if (error) {
              alert(error.message)
              return
            }
            // loadlist()
            setStickies(prevStickies=>{
              const copyOfStickies= [...prevStickies]
              const index= copyOfStickies.findIndex(sticky => sticky._id === event.target.id)
              copyOfStickies[index].color= event.target.value
              return copyOfStickies
            })
          })
        } catch (error) {
          alert(error.message)
        }
    
    }

    return <Container TagName="ul" className="gap-4 py-20 mb-10 ">
        {stickies.map(sticky =>
            <li className={`background-${sticky.color}  w-[30ch] p-3 rounded-lg border-solid border-2 border-[#6b7280]`} key={sticky._id}>
                <div className="flex flex-row justify-end">
                    <select defaultValue={sticky.color} id={sticky._id} name='colorToChange' onChange={handleChangeColor}>
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                        <option value="yellow">yellow</option>
                    </select>
                    {sticky.visibility === 'public' ?
                        <button className=" border-solid border-2 border-[#6b7280] w-6 h-6 text-center m-1" id={sticky._id} onClick={handleUpdateVisibility} data-visibility={sticky.visibility}>🌍</button>
                        :
                        <button className="border-solid border-2 border-[#6b7280] w-6 h-6 text-center m-1" id={sticky._id} onClick={handleUpdateVisibility} data-visibility={sticky.visibility}>🛑</button>
                    }
                    <button className="border-solid border-2 border-[#6b7280] w-6 h-6 text-center m-1" id={sticky._id} onClick={handleDelete}>X</button>
                </div>
                <p className="w-[28ch] text-left" id={sticky._id} contentEditable onKeyUp={handleEditText} suppressContentEditableWarning={true}>{sticky.text}</p>


                <div className="flex flex-row justify-end">
                    <button className="h-5 w-5" onClick={handleLike} id={sticky._id} title={sticky.likes.join('\n')}>
                        {sticky.likes.includes(sessionStorage.userId) ? <HeartIcon className="h-5 w-5 text-red-500" /> : < HeartIconOutline className='h-5 w-5 text-black-500' />}
                    </button> <p>{sticky.likes.length}</p>

                </div>
                <p className="w-[28ch] text-right font-extrabold">{sticky.user}</p>
            </li>)}

    </Container>


}
export default MyList