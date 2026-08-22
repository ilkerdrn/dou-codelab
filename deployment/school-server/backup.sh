#!/usr/bin/env sh
set -eu

backup_root="${BACKUP_ROOT:-/var/backups/dou-codelab}"
stamp="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_root"

docker compose exec -T postgres pg_dump \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  --format=custom > "$backup_root/postgres-$stamp.dump"

find "$backup_root" -type f -name 'postgres-*.dump' -mtime +30 -delete
echo "Backup created: $backup_root/postgres-$stamp.dump"
