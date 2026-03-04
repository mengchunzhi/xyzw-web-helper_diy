/**
 * 任务模板服务
 */

import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * 任务模板服务
 */
class TaskTemplateService {
  /**
   * 获取所有模板
   */
  async getAllTemplates() {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error(`获取模板列表失败: ${JSON.stringify(error)}`);
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error(`获取模板列表异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取单个模板
   */
  async getTemplateById(id) {
    try {
      const { data, error } = await supabase
        .from('task_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        logger.error(`获取模板失败: ${JSON.stringify(error)}`);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error(`获取模板异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 创建模板
   */
  async createTemplate(templateData) {
    try {
      const template = {
        id: uuidv4(),
        name: templateData.name,
        settings: templateData.settings || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('task_templates')
        .insert(template)
        .select()
        .single();

      if (error) {
        logger.error(`创建模板失败: ${JSON.stringify(error)}`);
        throw error;
      }

      logger.info(`模板创建成功: ${template.name}`);
      return data;
    } catch (error) {
      logger.error(`创建模板异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 更新模板
   */
  async updateTemplate(id, updates) {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('task_templates')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error(`更新模板失败: ${JSON.stringify(error)}`);
        throw error;
      }

      logger.info(`模板更新成功: ${id}`);
      return data;
    } catch (error) {
      logger.error(`更新模板异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 删除模板
   */
  async deleteTemplate(id) {
    try {
      const { error } = await supabase
        .from('task_templates')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error(`删除模板失败: ${JSON.stringify(error)}`);
        throw error;
      }

      logger.info(`模板删除成功: ${id}`);
      return true;
    } catch (error) {
      logger.error(`删除模板异常: ${error.message}`);
      throw error;
    }
  }
}

export default new TaskTemplateService();
