  
const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password:'Claudiu_39',
    database:'top_songsDB'
})

connection.connect(err =>{
    if(err) throw err
    console.log(`Connect on thread ${connection.threadId}`)
    initialPrompts()
})
function initialPrompts() {
    inquirer.prompt([
        {
            name: 'action',
            message: 'What do you wanna do?',
            type: 'list',
            choices: ['ARTIST SEARCH', 'MULTI SEARCH', 'RANGE SEARCH', 'SONG SEARCH', 'EXIT']
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'ARTIST SEARCH':
                artistSearch()
                break
            case 'MULTI SEARCH':
                multiSearch()
                break
            case 'RANGE SEARCH':
                rangeSearch()
                break
            case 'SONG SEARCH':
                songSearch()
                break
            default:
                connection.end()
                process.exit()
        }
    })
}

function artistSearch(){
    inquirer.prompt([{
        message:'Which artist are you looking for?',
        name:'artist'
    }]).then(answer => {
        connection.query(
            'SELECT position, artist, song, year FROM top5000 WHERE ?',
        {artist: answer.artist},
            (err,results)=>{
            if(err) throw err
            console.table(results)
            initialPrompts()    
        })
    })
}
function multiSearch(){
    console.log('MultiSearch...')
    initialPrompts()
}
function rangeSearch(){
    console.log('Searching rangeSearch...')
    initialPrompts()
}
function songSearch(){
    console.log('Searching song...')
    initialPrompts()
}