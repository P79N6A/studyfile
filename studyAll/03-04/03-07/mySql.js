DROP TABLE IF EXISTS `t_areainfo`;
CREATE TABLE `t_areainfo` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '����ʱ��',	
  `level` int(11) DEFAULT NULL COMMENT '���� 0:�߼� 1:���� 2:�����ܼ� 3:�����ܼ� 4:�����ܼ� 5:Ʒ���ܼ� 6:��ϯ',
  `name` varchar(255) DEFAULT NULL COMMENT '�Ƽ����˺�',
  `parentId` int(11) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--��ʼ������
INSERT INTO `t_areainfo` VALUES ('1', '0', '�й�', '0', '0');
INSERT INTO `t_areainfo` VALUES ('2', '0', '������', '1', '0');
INSERT INTO `t_areainfo` VALUES ('3', '0', '������', '1', '0');
INSERT INTO `t_areainfo` VALUES ('4', '0', '����', '2', '0');
INSERT INTO `t_areainfo` VALUES ('5', '0', '������', '4', '0');
INSERT INTO `t_areainfo` VALUES ('6', '0', '��̨��', '4', '0');
INSERT INTO `t_areainfo` VALUES ('7', '0', '������', '4', '0');
INSERT INTO `t_areainfo` VALUES ('8', '0', '����XX��1', '4', '0');
INSERT INTO `t_areainfo` VALUES ('9', '0', '����XX��2', '4', '0');
INSERT INTO `t_areainfo` VALUES ('10', '0', '����XX��3', '4', '0');
INSERT INTO `t_areainfo` VALUES ('11', '0', '����XX��4', '4', '0');
INSERT INTO `t_areainfo` VALUES ('12', '0', '����XX��5', '4', '0');
INSERT INTO `t_areainfo` VALUES ('13', '0', '����XX��6', '4', '0');
INSERT INTO `t_areainfo` VALUES ('14', '0', '����XX��7', '4', '0');
INSERT INTO `t_areainfo` VALUES ('15', '0', '����XX��8', '4', '0');
INSERT INTO `t_areainfo` VALUES ('16', '0', '����XX��9', '4', '0');
INSERT INTO `t_areainfo` VALUES ('17', '0', '����XX��10', '4', '0');
INSERT INTO `t_areainfo` VALUES ('18', '0', '����XX��11', '4', '0');
INSERT INTO `t_areainfo` VALUES ('19', '0', '����XX��12', '4', '0');
INSERT INTO `t_areainfo` VALUES ('20', '0', '����XX��13', '4', '0');
INSERT INTO `t_areainfo` VALUES ('21', '0', '����XX��14', '4', '0');
INSERT INTO `t_areainfo` VALUES ('22', '0', '����XX��15', '4', '0');
INSERT INTO `t_areainfo` VALUES ('23', '0', '����XX��16', '4', '0');
INSERT INTO `t_areainfo` VALUES ('24', '0', '����XX��17', '4', '0');
INSERT INTO `t_areainfo` VALUES ('25', '0', '����XX��18', '4', '0');
INSERT INTO `t_areainfo` VALUES ('26', '0', '����XX��19', '4', '0');
INSERT INTO `t_areainfo` VALUES ('27', '0', '����XX��1', '4', '0');
INSERT INTO `t_areainfo` VALUES ('28', '0', '����XX��2', '4', '0');
INSERT INTO `t_areainfo` VALUES ('29', '0', '����XX��3', '4', '0');
INSERT INTO `t_areainfo` VALUES ('30', '0', '����XX��4', '4', '0');
INSERT INTO `t_areainfo` VALUES ('31', '0', '����XX��5', '4', '0');
INSERT INTO `t_areainfo` VALUES ('32', '0', '����XX��6', '4', '0');
INSERT INTO `t_areainfo` VALUES ('33', '0', '����XX��7', '4', '0');
INSERT INTO `t_areainfo` VALUES ('34', '0', '����XX��8', '4', '0');
INSERT INTO `t_areainfo` VALUES ('35', '0', '����XX��9', '4', '0');
INSERT INTO `t_areainfo` VALUES ('36', '0', '����XX��10', '4', '0');
INSERT INTO `t_areainfo` VALUES ('37', '0', '����XX��11', '4', '0');
INSERT INTO `t_areainfo` VALUES ('38', '0', '����XX��12', '4', '0');
INSERT INTO `t_areainfo` VALUES ('39', '0', '����XX��13', '4', '0');
INSERT INTO `t_areainfo` VALUES ('40', '0', '����XX��14', '4', '0');
INSERT INTO `t_areainfo` VALUES ('41', '0', '����XX��15', '4', '0');
INSERT INTO `t_areainfo` VALUES ('42', '0', '����XX��16', '4', '0');
INSERT INTO `t_areainfo` VALUES ('43', '0', '����XX��17', '4', '0');
INSERT INTO `t_areainfo` VALUES ('44', '0', '����XX��18', '4', '0');
INSERT INTO `t_areainfo` VALUES ('45', '0', '����XX��19', '4', '0');
INSERT INTO `t_areainfo` VALUES ('46', '0', 'xxʡ1', '1', '0');
INSERT INTO `t_areainfo` VALUES ('47', '0', 'xxʡ2', '1', '0');
INSERT INTO `t_areainfo` VALUES ('48', '0', 'xxʡ3', '1', '0');
INSERT INTO `t_areainfo` VALUES ('49', '0', 'xxʡ4', '1', '0');
INSERT INTO `t_areainfo` VALUES ('50', '0', 'xxʡ5', '1', '0');
INSERT INTO `t_areainfo` VALUES ('51', '0', 'xxʡ6', '1', '0');
INSERT INTO `t_areainfo` VALUES ('52', '0', 'xxʡ7', '1', '0');
INSERT INTO `t_areainfo` VALUES ('53', '0', 'xxʡ8', '1', '0');
INSERT INTO `t_areainfo` VALUES ('54', '0', 'xxʡ9', '1', '0');
INSERT INTO `t_areainfo` VALUES ('55', '0', 'xxʡ10', '1', '0');
INSERT INTO `t_areainfo` VALUES ('56', '0', 'xxʡ11', '1', '0');
INSERT INTO `t_areainfo` VALUES ('57', '0', 'xxʡ12', '1', '0');
INSERT INTO `t_areainfo` VALUES ('58', '0', 'xxʡ13', '1', '0');
INSERT INTO `t_areainfo` VALUES ('59', '0', 'xxʡ14', '1', '0');
INSERT INTO `t_areainfo` VALUES ('60', '0', 'xxʡ15', '1', '0');
INSERT INTO `t_areainfo` VALUES ('61', '0', 'xxʡ16', '1', '0');
INSERT INTO `t_areainfo` VALUES ('62', '0', 'xxʡ17', '1', '0');
INSERT INTO `t_areainfo` VALUES ('63', '0', 'xxʡ18', '1', '0');
INSERT INTO `t_areainfo` VALUES ('64', '0', 'xxʡ19', '1', '0');


/**��ѯ����areaId�������������ӽڵ�*/
DROP FUNCTION IF EXISTS queryChildrenAreaInfo;
CREATE FUNCTION `queryChildrenAreaInfo` (areaId INT)
RETURNS VARCHAR(4000)
BEGIN
DECLARE sTemp VARCHAR(4000);
DECLARE sTempChd VARCHAR(4000);
SET sTemp = '$';
SET sTempChd = cast(areaId as char);
WHILE sTempChd is not NULL DO
SET sTemp = CONCAT(sTemp,',',sTempChd);
SELECT group_concat(id) INTO sTempChd FROM t_areainfo where FIND_IN_SET(parentId,sTempChd)>0;
END WHILE;
return sTemp;
END;

�������4

/**��ѯ�������ӳ���*/
SELECT a.id,a.name,a.parentId,a.level FROM t_areainfo a,t_areainfo b where a.parentid=b.id and b.id='2';