# Konfiguration

OneDoor konfigureres via en YAML-fil. Konfigurationsfilen beskriver hvilke data, temaer og funktioner der er tilgængelige i løsningen.

## Konfigurationsfil

Konfigurationsfilen placeres i `config/onedoor/config.yml`.

```yaml
# config.yml eksempel
title: Min OneDoor
```

## Organisation

Organisationsspecifikke konfigurationer placeres i:

```
config/organisations/<org>/configurations/<name>/
  config.yml
  params.yml
  style.yml
```
