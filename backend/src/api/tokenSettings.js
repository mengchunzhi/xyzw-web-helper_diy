/**
 * Token 设置 API
 */

import express from 'express';
import TokenSettingsService from '../services/TokenSettingsService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * 获取所有 Token 设置
 */
router.get('/', async (req, res) => {
  try {
    const settings = await TokenSettingsService.getAllSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error(`获取Token设置列表失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 获取单个 Token 的设置
 */
router.get('/:tokenId', async (req, res) => {
  try {
    const settings = await TokenSettingsService.getSettingsByTokenId(req.params.tokenId);
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error(`获取Token设置失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 保存 Token 设置
 */
router.post('/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { settings, templateId } = req.body;
    const result = await TokenSettingsService.saveSettings(tokenId, settings, templateId);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`保存Token设置失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 删除 Token 设置
 */
router.delete('/:tokenId', async (req, res) => {
  try {
    await TokenSettingsService.deleteSettings(req.params.tokenId);
    res.json({ success: true, message: 'Token设置删除成功' });
  } catch (error) {
    logger.error(`删除Token设置失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 批量保存设置
 */
router.post('/batch/save', async (req, res) => {
  try {
    const { settingsList } = req.body;
    const result = await TokenSettingsService.batchSaveSettings(settingsList);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error(`批量保存Token设置失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
