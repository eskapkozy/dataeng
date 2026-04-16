# Docker Compose Structure Documentation

## Configuration Actuelle

### Services Définis
```yaml
services:
  app:
    build: .
    ports:
      - "8081:8081"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    depends_on: []
```

### Description des Éléments
- **app**: Service principal Spring Boot
- **build**: Construction depuis Dockerfile local (racine du projet)
- **ports**: Mapping 8081:8081 (correspond à server.port dans application.properties)
- **environment**: Profile Docker activé pour configurations spécifiques
- **depends_on**: Vide (pas de dépendances de base de données)

## Structure Future Prévue

### Phase 1: Application Simple (Actuel)
- Service Spring Boot standalone
- Connexion à base de données externe (PostgreSQL local)
- Pas de conteneurisation de la base de données

### Phase 2: Application + Base de Données (Future)
```yaml
services:
  app:
    build: .
    ports:
      - "8081:8081"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/mydb
      - SPRING_DATASOURCE_USERNAME=myuser
      - SPRING_DATASOURCE_PASSWORD=mypassword
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Phase 3: Services Additionnels (Future Avancé)
- Service de monitoring (Prometheus/Grafana)
- Service de cache (Redis)
- Service de messagerie (Kafka) - NON MVP

## Fichiers Requis

### Actuellement Requis
- `Dockerfile` (à créer)
- `compose.yaml` (configuré)

### Fichiers Optionnels
- `.dockerignore` (recommandé)
- `application-docker.properties` (pour profil Docker)

## Commandes Utiles

### Démarrage
```bash
docker-compose up --build
```

### Arrêt
```bash
docker-compose down
```

### Logs
```bash
docker-compose logs app
```

## Notes Importantes
- Configuration actuelle utilise base de données PostgreSQL locale
- Éviter les conflits de ports avec services existants
- Profile Docker permet configurations spécifiques conteneurisées
- Structure évolutive pour phases futures
