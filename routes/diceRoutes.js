const _ = require("lodash")
const mongoose = require("mongoose")
const dice = require("../services/dice-roller");

const Room = mongoose.model("rooms")
const Message = mongoose.model( "messages")
const User = mongoose.model("users")

module.exports = (app) => {

    app.get("/api/room", async (req, res) => {
        const room = await Room.findOne({name : "diceroom"})
        res.send({
            room
        })
    })

    app.get("/api/room/clear", async (req, res) => {
        const existingRoom = await Room.findOne({name : "diceroom"})
        if (existingRoom) {
            existingRoom.messages = []
            await Room(existingRoom).save()
        }
        res.send(await Room.findOne({name: "diceroom"}))
    })

    app.post("/api/message", async (req, res) => {
        const existingRoom = await Room.findOne({name : "diceroom"})
        if (existingRoom) {
            const roller = new dice.DiceRoller();
            const result = req.body.diceRoll ? roller.roll(req.body.diceRoll.replace(/\s/g, "").toLowerCase()).toString() : "n/a"
            existingRoom.messages.push(Message({
                user: req.user,
                diceRoll: req.body.diceRoll || "n/a",
                diceResult: result,
                messageBody: req.body.messageBody
            }))
            await Room(existingRoom).save()
        } else {
            await Room({
                name: "diceroom",
                topic: "rolls",
                messages: [],
                createdAt: Date.now()
            }).save()
        }
        res.send(await Room.findOne({name: "diceroom"}))
    })

    app.get("/api/cthulhu/room", async (req, res) => {
        const room = await Room.findOne({name : "cthulhu-diceroom"})
        res.send({
            room
        })
    })

    app.get("/api/cthulhu/room/clear", async (req, res) => {
        const existingRoom = await Room.findOne({name : "cthulhu-diceroom"})
        if (existingRoom) {
            existingRoom.messages = []
            await Room(existingRoom).save()
        }
        res.send(await Room.findOne({name: "cthulhu-diceroom"}))
    })

    app.post("/api/cthulhu/message", async (req, res) => {
        const existingRoom = await Room.findOne({name : "cthulhu-diceroom"})
        if (existingRoom) {
            const roller = new dice.DiceRoller();
            const result = req.body.diceRoll ? roller.roll(req.body.diceRoll.replace(/\s/g, "").toLowerCase()).toString() : "n/a"
            existingRoom.messages.push(Message({
                user: req.user,
                diceRoll: req.body.diceRoll || "n/a",
                diceResult: result,
                messageBody: req.body.messageBody
            }))
            await Room(existingRoom).save()
        } else {
            await Room({
                name: "cthulhu-diceroom",
                topic: "rolls",
                messages: [],
                createdAt: Date.now()
            }).save()
        }
        res.send(await Room.findOne({name: "cthulhu-diceroom"}))
    })

}