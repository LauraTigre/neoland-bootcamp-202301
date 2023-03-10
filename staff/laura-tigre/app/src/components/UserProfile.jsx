import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import retrieveUserProfile from '../logic/retrieve-user-profile'
import Item from './Item'
import Container from '../library/Container'

function UserProfile({ listUpdateStamp, user, onToggleFav }){

    const [stickies, setStickies] = useState([])
    const  [userProfile, setUserProfile] = useState({})

    const {userProfileId} = useParams()

    const loadlist = () => {
   
    try {
        retrieveUserProfile(sessionStorage.token, userProfileId, (error, userProfile) => {
            if (error) {
                alert(error)
                return
            } 
            
            setUserProfile(userProfile)
            
        })
    } catch (error) {
        alert(error.message)
    }
   

}

    useEffect(() => {
        loadlist()
    }, [listUpdateStamp])

    const handleChangeColor = (stickyId, color) => {
        setStickies(stickies => {// para que se actualice cuando se cambie el color del sticky
          const index = stickies.findIndex(sticky => sticky.id === stickyId)
          const sticky = stickies[index]
    
          const stickyUpdated = { ...sticky }
          stickyUpdated.color = color
    
          const stickiesUpdated = [...stickies]
    
          stickiesUpdated[index] = stickyUpdated
    
          return stickiesUpdated
        })
    
      }
    
      const handleUpdateVisibility = (stickyId, visibility) => {
        setStickies(stickies => {// para que se actualice cuando se cambie el color del sticky
          const index = stickies.findIndex(sticky => sticky.id === stickyId)
          const sticky = stickies[index]
    
          const stickyUpdated = { ...sticky }
          stickyUpdated.visibility = visibility
    
          const stickiesUpdated = [...stickies]
    
          stickiesUpdated[index] = stickyUpdated
    
          return stickiesUpdated
        })
    
      }
    
    
    
      const handleRemoveFromList = stickyId => {
        setStickies(stickies => {
          const index = stickies.findIndex(sticky => sticky.id === stickyId)
    
          const stickiesUpdated = [...stickies]
    
          stickiesUpdated.splice(index, 1)
    
          return stickiesUpdated
        })
      }
    
      const handleLike = (userId, stickyId) => {
        setStickies(stickies => {
          const index = stickies.findIndex(sticky => sticky.id === stickyId)
          const sticky = stickies[index]
          const stickyUpdated = { ...sticky }
    
          stickyUpdated.likes = [...sticky.likes]
    
          const { likes } = stickyUpdated
    
          const indexOfUser = likes.indexOf(userId)
    
          if (indexOfUser < 0) {
            likes.push(userId)
          } else {
            likes.splice(indexOfUser, 1)
          }
    
          const stickiesUpdated = [...stickies]
    
          stickiesUpdated[index] = stickyUpdated
    
          return stickiesUpdated
        })
      }
    
     
    

    return <Container>
        <h1>{userProfile?.name}</h1>
       <Container TagName="ul" className="gap-4 py-10 ">
        {stickies.map(sticky => <Item key={sticky.id} element={sticky} onUpdateVisibility={handleUpdateVisibility} onDelete={handleRemoveFromList} onToggleLike={handleLike} onChangeColor={handleChangeColor} onToggleFav={onToggleFav} user={user} />)}
       </Container>
        
    </Container>

}

export default UserProfile