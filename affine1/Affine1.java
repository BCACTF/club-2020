package ctfclub.crypto20210106;

import java.util.Scanner;

public class Affine1 {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		System.out.println("Enter flag:");
		String in = scan.nextLine();
		System.out.println("Enter secret key o:");
		int o = Integer.parseInt(scan.nextLine());
		String out = "";
		for (char i : in.toCharArray())
			if (i >= 'a' && i <= 'z')
				out += (char) ((33 * (i - 'a') + o) % 26 + 'a');
			else
				out += i;
		System.out.println("Encoded flag:");
		System.out.println(out);
	}
}
