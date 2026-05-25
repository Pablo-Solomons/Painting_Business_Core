// AuthResponseDto.java — ce qu'on retourne après connexion
public class AuthResponseDto {
    private String accessToken;   // Token JWT valide 15 minutes
    private String refreshToken;  // Token pour obtenir un nouveau accessToken
    private UserSummaryDto user;  // Infos de base sur l'utilisateur
}