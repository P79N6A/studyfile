public static  boolean startCheck(String reg,String string){
	 boolean tem=false;  
	   
	 Pattern pattern = Pattern.compile(reg);  
	 Matcher matcher=pattern.matcher(string);  
	  
	 tem=matcher.matches();  
	 return tem;  
}