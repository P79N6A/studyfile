	/**
	 * JSON对象转JavaBean
	 * @param obj
	 * @param json
	 * @return
	 */
	public <T> T josnToBean(Object obj, String json) {
		if (null != json && json.length() > 1) {
			Object bean = (Object) JacksonHelper.fromJSON(json, obj.getClass());
			return (T) bean;
		}
		return null;
	}

	/**
	 * json对象转List集合
	 * @param customersPersonBaseInfoForm
	 * @return
	 * @throws EccInfoException
	 */
	private EccCustPersonRelationMsg jsonToList(
			CustomersPersonBaseInfoForm customersPersonBaseInfoForm)
			throws EccInfoException {
		EccCustPersonRelationMsg eccCustPersonRelationMsg = new EccCustPersonRelationMsg();
		try {
			// 与对手的关系
			EccCustPersonRelationMsg adversaryRelation = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getAdversaryRelationJson());
			/* 近一年到访公司记录 */
			EccCustPersonRelationMsg visitRecord = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getVisitRecordJson());
			/* 近一年与我司高管会见记录 */
			EccCustPersonRelationMsg mettingRecord = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getMettingRecordJson());
			/* 我司上一任客户经理 */
			EccCustPersonRelationMsg customerManager = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getCustomerManagerJson());
			/* 社会关系 */
			EccCustPersonRelationMsg socialRelationsJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getSocialRelationsJson());
			/* 政党 */
			EccCustPersonRelationMsg partyJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getPartyJson());
			/* 社会组织 */
			EccCustPersonRelationMsg socialOrganizationJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getSocialOrganizationJson());
			/* 社交网络 */
			EccCustPersonRelationMsg socialNetworksJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getSocialNetworksJson());
			/* 工作经历 */
			EccCustPersonRelationMsg workInfoJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getWorkInfoJson());
			/* 个人忌讳 */
			EccCustPersonRelationMsg tabooJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getTabooJson());
			/* 个人爱好 */
			EccCustPersonRelationMsg hobbiesJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getHobbiesJson());
			/* 饮食习惯 */
			EccCustPersonRelationMsg eatingHabitsJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getEatingHabitsJson());
			/* 其它家庭相关信息 */
			EccCustPersonRelationMsg failmyOrtherInfoJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getFailmyOrtherInfoJson());
			/* 家庭成员 */
			EccCustPersonRelationMsg failmyInfoJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getFailmyInfoJson());
			/* 教育背景 */
			EccCustPersonRelationMsg eduBackgroundJson = josnToBean(
					eccCustPersonRelationMsg,
					customersPersonBaseInfoForm.getEduBackgroundJson());
			// 联系人信息新增
			eccCustPersonRelationMsg
					.setAdversaryRelationJson(adversaryRelation == null ? null
							: adversaryRelation.getAdversaryRelationJson());
			eccCustPersonRelationMsg
					.setVisitRecordJson(visitRecord == null ? null
							: visitRecord.getVisitRecordJson());
			eccCustPersonRelationMsg
					.setMettingRecordJson(mettingRecord == null ? null
							: mettingRecord.getMettingRecordJson());
			eccCustPersonRelationMsg
					.setCustomerManagerJson(customerManager == null ? null
							: customerManager.getCustomerManagerJson());
			eccCustPersonRelationMsg
					.setSocialRelationsJson(socialRelationsJson == null ? null
							: socialRelationsJson.getSocialRelationsJson());
			eccCustPersonRelationMsg.setPartyJson(partyJson == null ? null
					: partyJson.getPartyJson());
			eccCustPersonRelationMsg
					.setSocialOrganizationJson(socialOrganizationJson == null ? null
							: socialOrganizationJson
									.getSocialOrganizationJson());
			eccCustPersonRelationMsg
					.setSocialNetworksJson(socialNetworksJson == null ? null
							: socialNetworksJson.getSocialNetworksJson());
			eccCustPersonRelationMsg
					.setWorkInfoJson(workInfoJson == null ? null : workInfoJson
							.getWorkInfoJson());
			eccCustPersonRelationMsg.setTabooJson(workInfoJson == null ? null
					: tabooJson.getTabooJson());
			eccCustPersonRelationMsg.setHobbiesJson(hobbiesJson == null ? null
					: hobbiesJson.getHobbiesJson());
			eccCustPersonRelationMsg
					.setEatingHabitsJson(eatingHabitsJson == null ? null
							: eatingHabitsJson.getEatingHabitsJson());
			eccCustPersonRelationMsg
					.setFailmyOrtherInfoJson(failmyOrtherInfoJson == null ? null
							: failmyOrtherInfoJson.getFailmyOrtherInfoJson());
			eccCustPersonRelationMsg
					.setFailmyInfoJson(failmyInfoJson == null ? null
							: failmyInfoJson.getFailmyInfoJson());
			eccCustPersonRelationMsg
					.setEduBackgroundJson(eduBackgroundJson == null ? null
							: eduBackgroundJson.getEduBackgroundJson());
		} catch (Exception e) {

			PmInfoException.throwPmInfoException(
					EccExceptionComm.ERROR_LAYER_ACTION, getClass().getName(),
					e);
		}
		return eccCustPersonRelationMsg;
	}