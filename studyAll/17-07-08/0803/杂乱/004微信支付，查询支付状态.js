
要知道，'app调用支付后'，'微信'会'发送一个异步通知给后台'，同时'后台需要调用查询微信后台'
这笔订单的'支付结果以及金额'，这'是一个并行操作'，需要注意的是'微信后台收到的金额'和
'订单金额需要进行比对'，为了防止钓鱼，所以这个'查询是有必要的'，必须匹配：'收到的到账金额 >= 订单金额'
（我有一哥们他们的app是没有这步操作的，支付了不论是否成功订单直接往下走，这样是不对滴...）

好吧，来看一下代码，'异步通知地址'需要'自己配置好'，在生成预付单的时候就得传过去

// TODO 通知回调地址
    @Value("${WXPAY_NOTIFYURL}")
    private String notifyUrl;
这个地址就是自己的webservice，也就是你的某个rest-controller



    @RequestMapping("/notice")
    public void notice(HttpServletRequest request, HttpServletResponse response) throws IOException {
        InputStream inStream = request.getInputStream();
        ByteArrayOutputStream outSteam = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outSteam.write(buffer, 0, len);
        }
        outSteam.close();
        inStream.close();
        String result = new String(outSteam.toByteArray(), "utf-8");
        Map<String, String> map = null;
        try {
            map = XMLUtil.doXMLParse(result);
        } catch (JDOMException e) {
            e.printStackTrace();
        }

        // 此处调用订单查询接口验证是否交易成功
        WXOrderQuery wxpayResult = reqOrderQueryResult(map);
        boolean isSucc = wxpayResult.isSuccess();
        
        // 支付成功，商户处理后同步返回给微信参数
        PrintWriter writer = response.getWriter();
        if (!isSucc) {
            // 支付失败， 记录流水失败
            System.out.println("===============支付失败==============");
        } else {
            orderService.doWXPayNotice(wxpayResult);
            System.out.println("===============付款成功，业务处理完毕==============");
            
            // 通知微信已经收到消息，不要再给我发消息了，否则微信会8连击调用本接口
            String noticeStr = setXML("SUCCESS", "");
            writer.write(noticeStr);
            writer.flush();
        }
        
        String noticeStr = setXML("FAIL", "");
        writer.write(noticeStr);
        writer.flush();
    }

    public static String setXML(String return_code, String return_msg) {
        return "<xml><return_code><![CDATA[" + return_code + "]]></return_code><return_msg><![CDATA[" + return_msg + "]]></return_msg></xml>";
    }


/**
     * 目前用的这个接口
     * @Description: 查询通知的结果bean
     * @param map
     * @return
     * 
     * @author leechenxiang
     * @date 2016年12月8日 上午11:04:52
     */
    public WXOrderQuery reqOrderQueryResult(Map<String, String> map) {
        WXOrderQuery orderQuery = new WXOrderQuery();
        orderQuery.setAppid(map.get("appid"));
        orderQuery.setMch_id(map.get("mch_id"));
        orderQuery.setTransaction_id(map.get("transaction_id"));
        orderQuery.setOut_trade_no(map.get("out_trade_no"));
        orderQuery.setNonce_str(map.get("nonce_str"));
        String payFlowId = map.get("attach");
        orderQuery.setAttach(payFlowId);
        
        //此处需要密钥PartnerKey，此处直接写死，自己的业务需要从持久化中获取此密钥，否则会报签名错误
        orderQuery.setPartnerKey(WXPayContants.partnerKey);
        
        Map<String, String> orderMap = orderQuery.reqOrderquery();
        //此处添加支付成功后，支付金额和实际订单金额是否等价，防止钓鱼
        if (orderMap.get("return_code") != null && orderMap.get("return_code").equalsIgnoreCase("SUCCESS")) {
            if (orderMap.get("trade_state") != null && orderMap.get("trade_state").equalsIgnoreCase("SUCCESS")) {
                // 查询订单（交易流水的实际金额），判断微信收到的钱和订单中的钱是否等额
                SpPayFlowCargoSource payFlow = spPayFlowCargoSourceService.getPayFlowById(payFlowId);
                String total_fee = map.get("total_fee");
                orderQuery.setPayFlow(payFlow);
                Integer db_fee = payFlow.getFee().multiply(new BigDecimal(100)).intValue();
                if (Integer.parseInt(total_fee) == db_fee) {
                    orderQuery.setSuccess(true);
                    return orderQuery;
                }
            }
        }
        orderQuery.setSuccess(false);
        return orderQuery;
    }

'到这一步'，就能'判断金额到底对不对'，对了那么久成功支付，订单进行下一步流程~

再次强调，一定要防止钓鱼，另外异步调用的时候'需要去查看你的订单'或者'交易流水是否已经成功了'，成功就没有必要继续走，
直接return就行，因为微信会多次异步通知，主要还是看你的接口怎么设计了

 （附：微信异步通知频率为15/15/30/180/1800/1800/1800/1800/3600，单位：秒）