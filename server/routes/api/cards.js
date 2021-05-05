const express = require('express')
const { createCard, getCard, findCards } = require('../../cards')

const router = express.Router()
module.exports = router

router.get('/', async (req, res) => {
  const cards = await findCards()
  res.send(cards)
})

router.post('/create', async (req, res) => {
  const card = await createCard()

  for (const [key, value] of Object.entries(req.query)) {
    card[key] = value
  }
  await card.save()

  res.status(201).send(card.toJSON())
})

router.post('/update', async (req, res) => {
  const id = req.query.id
  const card = id == null ? null : await getCard(id)

  if (card == null) {
    res.status(404).send('Card not found!')
    return
  }

  for (const [key, value] of Object.entries(req.query)) {
    card[key] = value
  }
  await card.save()

  res.status(204).send(card.toJSON())
})

router.post('/delete', async (req, res) => {
  const id = req.query.id
  const card = id == null ? null : await getCard(id)

  if (card == null) {
    res.status(404).send('Card not found!')
    return
  }

  await card.destroy()
  res.status(204).send('Card deleted.')
})
