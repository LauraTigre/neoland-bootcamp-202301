//node notes add 'hola mundo'
const [, , command, content]= process.argv

const fs= require('fs')


if(command=== 'add'){
    const content= process.argv[3]
    const{writeFile}=fs
    const file = 'note-' +Date.now() + '.txt'
    
   

    writeFile(file,content, 'utf8', error=>{
        if(error){
            console.error('could not write note, because of error: ' + error.message)
            return
        }
        console.log('note created (' +file + ')')
    })
    

}else if (command==='get'){
    const noteId= process.argv[3]
    const{readFile}= fs
    const file = noteId +'.txt'
    readFile(file, 'utf8',(error, content)=>{
        if(error){
            console.error('could not read file, because '+ error.message)
            return
        }
        console.log(content)
    })
}
