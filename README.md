# Creative Cooperation Portal
## DApp einrichten
### 1. MetaMask-Plugin herunterladen
Damit die DApp verwendet werden kann, wird ein DApp-Browser bzw. DApp-Plugin benötigt. Die Anwendung ist optimiert auf das **MetaMask-Plugin** (https://metamask.io/) für den Google-Chrome-Browser.
### 2. Ethereum-Account erstellen
Über die Benutzeroberfläche des MetaMask-Plugin muss als nächstes ein Ethereum-Account erstellt werden.
### 3. Netzwerk zu Ropsten-Test-Network wechseln
Die DApp läuft auf dem Ropsten Test-Netzwerk von Ethereum. Daher sollte das MetaMask-Plugin ebenfalls auf das Test-Netzwerk eingestellt werden.
### 4. Test-Ether besorgen
Jede Transaktion der DApp benötigt Ether. Da wir uns aber auf dem Test-Netzwerk befinden, kann kostenlos Ether besorgt werden. Dazu kann man über das MetaMask-Plugin auf den Button **BUY** klicken und anschließend auf den Button **GO TO TEST FAUCET**. Anschließend wird man auf eine Seite weitergeleitet, auf der man Ether kostenlos anfordern kann.
### 5. Statische Dateien der DApp herunterladen
Die statischen Dateien müssen auf den lokalen Rechner heruntergeladen werden. 
### 6. Web Server-Plugin herunterladen
Als nächstes muss ein Web Server-Plugin für den Google Chrome Browser heruntergeladen werden (https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?utm_source=chrome-app-launcher-info-dialog).
### 7. Web Server einrichten
Das im vorherigen Schritt heruntergeladene Plugin muss eingerichtet werden. Dazu klickt man auf das Plugin und anschließend auf den **CHOOSE FOLDER** Button. Hier wählt man den Ordner in dem sich die statischen Dateien der DApp befinden **(PATH_TO_BUILD_DIRECTORY/build-vX.X)**. Unter dem Punkt **Options** muss dann noch ein Haken bei **Automatically show index.html** gesetzt werden. Die DApp kann dann über die eingestellte Web Server URL erreicht werden.