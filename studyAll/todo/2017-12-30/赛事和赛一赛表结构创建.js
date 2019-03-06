-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.54 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.4.0.5169
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 db_football 的数据库结构
CREATE DATABASE IF NOT EXISTS `db_football` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_football`;

-- 导出  表 db_football.fb_big_game 结构
CREATE TABLE IF NOT EXISTS `fb_big_game` (
  `ID` varchar(64) NOT NULL,
  `LOGO` varchar(1024) DEFAULT NULL COMMENT '赛事海报',
  `TITLE` varchar(64) NOT NULL COMMENT '赛事标题',
  `STANDARD` int(11) NOT NULL COMMENT '赛制(5、6、7、8...)',
  `TYPE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '类型（1：杯赛）',
  `IS_SHOW` tinyint(4) NOT NULL DEFAULT '2' COMMENT '是否显示到首页（1：不显示，2：显示）',
  `STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '赛事状态（1：报名中，2：待开赛，3：比赛中，4：已完成）',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省名称（例如 广东省）',
  `CITY` varchar(20) DEFAULT NULL COMMENT '市名称（例如 深圳市）',
  `DISTRICT` varchar(20) DEFAULT NULL COMMENT '县/区名称（例如 南山区）',
  `ADDRESS` varchar(180) DEFAULT NULL COMMENT '地址（例如 科院北1栋1室 完整地址可以使用 省+市+区字段值+地址字段值）',
  `LON` decimal(17,13) NOT NULL COMMENT '经度',
  `LAT` decimal(17,13) NOT NULL COMMENT '纬度',
  `MAP_TYPE` tinyint(4) DEFAULT NULL COMMENT '地图类型（1:高德，2:百度，3:谷歌）',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `JOIN_START_TIME` datetime NOT NULL COMMENT '报名开始时间',
  `JOIN_END_TIME` datetime NOT NULL COMMENT '报名截至时间',
  `START_TIME` datetime NOT NULL COMMENT '比赛开始时间',
  `END_TIME` datetime DEFAULT NULL COMMENT '比赛结束时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_attention 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_attention` (
  `ID` varchar(64) NOT NULL,
  `BIG_GAME_ID` varchar(64) NOT NULL COMMENT '赛事ID',
  `USER_ID` varchar(64) NOT NULL COMMENT '用户ID（ve_user.ID）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='关注赛事的人员';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_detail 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_detail` (
  `BIG_GAME_ID` varchar(64) NOT NULL COMMENT '赛事ID（fb_big_game.ID）',
  `NOTICE_CONTENT` mediumtext COMMENT '赛事须知',
  `RULE_CONTENT` mediumtext COMMENT '规程',
  PRIMARY KEY (`BIG_GAME_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事详细（包含须知、规程等）';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_result 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_result` (
  `BIG_GAME_ID` varchar(64) NOT NULL COMMENT '赛事ID',
  `TOP1_TEAM_ID` varchar(64) DEFAULT NULL COMMENT '冠军球队ID（fb_team.ID）',
  `TOP1_TEAM_NAME` varchar(32) DEFAULT NULL COMMENT '<冗余>冠军球队名称（fb_team.NAME）',
  `TOP1_TEAM_LOGO` varchar(1024) DEFAULT NULL COMMENT '<冗余>冠军球队LOGO（fb_team.LOGO）',
  `TOP2_TEAM_ID` varchar(64) DEFAULT NULL COMMENT '亚军球队ID（fb_team.ID）',
  `TOP2_TEAM_NAME` varchar(32) DEFAULT NULL COMMENT '<冗余>亚军球队名称（fb_team.NAME）',
  `TOP2_TEAM_LOGO` varchar(1024) DEFAULT NULL COMMENT '<冗余>亚军球队LOGO（fb_team.LOGO）',
  `TOP3_TEAM_ID` varchar(64) DEFAULT NULL COMMENT '季军球队ID（fb_team.ID）',
  `TOP3_TEAM_NAME` varchar(32) DEFAULT NULL COMMENT '<冗余>季军球队名称（fb_team.NAME）',
  `TOP3_TEAM_LOGO` varchar(1024) DEFAULT NULL COMMENT '<冗余>季军球队LOGO（fb_team.LOGO）',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `BALL_IN_1` tinyint(4) NOT NULL DEFAULT '0' COMMENT '冠军球队进球数',
  `BALL_IN_2` tinyint(4) NOT NULL DEFAULT '0' COMMENT '亚军球队进球数',
  `BALL_IN_3` tinyint(4) NOT NULL DEFAULT '0' COMMENT '季军球队进球数',
  `BALL_LOST_1` tinyint(4) NOT NULL DEFAULT '0' COMMENT '冠军球队失球数',
  `BALL_LOST_2` tinyint(4) NOT NULL DEFAULT '0' COMMENT '亚军球队失球数',
  `BALL_LOST_3` tinyint(4) NOT NULL DEFAULT '0' COMMENT '季军球队失球数',
  `SCORE_1` int(11) NOT NULL DEFAULT '0' COMMENT '冠军球队积分',
  `SCORE_2` int(11) NOT NULL DEFAULT '0' COMMENT '亚军球队积分',
  `SCORE_3` int(11) NOT NULL DEFAULT '0' COMMENT '季军球队积分',
  PRIMARY KEY (`BIG_GAME_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事结果';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_site 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_site` (
  `ID` varchar(64) NOT NULL COMMENT '站点ID',
  `BIG_GAME_ID` varchar(64) NOT NULL COMMENT '赛事ID',
  `NAME` varchar(10) NOT NULL COMMENT '站点名字',
  `MAX_TEAM_NUM` int(11) NOT NULL DEFAULT '0' COMMENT '可报名的球队名额',
  `HAS_TEAM_NUM` int(11) NOT NULL DEFAULT '0' COMMENT '已经报名的球队数量',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事站点';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_site_team 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_site_team` (
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID（fb_team.ID）',
  `TEAM_NAME` varchar(32) NOT NULL COMMENT '<冗余>球队名称（fb_team.NAME）',
  `TEAM_LOGO` varchar(1024) DEFAULT NULL COMMENT '<冗余>球队队徽（fb_team.LOGO）',
  `SITE_ID` varchar(64) NOT NULL COMMENT '站点ID（fb_big_game_site.ID）',
  `ORDER_NO` varchar(64) DEFAULT NULL COMMENT '<冗余>订单编号',
  `PAY_STATUS` varchar(64) NOT NULL DEFAULT '0' COMMENT '<冗余>订单支付状态（0:待支付，1：支付成功，2：支付失败，3：退款中，4：退款成功，5：退款失败）',
  PRIMARY KEY (`TEAM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事站点中报名了的队伍';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_site_team_member 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_site_team_member` (
  `ID` varchar(64) NOT NULL,
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID（fb_team.ID）',
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '成员ID（fb_player.ID）',
  `PLAYER_NAME` varchar(32) NOT NULL COMMENT '<冗余>成员名称（fb_player.NAME）',
  `PLAYER_PHOTO` varchar(1024) DEFAULT NULL COMMENT '<冗余>成员头像（fb_player.PHOTO）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='参加赛事的队伍的临时成员';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_big_game_team_like 结构
CREATE TABLE IF NOT EXISTS `fb_big_game_team_like` (
  `ID` varchar(64) NOT NULL,
  `BIG_GAME_ID` varchar(64) NOT NULL COMMENT '赛事ID',
  `TEAM_ID` varchar(64) NOT NULL COMMENT '队伍ID',
  `USER_TYPE` tinyint(4) NOT NULL COMMENT '用户类型（1：APP用户，2：游客）',
  `USER_ID` varchar(128) NOT NULL COMMENT 'APP用户（ve_user.ID）；游客，最好是jpush的注册ID、其次设备ID、其次IP地址（用什么保存的，查的时候就要用什么）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛事队伍被点赞的情况';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_information 结构
CREATE TABLE IF NOT EXISTS `fb_information` (
  `ID` varchar(64) NOT NULL,
  `TITLE` varchar(64) NOT NULL COMMENT '标题',
  `COVER_IMG` varchar(1024) DEFAULT NULL COMMENT '封面图',
  `CONTENT` mediumtext NOT NULL COMMENT '文章内容',
  `IS_SHOW` tinyint(4) NOT NULL DEFAULT '2' COMMENT '是否显示到首页（1：不显示，2：显示）',
  `BROWSE_COUNT` bigint(20) NOT NULL DEFAULT '0' COMMENT '浏览量',
  `USEFUL_COUNT` bigint(20) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `JUDGE_COUNT` bigint(20) NOT NULL DEFAULT '0' COMMENT '评论数',
  `CREATER` varchar(64) DEFAULT NULL COMMENT '创建人',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_information_judge 结构
CREATE TABLE IF NOT EXISTS `fb_information_judge` (
  `ID` varchar(64) NOT NULL,
  `USER_ID` varchar(64) NOT NULL COMMENT '用户ID（ve_user.ID）',
  `USER_ACCOUNT` varchar(64) NOT NULL COMMENT '<冗余>用户帐号（ve_user.ACCOUNT）',
  `USER_NICKNAME` varchar(64) NOT NULL COMMENT '<冗余>用户昵称（ve_user.NICKNAME）',
  `PHOTO_URL` varchar(1000) DEFAULT NULL COMMENT '<冗余>用户形象图片地址（ve_user.PHOTO_URL）',
  `INFORMATION_ID` varchar(64) NOT NULL COMMENT '资讯ID',
  `CONTENT` varchar(1000) NOT NULL COMMENT '评价内容',
  `CREATE_TIME` datetime NOT NULL COMMENT '评价时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯评价';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_information_usefull 结构
CREATE TABLE IF NOT EXISTS `fb_information_usefull` (
  `ID` varchar(64) NOT NULL,
  `INFORMATION_ID` varchar(64) NOT NULL COMMENT '资讯ID',
  `USER_TYPE` tinyint(4) NOT NULL COMMENT '用户类型（1：APP用户，2：游客）',
  `USER_ID` varchar(128) NOT NULL COMMENT 'APP用户（ve_user.ID）；游客，最好是jpush的注册ID、其次设备ID、其次IP地址（用什么保存的，查的时候就要用什么）',
  `CREATE_TIME` datetime NOT NULL COMMENT '点赞时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯点赞记录';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_match 结构
CREATE TABLE IF NOT EXISTS `fb_match` (
  `ID` varchar(64) NOT NULL COMMENT '比赛ID',
  `SITE_ID` varchar(64) DEFAULT NULL COMMENT '站点ID',
  `TYPE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球赛类型（1：未定，2：成人，3：青少年U9、4：青少年U11）',
  `STAGE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球赛阶段（1：预选赛，2：正赛，3：决赛）',
  `TYPE01` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球赛分类（1：小组赛，2：淘汰赛，3：半决赛，4：总决赛）',
  `TYPE02` varchar(10) DEFAULT NULL COMMENT '球赛分类，不确定性大，使用汉字（A组、B组、C组等，16进8，8进4等，半决赛，总决赛等）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='比赛基本信息';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_match_team 结构
CREATE TABLE IF NOT EXISTS `fb_match_team` (
  `ID` varchar(64) NOT NULL,
  `TEAM_ID_1` varchar(64) NOT NULL COMMENT '甲队ID（fb_team.ID）',
  `TEAM_NAME_1` varchar(32) NOT NULL COMMENT '<冗余>甲队名称（fb_team.NAME）',
  `TEAM_LOGO_1` varchar(1024) NOT NULL COMMENT '<冗余>甲队LOGO（fb_team.NAME）',
  `TEAM_ID_2` varchar(64) NOT NULL COMMENT '乙队ID（fb_team.LOGO）',
  `TEAM_NAME_2` varchar(32) NOT NULL COMMENT '<冗余>乙队名称（fb_team.NAME）',
  `TEAM_LOGO_2` varchar(1024) NOT NULL COMMENT '<冗余>乙队LOGO（fb_team.LOGO）',
  `BALL_IN_1` tinyint(4) NOT NULL DEFAULT '0' COMMENT '甲队进球数',
  `BALL_IN_2` tinyint(4) NOT NULL DEFAULT '0' COMMENT '乙队进球数',
  `BALL_LOST_1` tinyint(4) NOT NULL DEFAULT '0' COMMENT '甲队失球数',
  `BALL_LOST_2` tinyint(4) NOT NULL DEFAULT '0' COMMENT '乙队失球数',
  `SCORE_1` int(11) NOT NULL DEFAULT '0' COMMENT '甲队积分',
  `SCORE_2` int(11) NOT NULL DEFAULT '0' COMMENT '乙队积分',
  `WINNER_ID` varchar(64) DEFAULT NULL COMMENT '胜利球队的ID（fb_team.ID）',
  `INSPECT_STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '比赛检录状态（1：未检录，2：正在检录，3：检录通过，4：检录不通过）',
  `INSPECTOR_ID` varchar(64) DEFAULT NULL COMMENT '检查员ID（ve_user.ID）',
  `START_TIME` datetime DEFAULT NULL COMMENT '比赛开始时间',
  `END_TIME` datetime DEFAULT NULL COMMENT '比赛结束时间',
  `CREATE_TIME` datetime NOT NULL COMMENT '记录创建时间',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省名称（例如 广东省）',
  `CITY` varchar(20) DEFAULT NULL COMMENT '市名称（例如 深圳市）',
  `DISTRICT` varchar(20) DEFAULT NULL COMMENT '县/区名称（例如 南山区）',
  `ADDRESS` varchar(180) DEFAULT NULL COMMENT '地址（例如 科院北1栋1室 完整地址可以使用 省+市+区字段值+地址字段值）',
  `LON` decimal(17,13) DEFAULT NULL COMMENT '经度',
  `LAT` decimal(17,13) DEFAULT NULL COMMENT '纬度',
  `MAP_TYPE` tinyint(4) DEFAULT NULL COMMENT '地图类型（1:高德，2:百度，3:谷歌）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每场比赛详细';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_match_team_barrage 结构
CREATE TABLE IF NOT EXISTS `fb_match_team_barrage` (
  `ID` varchar(64) NOT NULL,
  `MATCH_DETAIL_ID` varchar(64) NOT NULL COMMENT '每场比赛的ID（fb_match_team.ID）',
  `CONTENT` varchar(128) NOT NULL COMMENT '弹幕内容',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `USER_TYPE` tinyint(4) NOT NULL COMMENT '用户类型（1：APP用户，2：游客）',
  `USER_ID` varchar(128) NOT NULL COMMENT 'APP用户（ve_user.ID）；游客，最好是jpush的注册ID、其次设备ID、其次IP地址（用什么保存的，查的时候就要用什么）',
  `USER_LOGO` varchar(1024) DEFAULT NULL COMMENT '<冗余>用户头像（ve_user.PHOTO_URL）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每场比赛的弹幕';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_match_team_player 结构
CREATE TABLE IF NOT EXISTS `fb_match_team_player` (
  `ID` varchar(64) NOT NULL,
  `DETAIL_ID` varchar(64) NOT NULL COMMENT '每场比赛详情的ID（fb_match_team.ID）',
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID（fb_team.ID）',
  `TEAM_NAME` varchar(32) NOT NULL COMMENT '<冗余>球队名字（fb_team.NAME）',
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '成员ID（fb_player.ID）',
  `PLAYER_NAME` varchar(32) NOT NULL COMMENT '<冗余>成员名称（fb_player.NAME）',
  `CLOTH_NO` tinyint(4) NOT NULL DEFAULT '1' COMMENT '<冗余>球服号码（fb_player.CLOTH_NO）',
  `FIRST_POSITION` varchar(10) DEFAULT NULL COMMENT '成员在球队中首发位置（门将等）',
  `BALL_SHOT` tinyint(4) NOT NULL DEFAULT '0' COMMENT '射门数',
  `BALL_IN` tinyint(4) NOT NULL DEFAULT '0' COMMENT '射门进球数',
  `BALL_LOST` tinyint(4) NOT NULL DEFAULT '0' COMMENT '失球数',
  `ASSISTS` tinyint(4) NOT NULL DEFAULT '0' COMMENT '助攻数',
  `PENALTY` tinyint(4) NOT NULL DEFAULT '0' COMMENT '点球数',
  `PENALTY_IN` tinyint(4) NOT NULL DEFAULT '0' COMMENT '点球进球数',
  `SCORE` int(11) NOT NULL DEFAULT '0' COMMENT '积分',
  `RED` tinyint(4) NOT NULL DEFAULT '0' COMMENT '红牌数',
  `YELLOW` tinyint(4) NOT NULL DEFAULT '0' COMMENT '黄牌数',
  `INSPECT_STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '比赛检录状态（1：未检录，3：检录通过，4：检录不通过）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每场比赛中每个人员的情况';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_match_team_record 结构
CREATE TABLE IF NOT EXISTS `fb_match_team_record` (
  `ID` varchar(64) NOT NULL,
  `DETAIL_ID` varchar(64) NOT NULL COMMENT '每场比赛详情的ID（fb_match_team.ID）',
  `TEAM_ID` varchar(64) DEFAULT NULL COMMENT '球队ID（fb_team.ID）',
  `TEAM_NAME` varchar(32) DEFAULT NULL COMMENT '<冗余>球队名称（fb_team.NAME）',
  `PLAYER_ID` varchar(64) DEFAULT NULL COMMENT '球员ID（fb_player.ID）',
  `PLAYER_NAME` varchar(32) DEFAULT NULL COMMENT '<冗余>球员名称（fb_player.NAME）',
  `CLOTH_NO` tinyint(4) DEFAULT '0' COMMENT '<冗余>球员号码（fb_player.CLOTH_NO）',
  `ACTION` tinyint(4) DEFAULT '0' COMMENT '动作（0：无，1：换下，2：换上，3：进球，4：犯规，5：助攻，6：黄牌，7：红牌）',
  `MATCH_OPT` tinyint(4) NOT NULL DEFAULT '0' COMMENT '比赛的操作（0：无，1：暂停，2：上半场结束，3：下半场结束，4：加时赛，5：比赛结束）',
  `CONTENT` varchar(64) NOT NULL COMMENT '消息内容',
  `CREATER` varchar(64) NOT NULL COMMENT '创建人ID（ve_user.ID）',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建消息时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='检录员直播记录';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_player 结构
CREATE TABLE IF NOT EXISTS `fb_player` (
  `ID` varchar(64) NOT NULL,
  `USER_ID` varchar(64) DEFAULT NULL COMMENT '用户ID（ve_user.ID）',
  `NAME` varchar(10) NOT NULL COMMENT '实名认证的姓名',
  `TYPE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球员类型（1：未定，2：成人，3：青少年U9、4：青少年U11）',
  `AUTH` tinyint(4) NOT NULL DEFAULT '1' COMMENT '信息认证状态（1：未提交申请认证，2：认证中，3：认证不通过，4：认证通过）',
  `PHONE` varchar(20) DEFAULT NULL COMMENT '手机号',
  `LEVEL` tinyint(4) NOT NULL DEFAULT '1' COMMENT '个人水平（1：低，2：中，3：高）',
  `POSITION` varchar(10) NOT NULL COMMENT '球场上擅长的位置中文词语（门将等）',
  `CLOTH_NO` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球服号码',
  `CLOTH_SIZE` varchar(10) NOT NULL DEFAULT 'S' COMMENT '服装尺码（S、M、L、XL...）',
  `PHOTO` varchar(1024) DEFAULT NULL COMMENT '个人照片',
  `ID_CARD` varchar(32) DEFAULT NULL COMMENT '身份证号',
  `CARD_IMG1` varchar(1024) DEFAULT NULL COMMENT '身份证正面图片',
  `CARD_IMG2` varchar(1024) DEFAULT NULL COMMENT '身份证反面图片',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省名称（例如 广东省）',
  `CITY` varchar(20) DEFAULT NULL COMMENT '市名称（例如 深圳市）',
  `DISTRICT` varchar(20) DEFAULT NULL COMMENT '县/区名称（例如 南山区）',
  `ADDRESS` varchar(180) DEFAULT NULL COMMENT '地址（例如 科院北1栋1室 完整地址可以使用 省+市+区字段值+地址字段值）',
  `LON` decimal(17,13) DEFAULT NULL COMMENT '经度',
  `LAT` decimal(17,13) DEFAULT NULL COMMENT '纬度',
  `MAP_TYPE` tinyint(4) DEFAULT NULL COMMENT '地图类型（1:高德，2:百度，3:谷歌）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='足球运动员信息';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_player_auth_history 结构
CREATE TABLE IF NOT EXISTS `fb_player_auth_history` (
  `ID` varchar(64) NOT NULL,
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '被审核运动员的ID（ga_player.ID）',
  `STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '审核状态（1：不通过，2：通过）',
  `REMARK` varchar(600) DEFAULT NULL COMMENT '审核意见',
  `AUDITOR_ID` varchar(64) NOT NULL COMMENT '审核员ID',
  `AUDITOR_NAME` varchar(20) NOT NULL COMMENT '审核员名称',
  `CREATE_TIME` datetime NOT NULL COMMENT '审核记录创建时间',
  `MODIFY_TIME` datetime NOT NULL COMMENT '审核记录修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='足球运动员实名审核记录';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_player_guardian 结构
CREATE TABLE IF NOT EXISTS `fb_player_guardian` (
  `ID` varchar(64) NOT NULL,
  `NAME` varchar(10) NOT NULL COMMENT '监护人姓名',
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '被监护的运动员ID（ga_player.ID）',
  `PHOTO` varchar(1024) DEFAULT NULL COMMENT '监护人照片',
  `ID_CARD` varchar(32) DEFAULT NULL COMMENT '监护人身份证号',
  `CARD_IMG1` varchar(1024) DEFAULT NULL COMMENT '监护人身份证正面图片',
  `CARD_IMG2` varchar(1024) DEFAULT NULL COMMENT '监护人身份证反面图片',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='足球运动员的监护人（青少年的）';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_team 结构
CREATE TABLE IF NOT EXISTS `fb_team` (
  `ID` varchar(64) NOT NULL,
  `NAME` varchar(20) NOT NULL COMMENT '球队名称',
  `TYPE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球队类型（1：未定，2：成人，3：青少年U9、4：青少年U11）',
  `LEVEL` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球队水平（1：低，2：中，3：高）',
  `LOGO` varchar(1024) DEFAULT NULL COMMENT '球队队徽',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省名称（例如 广东省）',
  `CITY` varchar(20) DEFAULT NULL COMMENT '市名称（例如 深圳市）',
  `DISTRICT` varchar(20) DEFAULT NULL COMMENT '县/区名称（例如 南山区）',
  `ADDRESS` varchar(180) DEFAULT NULL COMMENT '地址（例如 科院北1栋1室 完整地址可以使用 省+市+区字段值+地址字段值）',
  `LON` decimal(17,13) NOT NULL COMMENT '经度',
  `LAT` decimal(17,13) NOT NULL COMMENT '纬度',
  `MAP_TYPE` tinyint(4) DEFAULT NULL COMMENT '地图类型（1:高德，2:百度，3:谷歌）',
  `CREATER` varchar(64) NOT NULL COMMENT '创建人ID（fb_player.ID）',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  `MODIFY_TIME` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='足球队（常态）';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_team_join_history 结构
CREATE TABLE IF NOT EXISTS `fb_team_join_history` (
  `ID` varchar(64) NOT NULL,
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '申请人ID（fb_player.ID）',
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID',
  `CONTENT` varchar(50) DEFAULT NULL COMMENT '申请人填写的备注消息',
  `STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '申请状态（1：申请中、2：拒绝、3：通过）',
  `CREATE_TIME` datetime NOT NULL COMMENT '申请发起时间',
  `MODIFY_TIME` datetime NOT NULL COMMENT '申请处理时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='入队申请';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_team_member 结构
CREATE TABLE IF NOT EXISTS `fb_team_member` (
  `ID` varchar(64) NOT NULL,
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID',
  `PLAYER_ID` varchar(64) NOT NULL COMMENT '成员ID（fb_player.ID）',
  `PLAYER_NAME` varchar(32) NOT NULL COMMENT '<冗余>成员名字（fb_player.NAME）',
  `PHOTO` varchar(1024) DEFAULT NULL COMMENT '<冗余>成员个人照片（fb_player.PHOTO）',
  `POSITION` varchar(10) NOT NULL COMMENT '<冗余>球场上擅长的位置中文词语（门将等）（fb_player.POSITION）',
  `PHONE` varchar(20) DEFAULT NULL COMMENT '<冗余>球员手机号（fb_player.PHONE）',
  `ROLE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '成员角色（1：普通成员、2：队长、3：教练）',
  `FIRST_POSITION` varchar(10) DEFAULT NULL COMMENT '成员在球队中首发位置（门将等）',
  `CLOTH_NO` tinyint(4) NOT NULL DEFAULT '1' COMMENT '球服号码',
  `CLOTH_SIZE` varchar(10) NOT NULL DEFAULT 'S' COMMENT '服装尺码（S、M、L、XL...）',
  `CREATE_TIME` datetime NOT NULL COMMENT '成员加入球队时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='球队成员';

-- 数据导出被取消选择。
-- 导出  表 db_football.fb_team_standard 结构
CREATE TABLE IF NOT EXISTS `fb_team_standard` (
  `ID` varchar(64) NOT NULL,
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID',
  `STANDARD` int(11) NOT NULL COMMENT '赛制(5、6、7、8...)',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='球队常踢赛制';

-- 数据导出被取消选择。

-- 导出 db_venue 的数据库结构
CREATE DATABASE IF NOT EXISTS `db_venue` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_venue`;

-- 导出  表 db_venue.ve_match 结构
CREATE TABLE IF NOT EXISTS `ve_match` (
  `ID` varchar(64) NOT NULL,
  `SPORT` tinyint(4) NOT NULL DEFAULT '10' COMMENT '运动类型（10：足球）',
  `TEAM_ID` varchar(64) NOT NULL COMMENT '发起人的球队ID',
  `NAME` varchar(64) NOT NULL COMMENT '赛一赛名称',
  `TYPE` tinyint(4) NOT NULL DEFAULT '1' COMMENT '类型（1：赛一赛）',
  `MATCH_DATE` datetime DEFAULT NULL COMMENT '日期',
  `MATCH_START` datetime DEFAULT NULL COMMENT '开始时间',
  `MATCH_END` datetime DEFAULT NULL COMMENT '结束时间',
  `AREA_TIMES_TYPE` tinyint(4) NOT NULL COMMENT '场次类型（1：自行约定，2：已有场地）',
  `ORDER_NO` varchar(64) DEFAULT NULL COMMENT '场地原订单',
  `MATCH_ORDER_NO` varchar(64) DEFAULT NULL COMMENT '赛一赛生成订单号',
  `VENUE_ID` varchar(64) DEFAULT NULL COMMENT '所在场馆ID',
  `VENUE_NAME` varchar(64) DEFAULT NULL COMMENT '所在场馆名称',
  `AREA_ID` varchar(64) DEFAULT NULL COMMENT '所在场地ID',
  `AREA_NAME` varchar(32) DEFAULT NULL COMMENT '所在场地名称',
  `STANDARD` int(11) NOT NULL COMMENT '赛制(5、6、7、8...)',
  `COST_TYPE` tinyint(4) NOT NULL COMMENT '费用类型（1：我请客，2：AA制）',
  `COST` float(9,2) DEFAULT '0.00' COMMENT '费用（AA制时默认使用）',
  `PAY_TYPE` tinyint(4) DEFAULT NULL COMMENT '支付方式（1：在线支付，2：到场付费）',
  `LEVEL` tinyint(4) NOT NULL COMMENT '球队水平（1：低，2：中，3：高）',
  `HAS_REFEREE` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否提供裁判（0：不提供，1：提供）',
  `WATER` tinyint(4) NOT NULL DEFAULT '0' COMMENT '提供水（0：无，1：桶装水，2：矿泉水，3：饮料）',
  `CLOTH_COLOR` tinyint(4) NOT NULL COMMENT '球衣颜色（1：红色，2：蓝色，3：白色，4： 黄色，5：紫色，6：绿色，7： 其他）',
  `EXPIRE_TIME` datetime NOT NULL COMMENT '报名截止日期',
  `CIRCLES_ID` varchar(64) NOT NULL COMMENT '商圈ID',
  `CIRCLES_NAME` varchar(50) NOT NULL COMMENT '商圈名称',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省名称（例如 广东省）',
  `CITY` varchar(20) DEFAULT NULL COMMENT '市名称（例如 深圳市）',
  `DISTRICT` varchar(20) DEFAULT NULL COMMENT '县/区名称（例如 南山区）',
  `ADDRESS` varchar(180) DEFAULT NULL COMMENT '地址（例如 科院北1栋1室 完整地址可以使用 省+市+区字段值+地址字段值）',
  `LON` decimal(17,13) DEFAULT NULL COMMENT '经度',
  `LAT` decimal(17,13) DEFAULT NULL COMMENT '纬度',
  `MAP_TYPE` tinyint(4) DEFAULT NULL COMMENT '地图类型（1:高德，2:百度，3:谷歌）',
  `INTRO` varchar(500) NOT NULL COMMENT '活动简介',
  `STATUS` tinyint(4) NOT NULL COMMENT '赛一赛状态（0：取消，1：正常，2：冻结，3：延迟发布中）',
  `LOGO` varchar(1024) DEFAULT NULL COMMENT '活动海报路径',
  `SETTLEMENT` tinyint(4) DEFAULT '0' COMMENT '是否结算（0：未结算，1：已结算）',
  `CREATER` varchar(64) NOT NULL COMMENT '发起人ID（ve_user.ID）',
  `CREATE_TIME` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛一赛';

-- 数据导出被取消选择。
-- 导出  表 db_venue.ve_match_invite 结构
CREATE TABLE IF NOT EXISTS `ve_match_invite` (
  `ID` varchar(64) NOT NULL,
  `USER1_ID` varchar(64) NOT NULL COMMENT '邀请人的ID（ve_user.ID）',
  `TEAM1_ID` varchar(64) NOT NULL COMMENT '<冗余>邀请球队的ID',
  `USER2_ID` varchar(64) NOT NULL COMMENT '<冗余>被邀请人的ID（ve_user.ID）',
  `TEAM2_ID` varchar(64) NOT NULL COMMENT '被邀请球队的ID',
  `STATUS` tinyint(4) NOT NULL DEFAULT '1' COMMENT '请求的状态（1：未查看，2：已查看，3：同意，4：拒绝）',
  `CREATE_TIME` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='发起赛一赛的人对其他人进行邀请';

-- 数据导出被取消选择。
-- 导出  表 db_venue.ve_match_team 结构
CREATE TABLE IF NOT EXISTS `ve_match_team` (
  `ID` varchar(64) NOT NULL,
  `MATCH_ID` varchar(64) NOT NULL COMMENT '赛一赛ID',
  `TEAM_ID` varchar(64) NOT NULL COMMENT '球队ID',
  `TEAM_NAME` varchar(32) NOT NULL COMMENT '<冗余>球队名称',
  `TEAM_LOGO` varchar(1024) NOT NULL COMMENT '<冗余>球队LOGO',
  `CLOTH_COLOR` tinyint(4) NOT NULL COMMENT '球衣颜色（1：红色，2：蓝色，3：白色，4： 黄色，5：紫色，6：绿色，7： 其他）',
  `ROLE` tinyint(4) NOT NULL DEFAULT '2' COMMENT '1：发起者，2：普通成员',
  `COST` float(9,2) DEFAULT '0.00' COMMENT '报名费用',
  `ORDER_NO` varchar(64) DEFAULT NULL COMMENT '报名生成订单号',
  `PAY_STATUS` tinyint(4) DEFAULT '0' COMMENT '支付状态（0：未支付，1：已支付，2：已退款）',
  `PAY_TIME` datetime DEFAULT NULL COMMENT '报名订单支付时间',
  `CREATE_TIME` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='赛一赛参与的球队信息';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
