// RegisterDto.java — inscription d'un nouveau peintre
public class RegisterDto {

    @NotBlank @Email(message = 'Format email invalide')
    private String email;

    @NotBlank
    @Size(min = 8, message = 'Le mot de passe doit avoir au moins 8 caractères')
    private String motDePasse;

    @NotBlank
    private String nom;

    // Domaines de spécialité du peintre (ex: ['aquarelle', 'huile'])
    private List<String> specialites;
}