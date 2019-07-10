# frontend-architecture

In diesem Projekt versuche ich einige Aspekte von Webkomponenten zu untersuchen und zu testen. Dabei geht es vor allem 
darum, wie Webfrontends sich in einklang mit agilen unabhängigen Teams bringen lassen.

Viele der hier gezeigten Ideen entstammen der Idee von micro-frontends (siehe http://microf-frontends.org). Da hier 
viele gute Ideen beschrieben werden wollte ich mich dem Thema einmal näher annehmen. 

Ich möchte den Ansatz der micro-frontends mit einer Umfassenden Webanwendung durchspielen.

## Der Shop
In diesem Projekt wird ein Webshop umgesetzt. Der Shop besteht aus folgenden Komponenten:
 1. Das Webfrontend/die Webanwendung
 1. Das TeamA welches sich um die Produkte kümmert
 1. Das TeamB welches sich um den Warenkob kümmert
 1. Das TeamC welches sich um die Bestellstrecke kümmert

Die Teams A, B und C stellen das Backend und diverse Webcomponents bereit. Diewe Webcomponents werden von dem Webteam zu 
einer Webseite zusammengebaut.

### Technologien
Folgene Technologien werden eingesetzt:
 - Spring Boot für die Implementierung der Backend REST-Services (zwar ist hier auch jede beliebige andere Technologie 
 denkbar, da ich allerdings aus dem Java Umfeld kommen setzt ich auf Spring Boot)
 - Webcomponents in Typescript implementiert
 - NGINX als Webserver für die Auslieferung der Seite
 - gradle als Build Tool
 - Docker für die bereitstellung der gesamten Infrastruktur
 
## Routing / Navigation 
Grundsätzlich sollte vermieden werden dass eine Komponente auf eine andere Seite springt. Dennoch gibt es use-cases die 
genau das erfordern.

In dem Beispiel Shop ist dies die Anzeige von Details zu einem Produkt. Beim Klicken auf Details sollen weiter, 
ausführliche, details zu dem Produkt angezeigt werden.

Für diesen Use-Case kommen in dem Shop Beispiel zwei Varianten in frage:
 1. Anzeige eines Overlays über dre Aktuellen Seite,
 2. Springen auf eine Produktseite
 
Die Anzeige eines Overlays hat den Nachteil, das eine Produktseite nicht einfach dirket verlinkt werden kann, daher wäre
es sinnvoll die zweite Varinate zu verwenden.

Diese Variante kann wie folgt umgesetzt werden:
 1. In der Web-Component wird ein Link auf eine relative Resource gesetzt (bspw. /target/product/{productid}/details)
 2. Im NGINX des Frontends wird ein Reverse-Proxy eintrag eingefühgt der auf eine Konkrete Seite verweist

Bei dem Revers Proxy eintrag gibt es noch folgene möglichkeiten:
 1. vom NGINX wird ein redirect auf die Konkrete Seite geliefert
 2. die konkrete Seite wird unter der angeebenen url ausgeliefert
 
Variante 1 hat dabei den charme das die Resourcen im Context der Anwendung bleiben. Sprünge aus Komponenten "erfragen" 
nur ihr korrektes Ziel.

In diesem beispiel habe ich die Anforderung mit rewrite Rules umgesetzt.

## Stylesheets
Bei der Verwendung von webcomponenten stellt sich die Frage wie das Layout der Komponenten abegbildet wwerden soll. Auch
hier gibt es im Grunde zwei mögliche Strategier:
 1. Jede Kompnenten liefert ihre eigenen Stylesheets aus
 2. Komponenten bleiben frei von Layout informatienen, Stylesheets werden zentral in der Webanwendung verwaltet.
 
Ich persönlich würde die zweite Variante bevorzugen, da hier einige Vorteile auf der Hand leigen:
 -  die Komponenten müssen sich nicht um den CD (Coperate Design) des Unternehmens kümmern
 - Kompnenten können in verschiedenen Marken eines Unternehmens mit unterschiedlichem CD verwendet werden
 - das (Unternehmensweite) Styling kann zentral in einem Patternlab oder ähnlichem verwaltet werden

Weiter Gedanken zum Thema Stylesheets:
 - Grundsätzlich sollte man sich über das Thema Atomic Design gedanken machen. Gerade im Umgang mit Webcomponenten biete 
   sich diser ansatz an. Jede Webcomponente wäre bei diesem Ansatz ein Molekühl oder ein Organismus. 

## JavaScript Frameworks
Die Trennung in Komponenten bietet jedem Team die möglichkeit frei und autark zu arbeiten. Problematisch kann dies 
allerdings beim einsatz von JavaScript Frameworks werden. Nicht immer arbeiten alle Frameworks miteinander. 
Problematisch sind vor allem Frameworks wie Angiular, oder Vue, da diese oft die Hoheit über die gesamte Seite für sich
beanspruchen. Aber auch bei anderen Frameworks kann es zu problemen kommen.

Ein weiters Problem ist die Version der Frameworks. Es kann durchaus vorkommen, das zwei Komponenten das gleiche Framwork
in unterschiedlichen versionen nutzen. Dies kann kompensiert werden, wenn jede Komponenten bspw. als `npm package` 
veröffentlicht wird. Bei erstellen der Webanwendung werden die Abhöngigkeiten durch `npm` aufgelöst. Dies bedeutet 
allerdings auch, wenn eine Komponente einen Bugfix erhält muss die gesamte Webanwendung neu gebaut werden. Ein 
unabhängiges veröffentlichen der Anwendung ist somit nicht möglich.

Eine andere Variante wäre eine art Plattform versionierung. Innerhalb eines Unternehmens wird eine Plattform Version 
definiert. Diese Plattform definiert 
 - Welche Frameworks eingesetzt werden dürfen
 - In welcher Version diese Frameworks eingesetzt werden dürfen.

Wenn ein neues Framework aufgenommen werden soll, muss diese erst Zentral freigegeben werden. Wenn ein Framework 
aktuallisiert werden soll, muss eine neue Plattform Version veröffentlicht werden. Umgekehrt ist auch jede Version einer
Komponente nur mit in einer bestimmten Plattform Version verfügbar. Hier könnte das klassische Major Minor Prinzip 
angewendet werden. Die Micro Version gibt Bugfixes an und sollte im Sinne von Continuous Integration und Continuous 
Delivery lediglich der Dokumentation genügen. Die Webseiten sollten immer die aktuellste Micro Version verwenden.

## Sonstiges
Aktuell werder Webcomponents  nur in Chrome und Safari nativ unterstützt. Für  andere Browser muss ein polifill mit 
ausgeliefert werden (Siehe: http://webcomponents.github.io/polyfills/).

## Conclusion
In Agilen Teams können Web-Components die Entwicklung deutlich vereinfachen.

## Links
 - [Micro-Frontends](https://micro-frontends.org/)
 - [Orchestrating micrto-frontends](https://medium.com/dazn-tech/orchestrating-micro-frontends-a5d2674cbf33)
 - [Java Magazin 2.19 erschienen: Moderne Frontend-Architekturen](https://jaxenter.de/java-magazin-2-19-frontend-editorial-79090)
 - [Patternlab](https://patternlab.io)