const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validator = require('validator');
const URL = require('../models/URL');


router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl || !validator.isURL(originalUrl, { require_protocol: true })) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    let existingUrl = await URL.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({ 
        shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortId}` 
      });
    }
    const shortId = shortid.generate();
    const newUrl = new URL({
      originalUrl,
      shortId
    });
    await newUrl.save();
    res.status(201).json({ 
      shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while shortening URL' });
  }
});

router.get('/:shortId', async (req, res) => {
    try {
      const { shortId } = req.params;
      const urlEntry = await URL.findOne({ shortId });
      if (!urlEntry) {
        console.log('No URL found for shortId:', shortId);
        return res.status(404).json({ 
          error: 'URL not found', 
          message: `No URL found for shortId: ${shortId}` 
        });
      }
      urlEntry.clicks += 1;
      urlEntry.lastAccessedAt = new Date();
      await urlEntry.save();
      res.redirect(urlEntry.originalUrl);
    } catch (error) {
      console.error('Detailed Error:', error);
      res.status(500).json({ 
        error: 'Server error during redirection',
        details: error.message 
      });
    }
  });


router.get('/stats/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlEntry = await URL.findOne({ shortId });
    if (!urlEntry) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.status(200).json({
      totalClicks: urlEntry.clicks,
      lastAccessedAt: urlEntry.lastAccessedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving stats' });
  }
});

module.exports = router;