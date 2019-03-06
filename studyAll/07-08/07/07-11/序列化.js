序列化是：'将外部进入到程序的字节流'与'程序中的类'作比较，比较serialVersionUID

在进行'反序列化时'，JVM会'把传来的字节流中的serialVersionUID''与本地相应实体'（类）
的serialVersionUID进行比较，如果相同就认为是一致的，可以进行反序列化，
否则就会出现序列化版本不一致的异常。(InvalidCastException)


模拟序列化
//序列化类
import java.io.Serializable;
public class Serial implements Serializable {
	private static final long serialVersionUID = 6977402643848374752L;
	int id;
	String name;
	public Serial(int id, String name) {
		this.id = id;
		this.name = name;
	}
	public String toString() {
		return "DATA: " + id + " " + name;
	}
}


//将类序列化，就是将类输出到设备的一个过程
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
public class SerialTest {
	public static void main(String[] args) {
		Serial serial1 = new Serial(1, "song");
		System.out.println("Object Serial" + serial1);
		try {
			FileOutputStream fos = new FileOutputStream("E:/serialTest.txt");
			ObjectOutputStream oos = new ObjectOutputStream(fos);
			oos.writeObject(serial1);
			oos.flush();
			oos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}


//将类反序列化，写入序列化过的文件
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.ObjectInputStream;
public class DeserialTest {
	public static void main(String[] args) {
		Serial serial2;
		try {
			FileInputStream fis = new FileInputStream("E:/serialTest.txt");
			ObjectInputStream ois = new ObjectInputStream(fis);
			serial2 = (Serial) ois.readObject();
			ois.close();
			System.out.println("Object Deserial" + serial2);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
}

运用范围：
1.分布式传递对象。
2.网络传输的时候。
3.缓存。
4.做游戏存档。

