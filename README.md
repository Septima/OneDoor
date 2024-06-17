# OneDoor
OneDoor findes til en række applikationer fx QGIS, ArcMap, ArcGIS Pro og Web.

Læs mere om OneDoor på [septima.dk](https://septima.dk/showcases/septima-onedoor)

Fejl, ændringsønsker og spørgsmål kan oprettes som issues [her](https://github.com/Septima/OneDoor/issues)

Annonceringer og diskussioner finder du [her](https://github.com/Septima/OneDoor/discussions)

## Installation og Opdatering
- OneDoor er nu tæt integreret med IIS. Giver mulighed for Single Sign-On og rettighedstyring af indhold
  - Kontakt din sædvanlige konsulent 

### Installation (Første gang) 

Se [installationsvejledning](https://github.com/Septima/OneDoor/wiki/install)

### Opgradering
Se [vejledning](https://github.com/Septima/OneDoor/wiki/upgrade)

## Releases:

[Alle releases](https://github.com/Septima/OneDoor/releases)

Seneste release:
### [1.13.4](https://github.com/Septima/OneDoor/releases/tag/1.13.4)

- Plansearcher respekterer nu flere kommunenumre. Gælder også søgninger på virksomheder. Mange af jer søger i flere kommuner på én gang og disse søgninger virker nu igen
- Sortering af vedtagne lokalplaner i "blank" søgning. Sorteres efter plannavn
- Robusthed
  - Vi har forbedret fejlhåndtering
  - Ugyldige certifikater
- Performance
  - OneDoor Web. Resultater "streames" nu fra server, dvs så snart de hurtigste searchere har resultater vises de
  - Svartider. En lang række kald til Datafordeleren er blevet omlagt til at bruge [Septima Databox](https://septima.dk/showcases/septima-databox) istedet
- [Håndtér flere formater for esr# i søgning #425](https://github.com/Septima/spatialsuite-s4/issues/425#issue-2016819423) Se issue for de nye muligheder. Søgningen respekterer kommunekode (municipality), hvis denne ikke er angivet i søgefeltet
- [Vis også "Ikke fundet" #426](https://github.com/Septima/spatialsuite-s4/issues/426#issue-2016967209) Se figur på issuet
- [Opdatér links på bygning #703](https://github.com/Septima/septima-search/issues/703#issue-2012108854) Links til BBR Kommune for bygninger er rettet
- Link til kort.bbr.dk opdateret
- Søgninger mod ArcGIS Server er forbedret
- Links til FilArkivet for husnumre og jordstykker er opdateret. Der kan nu også linkes for Samlet Fast Ejendom
- [Husnummer og bygning #84](https://github.com/Septima/OneDoor/issues/84#issuecomment-2031819796) Bygninger med status 3 (Under opførsel) medtages. Bygningers status inkluderes i parentes i bygningens titel
- Nyt: LIFA links
  - Links til LIFA's ejdExplorer for husnumre og jordstykker
  - Link til jordstykkerne ejdExplorer for en geometri tegnet i det store kort

### [1.8.6](https://github.com/Septima/OneDoor/releases/tag/1.8.6)
- Link til Boligejer.dk rettet
- Landbrugsnotering rapporteres nu korrekt på ejendom og ikke jordstykke
- Tingbog->Servitutter: Vis id, hvis titel mangler
- Vis tillægstekst for hæftelser
- Der kan nu vises DAGI-info (Administrativ inddeling) for jordstykker

### [1.8.5](https://github.com/Septima/OneDoor/releases/tag/1.8.5)
- [Implementér Offentlige Links for alle resultat-typer](https://github.com/Septima/OneDoor/issues/48#issue-1601286713)
- [Implementér skråfoto for alle resultat-typer](https://github.com/Septima/OneDoor/issues/47#issue-1601249202)
- Søge på vejnavne med zoom til vejafgrænsningen og markering af vejen
  - [Vej vises nu uanset om dawa er sat til at søge på husnumre, adresser eller begge](https://github.com/Septima/OneDoor/issues/37#issuecomment-1446398957)
  - [Listevisning af husnumre på vej forbedret](https://github.com/Septima/OneDoor/issues/37#issuecomment-1446388523)
- Adressesøgning->Sortering af husnummer
  - [Sortering forbedret](https://github.com/Septima/OneDoor/issues/40#issuecomment-1446393088)

### [1.8.4](https://github.com/Septima/OneDoor/releases/tag/1.8.4)
- [Fejl i CVR-visning #41](https://github.com/Septima/OneDoor/issues/41#issuecomment-1422525226)
- [Listen over features i seacherne: Kan listen gøres længere? #34](https://github.com/Septima/OneDoor/issues/34#issuecomment-1416160688)
- [Søge på vejnavne med zoom til vejafgrænsningen og markering af vejen #37](https://github.com/Septima/OneDoor/issues/37#issuecomment-1416116461)
- [Søgning på vejkode #11](https://github.com/Septima/OneDoor/issues/11#issuecomment-1425805999)
- [Nabo-områder kommer med i konfliktsøgning selvom de kun deler grænselinje. #5](https://github.com/Septima/OneDoor/issues/5#issuecomment-1261839242)

### [1.8.3](https://github.com/Septima/OneDoor/releases/tag/1.8.3)
-  [Plannr-tilføjelse til lokalplan-resultatvisningen #38](https://github.com/Septima/OneDoor/issues/38#issuecomment-1223949852)
-  [Søge på vejnavne med zoom til vejafgrænsningen og markering af vejen #37](https://github.com/Septima/OneDoor/issues/37#issuecomment-1416116461)
-  [Listen over features i seacherne: Kan listen gøres længere? #34](https://github.com/Septima/OneDoor/issues/34#issuecomment-1416160688)

