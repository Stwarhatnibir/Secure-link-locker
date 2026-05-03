const { validationResult } = require("express-validator");
const VaultItem = require("../models/vaultItem.model");
const { encrypt, decrypt } = require("../services/encryption.service");

async function getItems(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = { userId: req.user._id };

    if (category && category !== "all") {
      filter.category = category;
    }

    let items = await VaultItem.find(filter).sort({ createdAt: -1 });

    if (search) {
      const lower = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          (item.note && item.note.toLowerCase().includes(lower)),
      );
    }

    const result = items.map((item) => {
      const obj = item.toObject();
      if (item.isSensitive && item.encryptedData && item.iv) {
        try {
          obj.note = decrypt(item.encryptedData, item.iv);
        } catch {
          obj.note = "[Decryption failed]";
        }
        delete obj.encryptedData;
        delete obj.iv;
      }
      return obj;
    });

    res.json({ items: result });
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, url, note, category, isSensitive } = req.body;

    const itemData = {
      userId: req.user._id,
      title,
      url: url || null,
      category,
      isSensitive: !!isSensitive,
    };

    if (isSensitive && note) {
      const { encryptedData, iv } = encrypt(note);
      itemData.encryptedData = encryptedData;
      itemData.iv = iv;
      itemData.note = null;
    } else {
      itemData.note = note || null;
    }

    const item = await VaultItem.create(itemData);
    const obj = item.toObject();

    if (item.isSensitive && item.encryptedData) {
      obj.note = note;
      delete obj.encryptedData;
      delete obj.iv;
    }

    res.status(201).json({ item: obj });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const item = await VaultItem.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    const { title, url, note, category, isSensitive } = req.body;

    item.title = title ?? item.title;
    item.url = url !== undefined ? url : item.url;
    item.category = category ?? item.category;
    item.isSensitive =
      isSensitive !== undefined ? !!isSensitive : item.isSensitive;

    if (item.isSensitive && note !== undefined) {
      const { encryptedData, iv } = encrypt(note);
      item.encryptedData = encryptedData;
      item.iv = iv;
      item.note = null;
    } else if (!item.isSensitive) {
      item.note = note !== undefined ? note : item.note;
      item.encryptedData = null;
      item.iv = null;
    }

    await item.save();

    const obj = item.toObject();
    if (item.isSensitive && item.encryptedData) {
      try {
        obj.note = decrypt(item.encryptedData, item.iv);
      } catch {
        obj.note = null;
      }
      delete obj.encryptedData;
      delete obj.iv;
    }

    res.json({ item: obj });
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const item = await VaultItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    next(err);
  }
}

module.exports = { getItems, createItem, updateItem, deleteItem };
