const {app}=require('./app/app.js')

const PORT=process.env.PORT??5640

app.listen(PORT,err=>err?console.log(err):console.log(`http://localhost:${PORT}`))
