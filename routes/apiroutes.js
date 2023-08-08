const router = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid")

router.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});


router.post("/api/notes",(req, res)=>{
    const dbData = JSON.parse(fs.readFileSync("db/db.json"))
    const newNotes = req.body
    newNotes.id = uniqid()
    dbData.push(newNotes)
    fs.writeFileSync("db/db.json", JSON.stringify(dbData))
    res.json(dbData)
})

router.delete("/api/notes/:id", (req,res)=>{
    const dbData=JSON.parse(fs.readFileSync("db/db.json"))
    const note= dbData.filter((delNote)=>delNote.id !== req.params.id)
    fs.writeFileSync("db/db.json", JSON.stringify(note))
    res.json(note)
})


module.exports = router;
