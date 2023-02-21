/**
 * publica los stickies privados
 * 
 *@return {array} the private stickies
 */

    function updateStickyVisibility(userId, stickyId, visibility) {
        
        if (!userId) throw new Error('user with id ' + userId + ' not found')
        var foundSticky
    
        for (var i = 0; i < stickies.length && !foundSticky; i++) {
            var sticky = stickies[i]
    
            if (sticky.id === stickyId) foundSticky = sticky
    
        }
    
        if (!foundSticky) throw new Error('sticky with id ' + stickyId + ' not found')
    
        if (foundSticky.user !== userId) throw new Error('sticky with id ' + stickyId + ' does not belong to user with email ' + userId)
    
        foundSticky.visibility = visibility
        
    
    
    }

