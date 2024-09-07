const BschModel = require("../model/Bsch.js");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
// const { default: mongoose } = require("mongoose");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const contact = new BschModel({
        username,
        email,
        password: hashedPassword,
      });
      await contact.save(200);
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Registration failed" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      console.log(username, password, email);
      const result = await BschModel.findOne({ username }).lean().exec();
      if (!result) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const passwordM = await bcrypt.compare(password, result.password);

      if (!passwordM) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign(
        { userId: process.env.JWTtoken_id },
        process.env.JWTtoken_pass,
        {
          expiresIn: "1hr",
        }
      );
      res.cookie("jwt", token, { httpOnly: true });
      res.render("dashboard", { username });
      // res.json({ username });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  },

  find: async (req, res) => {
    try {
      console.log(req.query.id);
      const result = await BschModel.findOne({ username: req.query.id });
      res.json({ message: result });
    } catch (error) {
      console.log({ message: error });
    }
  },

  update: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await BschModel.updateOne(
        // { username : username},
        // { $set: {password: hashedPassword}}
        { password: password },
        { $set: { username: username } }
      );
      res.json({ message: result });
    } catch (error) {
      console.log({ message: error });
    }
  },

  delete: async (req, res) => {
    try {
      const { username } = req.body;
      const result = await BschModel.deleteOne({ username: username });
      res.json({ message: result });
    } catch (error) {
      console.log({ message: error });
    }
  },
};
