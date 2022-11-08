import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class dummy {

	public static void main(String[] args) {
		BCryptPasswordEncoder bc =  new BCryptPasswordEncoder();
		System.out.println(bc.encode("Pass@123"));

	}

}
