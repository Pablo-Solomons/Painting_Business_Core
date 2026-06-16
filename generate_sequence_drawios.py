from pathlib import Path
import xml.etree.ElementTree as ET


ROOT_DIR = Path(
    "/media/e_cesar/SSD 1TB/Shared/collab/Painting_Business_Core/Conception/Diagrammes/sequence technique"
)


MXFILE_ATTRS = {
    "host": "Electron",
    "agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/28.2.5 Chrome/138.0.7204.251 Electron/37.6.1 Safari/537.36",
    "version": "28.2.5",
}

MODEL_ATTRS = {
    "dx": "3260",
    "dy": "2243",
    "grid": "1",
    "gridSize": "10",
    "guides": "1",
    "tooltips": "1",
    "connect": "1",
    "arrows": "1",
    "fold": "1",
    "page": "1",
    "pageScale": "1",
    "pageWidth": "1900",
    "pageHeight": "1400",
    "math": "0",
    "shadow": "0",
    "background": "#ffffff",
}

TITLE_STYLE = "text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=18;"
ACTOR_STYLE = "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;"
LIFELINE_STYLE = (
    "shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;"
    "collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;"
)
CALL_STYLE = (
    "edgeStyle=orthogonalEdgeStyle;html=1;rounded=0;jettySize=auto;orthogonalLoop=1;"
    "exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=block;"
)
RETURN_STYLE = (
    "edgeStyle=orthogonalEdgeStyle;html=1;rounded=0;jettySize=auto;orthogonalLoop=1;"
    "exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;endArrow=open;"
)


def new_mxfile(diagram_name: str, diagram_id: str) -> ET.Element:
    mxfile = ET.Element("mxfile", MXFILE_ATTRS)
    diagram = ET.SubElement(mxfile, "diagram", {"name": diagram_name, "id": diagram_id})
    model = ET.SubElement(diagram, "mxGraphModel", MODEL_ATTRS)
    root = ET.SubElement(model, "root")
    ET.SubElement(root, "mxCell", {"id": "0"})
    ET.SubElement(root, "mxCell", {"id": "1", "parent": "0"})
    return mxfile


def add_text(root: ET.Element, cell_id: str, value: str, x: int, y: int, width: int, height: int, style: str = TITLE_STYLE) -> None:
    cell = ET.SubElement(root, "mxCell", {"id": cell_id, "value": value, "style": style, "vertex": "1", "parent": "1"})
    ET.SubElement(cell, "mxGeometry", {"x": str(x), "y": str(y), "width": str(width), "height": str(height), "as": "geometry"})


def add_participant(root: ET.Element, cell_id: str, value: str, kind: str, x: int, y: int = 90, width: int = 170, height: int = 620) -> None:
    style = ACTOR_STYLE if kind == "actor" else LIFELINE_STYLE
    cell = ET.SubElement(root, "mxCell", {"id": cell_id, "value": value, "style": style, "vertex": "1", "parent": "1"})
    ET.SubElement(cell, "mxGeometry", {"x": str(x), "y": str(y), "width": str(width), "height": str(height), "as": "geometry"})


def add_message(root: ET.Element, cell_id: str, value: str, source: str, target: str, y: int, source_x: int, target_x: int, dashed: bool = False) -> None:
    style = RETURN_STYLE if dashed else CALL_STYLE
    cell = ET.SubElement(
        root,
        "mxCell",
        {
            "id": cell_id,
            "value": value,
            "style": style,
            "edge": "1",
            "parent": "1",
            "source": source,
            "target": target,
        },
    )
    geom = ET.SubElement(cell, "mxGeometry", {"relative": "1", "as": "geometry"})
    ET.SubElement(geom, "mxPoint", {"x": str(source_x), "y": str(y), "as": "sourcePoint"})
    ET.SubElement(geom, "mxPoint", {"x": str(target_x), "y": str(y), "as": "targetPoint"})


def build_case(file_name: str, diagram_title: str, diagram_id: str, participants: list[dict], messages: list[dict]) -> None:
    mxfile = new_mxfile("Page-1", diagram_id)
    root = mxfile.find("diagram/mxGraphModel/root")
    if root is None:
        raise RuntimeError("Unable to locate mxGraphModel root")

    add_text(root, "title", diagram_title, 160, 18, 1560, 40)

    positions: dict[str, dict[str, int]] = {}
    for participant in participants:
        positions[participant["id"]] = {
            "x": participant["x"],
            "y": participant.get("y", 90),
            "w": participant.get("width", 170),
            "h": participant.get("height", 620),
        }
        add_participant(
            root,
            participant["id"],
            participant["label"],
            participant["kind"],
            participant["x"],
            participant.get("y", 90),
            participant.get("width", 170),
            participant.get("height", 620),
        )

    for index, message in enumerate(messages, start=1):
        src = positions[message["source"]]
        dst = positions[message["target"]]
        if src["x"] <= dst["x"]:
            source_x = src["x"] + src["w"]
            target_x = dst["x"]
        else:
            source_x = src["x"]
            target_x = dst["x"] + dst["w"]
        add_message(
            root,
            f"m{index}",
            message["label"],
            message["source"],
            message["target"],
            message["y"],
            source_x,
            target_x,
            message.get("dashed", False),
        )

    file_path = ROOT_DIR / file_name
    file_path.write_text(ET.tostring(mxfile, encoding="unicode"), encoding="utf-8")


CASES = [
    {
        "file": "01_Rechercher_du_contenu.drawio",
        "title": "Séquence technique - Rechercher du contenu",
        "id": "search-content",
        "participants": [
            {"id": "actor", "label": "Visiteur", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Barre de recherche", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Résultats / filtres", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Saisir un mot-clé", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Déclencher la recherche après debounce", "y": 260},
            {"source": "api", "target": "store", "label": "3. Injecter le contexte tenant et filtrer", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner fiches, roadmaps et tags", "y": 440, "dashed": True},
            {"source": "api", "target": "view", "label": "5. Afficher les suggestions et résultats", "y": 530},
            {"source": "view", "target": "actor", "label": "6. Permettre la sélection d'un contenu", "y": 620, "dashed": True},
        ],
    },
    {
        "file": "02_Consulter_un_contenu.drawio",
        "title": "Séquence technique - Consulter un contenu",
        "id": "consult-content",
        "participants": [
            {"id": "actor", "label": "Visiteur", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Page de détail", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Fiche / roadmap détaillée", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Ouvrir une fiche ou une roadmap", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Charger la ressource publique", "y": 260},
            {"source": "api", "target": "store", "label": "3. Lire la ressource par id ou slug", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner le contenu complet", "y": 440, "dashed": True},
            {"source": "api", "target": "view", "label": "5. Préparer les médias et métadonnées", "y": 530},
            {"source": "view", "target": "actor", "label": "6. Rendre la page consultée", "y": 620, "dashed": True},
        ],
    },
    {
        "file": "03_Creer_un_compte.drawio",
        "title": "Séquence technique - Créer un compte",
        "id": "create-account",
        "participants": [
            {"id": "actor", "label": "Peintre vérifié", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Formulaire d'inscription", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Compte créé / en attente", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Renseigner le formulaire", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Soumettre la demande d'inscription", "y": 260},
            {"source": "api", "target": "store", "label": "3. Créer le compte au statut EN_ATTENTE", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner l'identifiant et le statut", "y": 440, "dashed": True},
            {"source": "api", "target": "view", "label": "5. Afficher la confirmation", "y": 530},
            {"source": "view", "target": "actor", "label": "6. Informer de la validation ultérieure", "y": 620, "dashed": True},
        ],
    },
    {
        "file": "04_Gerer_son_profil.drawio",
        "title": "Séquence technique - Gérer son profil",
        "id": "manage-profile",
        "participants": [
            {"id": "actor", "label": "Peintre vérifié", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Profil peintre", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Dashboard profil", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Ouvrir la page profil", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Charger les informations du peintre", "y": 260},
            {"source": "api", "target": "store", "label": "3. Lire et préparer le profil", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner les données courantes", "y": 440, "dashed": True},
            {"source": "ui", "target": "api", "label": "5. Soumettre les modifications", "y": 530},
            {"source": "api", "target": "view", "label": "6. Mettre à jour le dashboard profil", "y": 620},
        ],
    },
    {
        "file": "05_Modifier_son_contenu.drawio",
        "title": "Séquence technique - Modifier son contenu",
        "id": "edit-content",
        "participants": [
            {"id": "actor", "label": "Peintre vérifié", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Éditeur de contenu", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Version modifiée", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Ouvrir la fiche à modifier", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Charger la version courante", "y": 260},
            {"source": "api", "target": "store", "label": "3. Lire le contenu existant", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner le brouillon courant", "y": 440, "dashed": True},
            {"source": "ui", "target": "api", "label": "5. Soumettre les corrections", "y": 530},
            {"source": "api", "target": "view", "label": "6. Enregistrer la version modifiée", "y": 620},
        ],
    },
    {
        "file": "06_Publier_contenu.drawio",
        "title": "Séquence technique - Publier contenu",
        "id": "publish-content",
        "participants": [
            {"id": "actor", "label": "Peintre vérifié", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Formulaire de publication", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Contenu en attente", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Saisir le contenu à publier", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Valider le formulaire de publication", "y": 260},
            {"source": "api", "target": "store", "label": "3. Créer la fiche au statut EN_ATTENTE", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner le statut 201 Created", "y": 440, "dashed": True},
            {"source": "api", "target": "view", "label": "5. Confirmer l'enregistrement", "y": 530},
            {"source": "view", "target": "actor", "label": "6. Afficher la mise en attente de modération", "y": 620, "dashed": True},
        ],
    },
    {
        "file": "07_Sauthentifier.drawio",
        "title": "Séquence technique - S'authentifier",
        "id": "authenticate",
        "participants": [
            {"id": "actor", "label": "Utilisateur", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Page de connexion", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "session", "label": "LocalStorage", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Saisir email et mot de passe", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Envoyer la requête de login", "y": 260},
            {"source": "api", "target": "store", "label": "3. Vérifier les identifiants démo", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner le JWT simulé et le rôle", "y": 440, "dashed": True},
            {"source": "api", "target": "session", "label": "5. Stocker le token localement", "y": 530},
            {"source": "session", "target": "actor", "label": "6. Rediriger vers l'espace protégé", "y": 620, "dashed": True},
        ],
    },
    {
        "file": "08_Gerer_les_comptes.drawio",
        "title": "Séquence technique - Gérer les comptes",
        "id": "manage-accounts",
        "participants": [
            {"id": "actor", "label": "Admin", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Dashboard admin", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "view", "label": "Comptes modérés", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Ouvrir la file des comptes", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Charger la route d'administration", "y": 260},
            {"source": "api", "target": "store", "label": "3. Vérifier le rôle ADMIN et lister les comptes", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner les comptes en attente", "y": 440, "dashed": True},
            {"source": "ui", "target": "api", "label": "5. Valider ou suspendre un compte", "y": 530},
            {"source": "api", "target": "view", "label": "6. Actualiser la liste et le statut", "y": 620},
        ],
    },
    {
        "file": "09_Gerer_le_contenu.drawio",
        "title": "Séquence technique - Gérer le contenu",
        "id": "manage-content",
        "participants": [
            {"id": "actor", "label": "Admin", "kind": "actor", "x": 60, "width": 40, "height": 90},
            {"id": "ui", "label": "Console de modération", "kind": "lifeline", "x": 330},
            {"id": "api", "label": "lib/api.ts", "kind": "lifeline", "x": 690},
            {"id": "store", "label": "demoStorage.ts", "kind": "lifeline", "x": 1050},
            {"id": "audit", "label": "Journal d'audit", "kind": "lifeline", "x": 1410},
        ],
        "messages": [
            {"source": "actor", "target": "ui", "label": "1. Ouvrir le catalogue à modérer", "y": 170},
            {"source": "ui", "target": "api", "label": "2. Charger la route d'administration", "y": 260},
            {"source": "api", "target": "store", "label": "3. Lister les contenus et taxonomies", "y": 350},
            {"source": "store", "target": "api", "label": "4. Retourner les éléments à traiter", "y": 440, "dashed": True},
            {"source": "ui", "target": "api", "label": "5. Archiver, supprimer ou renommer", "y": 530},
            {"source": "api", "target": "audit", "label": "6. Consigner l'action dans le journal", "y": 620},
        ],
    },
]


def main() -> None:
    ROOT_DIR.mkdir(parents=True, exist_ok=True)

    for existing in ROOT_DIR.glob("*.drawio"):
        existing.unlink()

    for case in CASES:
        build_case(case["file"], case["title"], case["id"], case["participants"], case["messages"])


if __name__ == "__main__":
    main()