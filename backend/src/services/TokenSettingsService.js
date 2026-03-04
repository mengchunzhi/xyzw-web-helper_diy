/**
 * Token 设置服务
 */

import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Token 设置服务
 */
class TokenSettingsService {
  /**
   * 获取 Token 的设置
   */
  async getSettingsByTokenId(tokenId) {
    try {
      const { data, error } = await supabase
        .from('token_settings')
        .select('*')
        .eq('token_id', tokenId)
        .single();

      if (error && error.code !== 'PGRST116') {
        logger.error(`获取Token设置失败: ${JSON.stringify(error)}`);
        throw error;
      }

      return data || null;
    } catch (error) {
      logger.error(`获取Token设置异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取所有 Token 设置
   */
  async getAllSettings() {
    try {
      const { data, error } = await supabase
        .from('token_settings')
        .select('*');

      if (error) {
        logger.error(`获取所有Token设置失败: ${JSON.stringify(error)}`);
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error(`获取所有Token设置异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 保存 Token 设置（创建或更新）
   */
  async saveSettings(tokenId, settings, templateId = null) {
    try {
      const settingsData = {
        token_id: tokenId,
        settings: settings,
        template_id: templateId,
        updated_at: new Date().toISOString()
      };

      // 检查是否已存在
      const existing = await this.getSettingsByTokenId(tokenId);

      let result;
      if (existing) {
        // 更新
        const { data, error } = await supabase
          .from('token_settings')
          .update(settingsData)
          .eq('token_id', tokenId)
          .select()
          .single();

        if (error) {
          logger.error(`更新Token设置失败: ${JSON.stringify(error)}`);
          throw error;
        }
        result = data;
      } else {
        // 创建
        settingsData.id = uuidv4();
        settingsData.created_at = new Date().toISOString();
        
        const { data, error } = await supabase
          .from('token_settings')
          .insert(settingsData)
          .select()
          .single();

        if (error) {
          logger.error(`创建Token设置失败: ${JSON.stringify(error)}`);
          throw error;
        }
        result = data;
      }

      logger.info(`Token设置保存成功: ${tokenId}`);
      return result;
    } catch (error) {
      logger.error(`保存Token设置异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 删除 Token 设置
   */
  async deleteSettings(tokenId) {
    try {
      const { error } = await supabase
        .from('token_settings')
        .delete()
        .eq('token_id', tokenId);

      if (error) {
        logger.error(`删除Token设置失败: ${JSON.stringify(error)}`);
        throw error;
      }

      logger.info(`Token设置删除成功: ${tokenId}`);
      return true;
    } catch (error) {
      logger.error(`删除Token设置异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 批量保存设置
   */
  async batchSaveSettings(settingsList) {
    try {
      const results = [];
      for (const item of settingsList) {
        const result = await this.saveSettings(
          item.tokenId, 
          item.settings, 
          item.templateId
        );
        results.push(result);
      }
      logger.info(`批量保存Token设置成功: ${results.length} 条`);
      return results;
    } catch (error) {
      logger.error(`批量保存Token设置异常: ${error.message}`);
      throw error;
    }
  }
}

export default new TokenSettingsService();
