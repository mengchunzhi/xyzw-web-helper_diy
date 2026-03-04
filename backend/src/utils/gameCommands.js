/**
 * 游戏命令工具
 */

/**
 * 错误码映射表
 * 用于将服务器返回的错误码转换为可读的错误描述
 */
export const errorCodeMap = {
  700010: "任务未达成完成条件",
  1400010: "没有购买该月卡,不能领取每日奖励",
  12000116: "今日已领取免费奖励",
  3300060: "扫荡条件不满足",
  1300050: "请修改您的采购次数",
  200020: "出了点小问题，请尝试重启游戏解决～",
  200160: "模块未开启",
  7500140: "请先输入密码",
  7500100: "密码输入错误",
  7500120: "密码输入错误次数已达上限",
  200400: "操作太快，请稍后再试",
  200760: "您当前看到的界面已发生变化，请重新登录",
  2300190: "今天已经签到过了",
  2300370: "俱乐部商品购买数量超出上限",
  400000: "物品不存在",
  1500020: "能量不足",
  2300070: "未加入俱乐部",
  3500020: "没有可领取的奖励",
  12000050: "今日发车次数已达上限",
  12000060: "不在发车时间内",
  400190: "没有可领取的签到奖励",
  1000020: "今天已经领取过奖励了",
  3300050: "购买数量超出限制",
  700020: "已经领取过这个任务",
  12400000: "挂机奖励领取过于频繁",
  2300250: "俱乐部BOSS今日攻打次数已用完",
  400010: "物品数量不足",
  7900023: "已达到使用次数上限",
  12300040: "没有空格子了",
  12300080: "未达到解锁条件",
  200330: "无效的ID",
  1500040: "上座塔的奖励未领取",
  1500010: "已经全部通关",
};

/**
 * 游戏命令列表
 */
export const gameCommands = {
  // 角色/系统
  role_getroleinfo: {
    name: "获取角色信息",
    defaultParams: {
      clientVersion: "2.10.3-f10a39eaa0c409f4-wx",
      inviteUid: 0,
      platform: "hortor",
      platformExt: "mix",
      scene: "",
    }
  },
  system_getdatabundlever: {
    name: "获取数据版本",
    defaultParams: { isAudit: false }
  },
  system_buygold: {
    name: "购买金币",
    defaultParams: { buyNum: 1 }
  },
  system_claimhangupreward: {
    name: "领取挂机奖励"
  },
  system_signinreward: {
    name: "签到"
  },
  system_mysharecallback: {
    name: "分享回调",
    defaultParams: { isSkipShareCard: true, type: 2 }
  },
  system_custom: {
    name: "自定义系统命令",
    defaultParams: { key: "", value: 0 }
  },

  // 任务相关
  task_claimdailypoint: {
    name: "领取日常任务点数",
    defaultParams: { taskId: 1 }
  },
  task_claimdailyreward: {
    name: "领取日常任务奖励",
    defaultParams: { rewardId: 0 }
  },
  task_claimweekreward: {
    name: "领取周任务奖励",
    defaultParams: { rewardId: 0 }
  },

  // 好友/招募
  friend_batch: {
    name: "好友批量操作",
    defaultParams: { friendId: 0 }
  },
  hero_recruit: {
    name: "招募武将",
    defaultParams: {
      byClub: false,
      recruitNumber: 1,
      recruitType: 3,
    }
  },
  item_openbox: {
    name: "开宝箱",
    defaultParams: { itemId: 2001, number: 10 }
  },
  item_batchclaimboxpointreward: {
    name: "批量领取宝箱积分奖励"
  },
  item_openpack: {
    name: "开背包"
  },
  rank_getserverrank: {
    name: "获取服务器排名"
  },

  // 竞技场
  arena_startarea: {
    name: "开始竞技场"
  },
  fight_startlevel: {
    name: "获取战斗版本"
  },
  arena_getareatarget: {
    name: "获取竞技场目标",
    defaultParams: { refresh: false }
  },
  arena_getarearank: {
    name: "获取竞技场排名"
  },

  // 商店
  store_goodslist: {
    name: "获取商店商品列表",
    defaultParams: { storeId: 1 }
  },
  store_buy: {
    name: "购买商品",
    defaultParams: { goodsId: 1 }
  },
  store_purchase: {
    name: "购买商品",
    defaultParams: { goodsId: 1 }
  },
  store_refresh: {
    name: "刷新商店",
    defaultParams: { storeId: 1 }
  },

  // 军团
  legion_getinfo: {
    name: "获取军团信息"
  },
  legion_signin: {
    name: "军团签到"
  },
  legion_getwarrank: {
    name: "获取军团排名"
  },
  legionwar_getdetails: {
    name: "获取军团战详情"
  },
  legion_storebuygoods: {
    name: "军团商店购买"
  },
  legion_kickout: {
    name: "踢出军团"
  },
  legion_applylist: {
    name: "获取军团申请列表"
  },
  legion_approveapply: {
    name: "批准军团申请"
  },
  legion_refuseapply: {
    name: "拒绝军团申请"
  },
  legion_agree: {
    name: "同意军团邀请"
  },
  legion_ignore: {
    name: "忽略军团邀请"
  },

  legion_getinfobyid: {
    name: "通过ID获取军团信息"
  },
  legion_getarearank: {
    name: "获取军团区域排名"
  },
  saltroad_getsaltroadwartotalrank: {
    name: "获取盐场战争总排名"
  },
  legionwar_getgoldmonthwarrank: {
    name: "获取军团金币月排名"
  },
  legion_getopponent: {
    name: "获取军团对手"
  },
  legion_getbattlefield: {
    name: "获取战场信息"
  },
  legion_claimpayloadtask: {
    name: "领取运输任务"
  },
  legion_claimpayloadtaskprogress: {
    name: "领取运输任务进度"
  },
  saltroad_getwartype: {
    name: "获取盐场战争类型"
  },
  saltroad_getsaltroadwargrouprank: {
    name: "获取盐场战争组排名"
  },

  // 邮件
  mail_getlist: {
    name: "获取邮件列表",
    defaultParams: { category: [0, 4, 5], lastId: 0, size: 60 }
  },
  mail_claimallattachment: {
    name: "领取所有邮件附件",
    defaultParams: { category: 0 }
  },
  mail_getmtlinfo: {
    name: "获取邮件详细信息"
  },
  mail_getmtlshortinfo: {
    name: "获取邮件简要信息"
  },

  // 学习问答
  study_startgame: {
    name: "开始学习游戏"
  },
  study_answer: {
    name: "回答问题"
  },
  study_claimreward: {
    name: "领取学习奖励",
    defaultParams: { rewardId: 1 }
  },

  // 战斗相关
  fight_starttower: {
    name: "开始爬塔"
  },
  fight_startboss: {
    name: "开始打BOSS"
  },
  fight_startlegionboss: {
    name: "开始打军团BOSS"
  },
  fight_startdungeon: {
    name: "开始打 dungeon"
  },
  fight_startpvp: {
    name: "开始PVP"
  },

  // 怪异咸将塔
  evotower_getinfo: {
    name: "获取怪异塔信息"
  },
  evotower_fight: {
    name: "怪异塔战斗"
  },
  evotower_getlegionjoinmembers: {
    name: "获取军团加入成员"
  },
  evotower_readyfight: {
    name: "准备怪异塔战斗"
  },
  evotower_claimreward: {
    name: "领取怪异塔奖励"
  },
  mergebox_getinfo: {
    name: "获取合并箱信息"
  },
  mergebox_claimfreeenergy: {
    name: "领取免费能量"
  },
  mergebox_openbox: {
    name: "开合并箱"
  },
  mergebox_automergeitem: {
    name: "自动合并物品",
    defaultParams: { actType: 1 }
  },
  mergebox_mergeitem: {
    name: "合并物品",
    defaultParams: { actType: 1 }
  },
  mergebox_claimcostprogress: {
    name: "领取消耗进度",
    defaultParams: { actType: 1 }
  },
  mergebox_claimmergeprogress: {
    name: "领取合并进度",
    defaultParams: { actType: 1 }
  },
  evotower_claimtask: {
    name: "领取怪异塔任务",
    defaultParams: { taskId: 1 }
  },

  // 瓶子机器人
  bottlehelper_claim: {
    name: "领取瓶子奖励"
  },
  bottlehelper_start: {
    name: "开始瓶子机器人",
    defaultParams: { bottleType: -1 }
  },
  bottlehelper_stop: {
    name: "停止瓶子机器人",
    defaultParams: { bottleType: -1 }
  },

  // 军团匹配和签到
  legionmatch_rolesignup: {
    name: "军团匹配报名"
  },

  // 钓鱼
  artifact_lottery: {
    name: "钓鱼抽奖",
    defaultParams: { lotteryNumber: 1, newFree: true, type: 1 }
  },
  artifact_exchange: {
    name: "钓鱼兑换"
  },

  // 灯神相关
  genie_sweep: {
    name: "灯神扫荡",
    defaultParams: { genieId: 1 }
  },
  genie_buysweep: {
    name: "购买灯神扫荡"
  },

  // 礼包相关
  discount_claimreward: {
    name: "领取折扣奖励",
    defaultParams: { discountId: 1 }
  },
  collection_claimfreereward: {
    name: "领取免费奖励"
  },
  card_claimreward: {
    name: "领取卡片奖励",
    defaultParams: { cardId: 1 }
  },

  // 爬塔相关
  tower_getinfo: {
    name: "获取塔信息"
  },
  tower_claimreward: {
    name: "领取塔奖励"
  },

  // 队伍相关
  presetteam_getinfo: {
    name: "获取预设队伍信息"
  },
  presetteam_setteam: {
    name: "设置队伍"
  },
  presetteam_saveteam: {
    name: "保存队伍",
    defaultParams: { teamId: 1 }
  },
  role_gettargetteam: {
    name: "获取目标队伍"
  },

  // 武将升级相关
  hero_heroupgradelevel: {
    name: "武将升级"
  },
  hero_heroupgradeorder: {
    name: "武将进阶"
  },

  // 升星相关
  hero_heroupgradestar: {
    name: "武将升星"
  },
  book_upgrade: {
    name: "书本升级"
  },
  book_claimpointreward: {
    name: "领取书本点数奖励"
  },

  // 排名相关
  rank_getroleinfo: {
    name: "获取角色排名信息"
  },

  // 梦魇相关
  nightmare_getroleinfo: {
    name: "获取梦魇角色信息"
  },
  dungeon_selecthero: {
    name: "选择武将"
  },
  bosstower_gethelprank: {
    name: "获取宝库帮助排名"
  },
  dungeon_buymerchant: {
    name: "购买商人"
  },
  // 活动/任务
  activity_get: {
    name: "获取活动信息"
  },
  activity_recyclewarorderrewardclaim: {
    name: "回收战争令奖励领取"
  },
  legion_getpayloadtask: {
    name: "获取运输任务"
  },
  legion_getpayloadkillrecord: {
    name: "获取运输击杀记录"
  },
  legion_getpayloadbf: {
    name: "获取运输战场"
  },
  legion_getpayloadrecord: {
    name: "获取运输记录"
  },
  warguess_getrank: {
    name: "获取战争猜测排名"
  },
  warguess_startguess: {
    name: "开始战争猜测"
  },
  warguess_getguesscoinreward: {
    name: "获取猜测金币奖励"
  },

  // 珍宝阁相关
  collection_goodslist: {
    name: "获取珍宝阁商品列表"
  },

  // 车辆相关
  car_getrolecar: {
    name: "获取角色车辆"
  },
  car_refresh: {
    name: "刷新车辆",
    defaultParams: { carId: 0 }
  },
  car_claim: {
    name: "领取车辆",
    defaultParams: { carId: 0 }
  },
  car_send: {
    name: "发送车辆",
    defaultParams: { carId: 0, helperId: 0, text: "" }
  },
  car_getmemberhelpingcnt: {
    name: "获取成员帮助次数"
  },
  car_getmemberrank: {
    name: "获取成员排名"
  },
  car_research: {
    name: "车辆研究"
  },
  car_claimpartconsumereward: {
    name: "领取零件消耗奖励"
  },

  // 功法
  legacy_getinfo: {
    name: "获取功法信息"
  },
  legacy_claimhangup: {
    name: "领取功法挂机奖励"
  },
  // 功法残卷赠送
  legacy_gift_getlist: {
    name: "获取功法礼物列表"
  },
  legacy_gift_send: {
    name: "发送功法礼物",
    defaultParams: { recipientId: 0, itemId: 0, quantity: 0 }
  },
  legacy_gift_received: {
    name: "接收功法礼物"
  },
  // 安全密码验证
  role_commitpassword: {
    name: "提交密码",
    defaultParams: { password: "", passwordType: 1 }
  },
  // 功法残卷发送
  legacy_sendgift: {
    name: "发送功法残卷",
    defaultParams: { itemCnt: 0, legacyUIds: [], targetId: 0 }
  },

  // 装备淬炼相关
  equipment_confirm: {
    name: "确认装备淬炼",
    defaultParams: {
      heroId: 0,
      part: 0,
      quenchId: 0,
      quenches: {},
    }
  },
  equipment_quench: {
    name: "装备淬炼",
    defaultParams: {
      heroId: 0,
      part: 0,
      quenchId: 0,
      quenches: {},
      seed: 0,
      skipOrange: false,
    }
  },
  equipment_updatequenchlock: {
    name: "更新淬炼锁定",
    defaultParams: {
      heroId: 0,
      part: 0,
      slot: 0,
      isLocked: false,
    }
  },

  // 咸王宝库
  matchteam_getroleteaminfo: {
    name: "获取匹配队伍信息"
  },
  bosstower_getinfo: {
    name: "获取宝库信息"
  },
  bosstower_startboss: {
    name: "开始宝库BOSS"
  },
  bosstower_startbox: {
    name: "开始宝库宝箱"
  },
  discount_getdiscountinfo: {
    name: "获取折扣信息"
  },

  // 换皮闯关相关
  towers_getinfo: {
    name: "获取换皮闯关信息"
  },
  towers_start: {
    name: "开始换皮闯关"
  },
  towers_fight: {
    name: "换皮闯关战斗"
  },

  //发送游戏内消息
  system_sendchatmessage: {
    name: "发送聊天消息"
  }
};

/**
 * 获取命令信息
 * @param {string} cmd - 命令名称
 * @returns {object} - 命令信息
 */
export const getCommandInfo = (cmd) => {
  return gameCommands[cmd] || { name: cmd, defaultParams: {} };
};

/**
 * 构建命令参数
 * @param {string} cmd - 命令名称
 * @param {object} params - 自定义参数
 * @returns {object} - 合并后的参数
 */
export const buildCommandParams = (cmd, params = {}) => {
  const commandInfo = getCommandInfo(cmd);
  return { ...commandInfo.defaultParams, ...params };
};
