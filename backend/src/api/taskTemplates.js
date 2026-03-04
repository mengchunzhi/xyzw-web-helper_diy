/**
 * 任务模板 API
 */

import express from 'express';
import TaskTemplateService from '../services/TaskTemplateService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * 获取所有模板
 */
router.get('/', async (req, res) => {
  try {
    const templates = await TaskTemplateService.getAllTemplates();
    res.json({ success: true, data: templates });
  } catch (error) {
    logger.error(`获取模板列表失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 获取单个模板
 */
router.get('/:id', async (req, res) => {
  try {
    const template = await TaskTemplateService.getTemplateById(req.params.id);
    res.json({ success: true, data: template });
  } catch (error) {
    logger.error(`获取模板失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 创建模板
 */
router.post('/', async (req, res) => {
  try {
    const template = await TaskTemplateService.createTemplate(req.body);
    res.json({ success: true, data: template });
  } catch (error) {
    logger.error(`创建模板失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 更新模板
 */
router.put('/:id', async (req, res) => {
  try {
    const template = await TaskTemplateService.updateTemplate(req.params.id, req.body);
    res.json({ success: true, data: template });
  } catch (error) {
    logger.error(`更新模板失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 删除模板
 */
router.delete('/:id', async (req, res) => {
  try {
    await TaskTemplateService.deleteTemplate(req.params.id);
    res.json({ success: true, message: '模板删除成功' });
  } catch (error) {
    logger.error(`删除模板失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
