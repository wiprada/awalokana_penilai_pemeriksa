const express = require('express');

const router = express.Router();

// Dummy data store
let items = [];
let idCounter = 1;

// GET /items - Menampilkan semua items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items - Menambah item baru
router.post('/', (req, res) => {
    const { name, status } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = { id: idCounter++, name, status: status || 'inactive' };
    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE /items/:id - Menghapus item
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
});

// PATCH /items/:id/status - Mengubah status item
router.patch('/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    item.status = status;
    res.json(item);
});

module.exports = router;