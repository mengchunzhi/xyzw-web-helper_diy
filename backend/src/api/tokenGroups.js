/**
 * Token分组API
 */

import express from 'express';
import TokenGroupService from '../services/TokenGroupService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * 获取所有分组
 */
router.get('/', async (req, res) => {
  try {
    const groups = await TokenGroupService.getAllGroups();
    res.json({ success: true, data: groups });
  } catch (error) {
    logger.error(`获取分组列表失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 创建分组
 */
router.post('/', async (req, res) => {
  try {
    const group = await TokenGroupService.createGroup(req.body);
    res.json({ success: true, data: group });
  } catch (error) {
    logger.error(`创建分组失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 更新分组
 */
router.put('/:id', async (req, res) => {
  try {
    const group = await TokenGroupService.updateGroup(req.params.id, req.body);
    res.json({ success: true, data: group });
  } catch (error) {
    logger.error(`更新分组失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 删除分组
 */
router.delete('/:id', async (req, res) => {
  try {
    await TokenGroupService.deleteGroup(req.params.id);
    res.json({ success: true, message: '分组删除成功' });
  } catch (error) {
    logger.error(`删除分组失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 批量保存分组（用于同步）
 */
router.post('/sync', async (req, res) => {
  try {
    const { groups } = req.body;
    await TokenGroupService.saveGroups(groups);
    res.json({ success: true, message: '分组同步成功' });
  } catch (error) {
    logger.error(`批量保存分组失败: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
