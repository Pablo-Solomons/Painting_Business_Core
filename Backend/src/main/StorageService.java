@Service
public class StorageService {

    // Dossier local où stocker les fichiers
    private final Path uploadDir = Path.of("uploads");

    @PostConstruct  // Appelé au démarrage : crée le dossier si besoin
    public void init() throws IOException {
        Files.createDirectories(uploadDir);
    }

    // Sauvegarde un fichier et retourne son nom unique
    public String upload(MultipartFile file) throws IOException {
        String extension = getExtension(file.getOriginalFilename());
    String fileName = UUID.randomUUID().toString() + "." + extension;
        Path destination = uploadDir.resolve(fileName);
        Files.copy(file.getInputStream(), destination);
        return fileName;
    }

    // Retourne l'URL d'accès au fichier
    public String getUrl(String fileName) {
        return "/uploads/" + fileName;
    }

    // Supprime un fichier
    public void delete(String fileName) throws IOException {
        Files.deleteIfExists(uploadDir.resolve(fileName));
    }

    private String getExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
    return lastDot >= 0 ? filename.substring(lastDot + 1) : "";
    }
}