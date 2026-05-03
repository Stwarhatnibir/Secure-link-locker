const mongoose = require("mongoose");

const vaultItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    url: {
      type: String,
      trim: true,
      default: null,
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["login", "note", "link", "card", "identity", "other"],
      default: "other",
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    encryptedData: {
      type: String,
      default: null,
    },
    iv: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

vaultItemSchema.index({ userId: 1, category: 1 });
vaultItemSchema.index({ userId: 1, title: "text" });

module.exports = mongoose.model("VaultItem", vaultItemSchema);
