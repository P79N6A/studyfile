package com.xgd.risk.web.utils;


import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;  

/** 
 * 描        述：Excel文件操作工具类
 *  @author chenqiguo
 */
public class ReadExcelUtil {  
    

  /** 
   * 默认的开始读取的行位置为第一行（索引值为0） 
   */  
  private final static int READ_START_POS = 0;  
    
  /** 
   * 默认结束读取的行位置为最后一行（索引值=0，用负数来表示倒数第n行） 
   */  
  private final static int READ_END_POS = 0;  
  
    
  /** 
   * 默认只操作一个sheet 
   */  
  private final static boolean ONLY_ONE_SHEET = true;  
    
  /** 
   * 默认读取第一个sheet中（只有当ONLY_ONE_SHEET = true时有效） 
   */  
  private final static int SELECTED_SHEET = 0;  
    
  /** 
   * 默认从第一个sheet开始读取（索引值为0） 
   */  
  private final static int READ_START_SHEET= 0;  
    
  /** 
   * 默认在最后一个sheet结束读取（索引值=0，用负数来表示倒数第n行） 
   */  
  private final static int READ_END_SHEET = 0;  
    
  /** 
   * 默认打印各种信息 
   */  
  private final static boolean PRINT_MSG = true;  
    

  /** 
   * Excel文件路径 
   */  
  private String excelPath = "data.xlsx";  

  /** 
   * 设定开始读取的位置，默认为0 
   */  
  private int startReadPos = READ_START_POS;  

  /** 
   * 设定结束读取的位置，默认为0，用负数来表示倒数第n行 
   */  
  private int endReadPos = READ_END_POS;  
    
 
    
  /** 
   * 设定是否只操作第一个sheet 
   */  
  private boolean onlyReadOneSheet = ONLY_ONE_SHEET;  
    
  /** 
   * 设定操作的sheet在索引值 
   */  
  private int selectedSheetIdx =SELECTED_SHEET;  
    
  /** 
   * 设定操作的sheet的名称 
   */  
  private String selectedSheetName = "";  
    
  /** 
   * 设定开始读取的sheet，默认为0 
   */  
  private int startSheetIdx = READ_START_SHEET;  

  /** 
   * 设定结束读取的sheet，默认为0，用负数来表示倒数第n行     
   */  
  private int endSheetIdx = READ_END_SHEET;  
    
  /** 
   * 设定是否打印消息 
   */  
  private boolean printMsg = PRINT_MSG;  
    
    
  
    
  private ReadExcelUtil(){}  
  
  private static ReadExcelUtil excelUtil=new ReadExcelUtil();
  
  public static ReadExcelUtil getInstance(){
	  return excelUtil;
  }


  /** 
   * 自动根据文件扩展名，调用对应的读取方法 
   *  
   * @Title: writeExcel 
   * @Date : 2016-7-27 下午01:50:38 
   * @param file 
   * @throws IOException 
   */  
  public List<Row> readExcel(InputStream in,String fileName) throws IOException{  
      String ext = fileName.substring(fileName.lastIndexOf(".")+1);  
      try {  
            
          if("xls".equals(ext)){               
              return readExcel_xls(in);  
          }else if("xlsx".equals(ext)){       
              return readExcel_xlsx(in);  
          }else{                                  
              out("您要操作的文件没有扩展名，正在尝试以xls方式读取...");  
              try{  
                  return readExcel_xls(in);  
              } catch (IOException e1) {  
                  out("尝试以xls方式读取，结果失败！，正在尝试以xlsx方式读取...");  
                  try{  
                      return readExcel_xlsx(in);  
                  } catch (IOException e2) {  
                      out("尝试以xls方式读取，结果失败！\n请您确保您的文件是Excel文件，并且无损，然后再试。");  
                      throw e2;  
                  }  
              }  
          }  
      } catch (IOException e) {  
          throw e;  
      }  
  }  
  

  /*** 
   * 读取单元格的值 
   *  
   * @Title: getCellValue 
   * @Date : 2016-7-27 上午10:52:07 
   * @param cell 
   * @return 
   */  
  public static String getCellValue(Cell cell) {  
      Object result = "";  
      if (cell != null) {  
          switch (cell.getCellType()) {  
          case Cell.CELL_TYPE_STRING:  
              result = cell.getStringCellValue();  
              break;  
          case Cell.CELL_TYPE_NUMERIC:  
              result = cell.getNumericCellValue();  
              break;  
          case Cell.CELL_TYPE_BOOLEAN:  
              result = cell.getBooleanCellValue();  
              break;  
          case Cell.CELL_TYPE_FORMULA:  
              result = cell.getCellFormula();  
              break;  
          case Cell.CELL_TYPE_ERROR:  
              result = cell.getErrorCellValue();  
              break;  
          case Cell.CELL_TYPE_BLANK:  
              break;  
          default:  
              break;  
          }  
      }  
      return result.toString();  
  }  
  public static String getCellValueByString(Cell cell) {  
      Object result = "";  
      if (cell != null) {  
    	  cell.setCellType(Cell.CELL_TYPE_STRING);
              result = cell.getStringCellValue();  
             
      }  
      return result.toString();  
  }  
  /** 
   * 通用读取Excel 
   *  
   * @Title: readExcel 
   * @Date : 2016-7-27 上午11:26:53 
   * @param wb 
   * @return 
   */  
  private List<Row> readExcel(Workbook wb) {  
      List<Row> rowList = new ArrayList<Row>();  
        
      int sheetCount = 1; 
        
      Sheet sheet = null;  
      if(onlyReadOneSheet){   
          
          sheet =selectedSheetName.equals("")? wb.getSheetAt(selectedSheetIdx):wb.getSheet(selectedSheetName);  
      }else{                        
          sheetCount = wb.getNumberOfSheets(); 
      }  
      for(int t=startSheetIdx; t<sheetCount+endSheetIdx;t++){  
          
          if(!onlyReadOneSheet) {  
              sheet =wb.getSheetAt(t);  
          }  
          int lastRowNum = sheet.getLastRowNum();  

          if(lastRowNum>0){    
              out("\n开始读取名为【"+sheet.getSheetName()+"】的内容：");  
          }  
          Row row = null;  
          
          for (int i = startReadPos; i <= lastRowNum + endReadPos; i++) {  
              row = sheet.getRow(i);  
              if (row != null) {  
                  rowList.add(row);  
                  out("第"+(i+1)+"行：",false);  
                  
                   for (int j = 0; j < row.getLastCellNum(); j++) {  
                       String value = getCellValue(row.getCell(j));  
                       if (!value.equals("")) {  
                           out(value + " | ",false);  
                       }  
                   }  
                   out("");  
              }  
          }  
      }  
      return rowList;  
  }  




  private void out(String msg){  
      if(printMsg){  
          out(msg,true);  
      }  
  }  

  private void out(String msg,boolean tr){  
      if(printMsg){  
        //  System.out.print(msg+(tr?"\n":""));  
      }  
  }  

  public String getExcelPath() {  
      return this.excelPath;  
  }  

  public void setExcelPath(String excelPath) {  
      this.excelPath = excelPath;  
  }  

  

  public int getStartReadPos() {  
      return startReadPos;  
  }  

  public void setStartReadPos(int startReadPos) {  
      this.startReadPos = startReadPos;  
  }  

  public int getEndReadPos() {  
      return endReadPos;  
  }  

  public void setEndReadPos(int endReadPos) {  
      this.endReadPos = endReadPos;  
  }  


  public boolean isOnlyReadOneSheet() {  
      return onlyReadOneSheet;  
  }  

  public void setOnlyReadOneSheet(boolean onlyReadOneSheet) {  
      this.onlyReadOneSheet = onlyReadOneSheet;  
  }  

  public int getSelectedSheetIdx() {  
      return selectedSheetIdx;  
  }  

  public void setSelectedSheetIdx(int selectedSheetIdx) {  
      this.selectedSheetIdx = selectedSheetIdx;  
  }  

  public String getSelectedSheetName() {  
      return selectedSheetName;  
  }  

  public void setSelectedSheetName(String selectedSheetName) {  
      this.selectedSheetName = selectedSheetName;  
  }  

  public int getStartSheetIdx() {  
      return startSheetIdx;  
  }  

  public void setStartSheetIdx(int startSheetIdx) {  
      this.startSheetIdx = startSheetIdx;  
  }  

  public int getEndSheetIdx() {  
      return endSheetIdx;  
  }  

  public void setEndSheetIdx(int endSheetIdx) {  
      this.endSheetIdx = endSheetIdx;  
  }  

  public boolean isPrintMsg() {  
      return printMsg;  
  }  

  public void setPrintMsg(boolean printMsg) {  
      this.printMsg = printMsg;  
  }  
  /**
   * 读取excel
   * */
  public  List<String[]> readExcelToList(InputStream in,String fileName,int colSize){
	  
	   this.setStartReadPos(1);  
	  List<String[]> list=new ArrayList<String[]>();
	  List<Row> rowList = null;  
      try {  
          rowList = this.readExcel(in,fileName);  
      } catch (IOException e) {  
          e.printStackTrace();  
      }  
      Row obj=null;
      String[] cols=null;
      String excelValue=null;
      for(int i=0;i<rowList.size();i++){
    	  obj=rowList.get(i);
    	  cols=new String[colSize];
			for(int j=0;j<colSize;j++){
				excelValue=getCellValueByString(obj.getCell(j+1));
				cols[j]=excelValue;
			}
			System.out.println(Arrays.toString(cols));
			list.add(cols);
      }  
	  
	  return list;
  }
  public List<Row> readExcel_xls(InputStream fis) throws IOException {  

    
      HSSFWorkbook wb = null;  
      List<Row> rowList = new ArrayList<Row>();  

      try {  
          // 读取Excel  
          wb = new HSSFWorkbook(fis);  
          // 读取Excel 97-03版，xls格式  
          rowList = readExcel(wb);  

      } catch (IOException e) {  
          e.printStackTrace();  
      }  
      return rowList;  
  }  
  public List<Row> readExcel_xlsx(InputStream fis) throws IOException {  
     
     
      XSSFWorkbook wb = null;  
      List<Row> rowList = new ArrayList<Row>();  
      try {  
          // 去读Excel  
          wb = new XSSFWorkbook(fis);  

          // 读取Excel 2007版，xlsx格式  
          rowList = readExcel(wb);  

      } catch (IOException e) {  
          e.printStackTrace();  
      }  
      return rowList;  
  }  
  public static String LISTBODY_MERTERNO="05";
  public static String LISTBODY_CARDNO="04";
  public static String LISTBODY_CARDBIN="08";
  public static Map<String,String> getListBodyMap(){
	  
	  Map<String,String> map=new HashMap<String,String>();
	  map.put("身份证号","01");
	  map.put("营业执照号","02");
	  map.put("手机号","03");
	  map.put("银行卡号",LISTBODY_CARDNO);
	  map.put("商户号_终端号",LISTBODY_MERTERNO);
	  map.put("商户名称","06");
	  map.put("营业执照名称","07");
	  map.put("卡bin",LISTBODY_CARDBIN);
	  return map;
  }
  public static String LISTTYPE_POS="02";
  public static String LISTTYPE_D0="01";
  public static Map<String,String> getListTypeMap(){
	  
	  Map<String,String> map=new HashMap<String,String>();
	  
	  //后期整改需关联数据库
	  map.put("大POS","02");
	  map.put("D0","01");
	  map.put("其他","10");
	  return map;
  }
  public static Map<String,String> getListSignMap(){
	  
	  Map<String,String> map=new HashMap<String,String>();
	  map.put("黑名单","b");
	  map.put("白名单","w");
	  map.put("灰名单","g");
	  return map;
  }
  
 
}  
