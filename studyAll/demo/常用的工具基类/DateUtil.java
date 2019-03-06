package com.zte.ecc.secret.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
/**
 * 
 * @author 罗森
 * @date 2016/07/06
 *
 */
 
public class DateUtil {

    public static final String YYYY_MM_DD = "yyyy-MM-dd";

    public static final String YYYY_MM_DD_HHMMSS = "yyyy-MM-dd HH:mm:ss";

    public static final String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";

 
    public static Date getCurrentDate() {
        Calendar calendar = Calendar.getInstance(Locale.CHINA);
        return calendar.getTime();
    }
 
    public static String dateToStr(Date date) {

        if (date == null) {
            return "";
        }

        String result = "";
        if (date != null) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(YYYY_MM_DD_HHMMSS);
                result = sdf.format(date);
            } catch (Exception ex) {
                result = "";
            }
        }

        return result;
    }

 
    public static String dateToStr(Date date, String format) {

        if (date == null) {
            return "";
        }

        String result = "";
        if (date != null) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                result = sdf.format(date);
            } catch (Exception ex) {
                result = "";
            }
        }

        return result;
    }
 
    public static Date strToDate(String strDate) {

        try {
            SimpleDateFormat format = new SimpleDateFormat(YYYY_MM_DD_HHMMSS);
            Date nowDate = format.parse(strDate);
            return nowDate;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 鏃ユ湡鏍煎紡瀛楃涓茶浆鎹负鏃ユ湡瀵硅薄
     * 
     * @param strDate
     *            鏃ユ湡鏍煎紡瀛楃涓�
     * @param pattern
     *            鏃ユ湡瀵硅薄
     * @return
     */
    public static Date strToDate(String strDate, String pattern) {

        try {
            SimpleDateFormat format = new SimpleDateFormat(pattern);
            Date nowDate = format.parse(strDate);
            return nowDate;
        } catch (Exception e) {
            return null;
        }
    }

 
    public static int getYear(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.YEAR);
    }
 
    public static int getMonth(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.MONTH) + 1;
    }
 
    public static int getWeek(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
        dayOfWeek = dayOfWeek - 1;
        if (dayOfWeek == 0) {
            dayOfWeek = 7;
        }

        return dayOfWeek;
    }
 
    public static int getDay(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.DAY_OF_MONTH);
    }
 
    public static int getHour(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.HOUR_OF_DAY);
    }
 
    public static int getMinute(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.MINUTE);
    }
 
    public static int getSecond(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.get(Calendar.SECOND);
    }

 
    public static long getMillis(Date date) {

        Calendar c = Calendar.getInstance();
        c.setTime(date);

        return c.getTimeInMillis();
    }
 
    public static Date addDate(Date date, int day) {

        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTimeInMillis(getMillis(date) + ((long) day) * 24 * 3600 * 1000);
        return c.getTime();
    }
 
    public static int diffDate(Date date, Date date1) {
        return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
    }

 
    public static Long diffDateTime(Date date, Date date1) {
        return (Long) ((getMillis(date) - getMillis(date1)) / 1000);
    }
 
   /* public static String calTime(Date startTime, Date endTime) {

        if (startTime == null) {
            return "";
        }

        if (endTime == null) {
       
            endTime = getCurrentDate();
        }

        String result = "";

        long time = diffDateTime(endTime, startTime);

     
        long h = time / (60 * 60);
     
        long m = time % (60 * 60) / 60;

        result = h + "鏃� + m + "鍒�;

        return result;
    } */

    
    public static int getMaxDay(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
       
        c.add(Calendar.MONTH, 1);
        c.add(Calendar.DAY_OF_MONTH, -1);
        return c.get(Calendar.DAY_OF_MONTH);
    }

    
    public static List<String> getSplitTime(int split) {
        final int hours = 24;
        List<Integer> list = new ArrayList<Integer>();
        List<String> rtn = new ArrayList<String>();
        for (int i = 0; i <= hours; i += split) {
            list.add(i);
        }

        for (int i = 0; i < list.size(); i++) {
            Integer tmp = list.get(i);
            int last = tmp + split;
            if (last > hours) {
                last = hours;
            }
            rtn.add(tmp + "-" + String.valueOf(last));
            if (last == hours) {
                break;
            }
        }
        return rtn;
    }

}
