

import app from './index.js';

const PORT = process.env.PORT || 3000;

const Showurl =(req,res,next)=>{
    
    console.log(req.path);
    next()
}
app.use(Showurl)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
