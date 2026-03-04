/**
 * Token服务
 */

import { supabase } from '../config/supabase.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Token服务
 */
class TokenService {
  /**
   * 获取所有Token
   */
  async getAllTokens() {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        logger.error(`获取Token列表失败: ${error.message}`);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error(`获取Token列表异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取单个Token
   */
  async getTokenById(id) {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        logger.error(`获取Token失败: ${error.message}`);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error(`获取Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 创建Token
   */
  async createToken(tokenData) {
    try {
      const token = {
        id: uuidv4(),
        name: tokenData.name,
        token: tokenData.token,
        ws_url: tokenData.ws_url || null,
        server: tokenData.server || '',
        remark: tokenData.remark || '',
        import_method: tokenData.import_method || 'manual',
        source_url: tokenData.source_url || null,
        avatar: tokenData.avatar || '',
        is_active: tokenData.is_active !== false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tokens')
        .insert(token)
        .select()
        .single();

      if (error) {
        logger.error(`创建Token失败: ${error.message}`);
        throw error;
      }

      logger.info(`Token创建成功: ${token.name}`);
      return data;
    } catch (error) {
      logger.error(`创建Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 更新Token
   */
  async updateToken(id, updates) {
    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tokens')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error(`更新Token失败: ${error.message}`);
        throw error;
      }

      logger.info(`Token更新成功: ${id}`);
      return data;
    } catch (error) {
      logger.error(`更新Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 删除Token
   */
  async deleteToken(id) {
    try {
      const { error } = await supabase
        .from('tokens')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error(`删除Token失败: ${error.message}`);
        throw error;
      }

      logger.info(`Token删除成功: ${id}`);
      return true;
    } catch (error) {
      logger.error(`删除Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 获取激活的Token
   */
  async getActiveTokens() {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        logger.error(`获取激活Token失败: ${error.message}`);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error(`获取激活Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 批量获取Token
   */
  async getTokensByIds(ids) {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .in('id', ids);

      if (error) {
        logger.error(`批量获取Token失败: ${error.message}`);
        throw error;
      }

      return data;
    } catch (error) {
      logger.error(`批量获取Token异常: ${error.message}`);
      throw error;
    }
  }

  /**
   * 验证Token
   */
  validateToken(token) {
    if (!token) return false;
    if (typeof token !== 'string') return false;
    if (token.trim().length === 0) return false;
    if (token.trim().length < 10) return false;
    return true;
  }

  /**
   * 解析Base64 Token
   */
  parseBase64Token(base64String) {
    try {
      if (!base64String || typeof base64String !== 'string') {
        throw new Error('Token字符串无效');
      }

      const cleanBase64 = base64String.replace(/^data:.*base64,/, '').trim();

      if (cleanBase64.length === 0) {
        throw new Error('Token字符串为空');
      }

      let decoded;
      try {
        decoded = atob(cleanBase64);
      } catch (decodeError) {
        decoded = base64String.trim();
      }

      let tokenData;
      try {
        tokenData = JSON.parse(decoded);
      } catch {
        tokenData = { token: decoded };
      }

      const actualToken = tokenData.token || tokenData.gameToken || decoded;

      if (!this.validateToken(actualToken)) {
        throw new Error(`提取的token无效: "${actualToken}"`);
      }

      return {
        success: true,
        data: {
          ...tokenData,
          actualToken
        }
      };
    } catch (error) {
      return {
        success: false,
        error: "解析失败：" + error.message
      };
    }
  }
}

// 导出单例
export default new TokenService();
