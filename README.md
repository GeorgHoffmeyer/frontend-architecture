# frontend-architecture

In diesem Projekt versuche ich einige Aspekte von Webkomponenten zu untersuchen und zu testen. Dabei geht es vor allem darum, wie Webfrontends sich in einklang mit agilen unabhängigen Teams bringen lassen.

Viele der hier gezeigten Ideen entstammen der Idee von micro-frontends (siehe http://microf-frontends.org). Da hier viele gute Ideen beschrieben werden wollte ich mich dem Thema einmal näher annehmen. 

Ich möchte den Ansatz der micro-frontends mit einer Umfassenden Webanwendung durchspielen.

## Der Shop
In diesem Projekt wird ein Webshop umgesetzt. Der Shop besteht aus folgenden Komponenten:
 1. Das Webfrontend/die Webanwendung
 1. Das TeamA welches sich um die Produkte kümmert
 1. Das TeamB welches sich um den Warenkob kümmert
 1. Das TeamC welches sich um die Bestellstrecke kümmert

Die Teams A, B und C stellen das Backend und diverse Webcomponents bereit. Diewe Webcomponents werden von dem Webteam zu einer Webseite zusammengebaut.

### Technologien
Folgene Technologien werden eingesetzt:
 - Spring Boot für die Implementierung der Backend REST-Services (zwar ist hier auch jede beliebige andere Technologie denkbar, da ich allerdings aus dem Java Umfeld kommen setzt ich auf Spring Boot)
 - Webcomponents in Typescript implementiert
 - NGINX als Webserver für die Auslieferung der Seite
 - gradle als Build Tool
 - Docker für die bereitstellung der gesamten Infrastruktur
 