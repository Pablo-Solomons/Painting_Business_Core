// LoginDto.java — connexion
public class LoginDto {
    @NotBlank @Email
    private String email;

    @NotBlank
    private String motDePasse;
}
