const express = require('express')
const Notes = require("../models/Notes")
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")

router.get('/getallnotes', fetchuser, async (req, res) => {
    console.log(req)
    try{
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 3 }),
    body('description', "enter a valid description").isLength({min:5}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array })
    }
    try {
        const { title, description, tag } = req.body
        const note = new Notes({ title, description, tag, user: req.user.id })
        const savenote =await note.save()
        res.json(savenote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }

})

router.put('/updatenote/:id', fetchuser,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array })
    }
    try {
        const { title, description, tag } = req.body
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({ error: "not allowed" })
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.send(note)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }

})

router.delete('/deletenode/:id', fetchuser,async (req, res) => {
    try {
        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({ error: "not allowed" })
        }
        note=await Notes.deleteOne({_id:req.params.id})
        res.send(note)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }

})
module.exports=router